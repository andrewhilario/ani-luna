/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Hls from "hls.js";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Forward,
  Maximize,
  Pause,
  Play,
  Settings,
  ThumbsUp,
  Volume2,
  VolumeX
} from "lucide-react";
import useAnimeWatchInfo from "@/hooks/watch";
import useAnimeInfo from "@/hooks/info";

export default function WatchPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [commentText, setCommentText] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const { watchAnime, watchAnimeLoading } = useAnimeWatchInfo(params.id);
  const decodedString = decodeURIComponent(params.id);
  const info = decodedString.split("$")[0];
  const { anime, animeLoading } = useAnimeInfo(info);
  const [volume, setVolume] = useState(0.7); // default volume
  // Initialize HLS player
  useEffect(() => {
    let hls: Hls | null = null;
    const src = watchAnime?.sources?.[0]?.url;

    const proxyUrl = `/api/video-proxy?url=${encodeURIComponent(src)}`;

    const initPlayer = () => {
      if (Hls.isSupported()) {
        hls = new Hls({
          xhrSetup: (xhr) => {
            xhr.withCredentials = false;
            // Note: Don't set Referer/Origin here - it will cause errors
          },
          maxBufferLength: 30,
          maxMaxBufferLength: 600,
          maxBufferSize: 60 * 1000 * 1000,
          maxBufferHole: 0.5
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setError(`Player error: ${data.type}`);
            console.error("HLS Error:", data);
          }
        });

        hls.loadSource(proxyUrl);
        if (videoRef.current) {
          hls.attachMedia(videoRef.current);
        } else {
          console.error("Video element not found");
        }
      } else if (
        videoRef.current &&
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // Fallback for Safari
        if (videoRef.current) {
          videoRef.current.src = proxyUrl;
        }
      }
    };

    initPlayer();

    return () => {
      hls?.destroy();
    };
  }, [watchAnime?.sources]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Comment submitted:", commentText);
    setCommentText("");
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen(); // Safari
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (watchAnimeLoading || animeLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="bg-gray-900 aspect-video relative">
          <video
            ref={videoRef}
            className="w-full h-full"
            autoPlay={false}
            muted={isMuted}
            controls={false}
            onClick={togglePlay}
            crossOrigin="anonymous"
          >
            {watchAnime?.subtitles?.map((subtitle: any) => (
              <track
                key={subtitle.lang}
                kind="subtitles"
                srcLang={subtitle.lang.toLowerCase().split(" ")[0]}
                src={subtitle.url}
                label={subtitle.lang}
                default={subtitle.lang === "English"}
              />
            ))}
            {/* <source
              src={watchAnime?.sources?.[0]?.url}
              type="application/x-mpegURL"
            /> */}
          </video>

          {/* Video Controls */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4 mb-2">
              <button onClick={togglePlay}>
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
              <button>
                <Forward className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute}>
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
                <Slider
                  value={[volume * 100]}
                  onValueChange={(val) => {
                    setVolume(val[0] / 100);
                    if (videoRef.current) {
                      videoRef.current.muted = false;
                    }
                    setIsMuted(false);
                  }}
                  max={100}
                  step={1}
                  className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-blue-500"
                />
              </div>
              <div className="text-sm">{/* Time display would go here */}</div>
              <div className="ml-auto flex items-center gap-4">
                {watchAnime?.subtitles?.length > 0 && (
                  <select
                    onChange={(e) => {
                      if (!videoRef.current) return;
                      const tracks = videoRef.current.textTracks;
                      for (let i = 0; i < tracks.length; i++) {
                        tracks[i].mode =
                          tracks[i].language === e.target.value
                            ? "showing"
                            : "hidden";
                      }
                    }}
                    className="bg-black/50 text-white text-sm rounded px-2 py-1"
                  >
                    <option value="">Subtitles</option>
                    {watchAnime.subtitles.map((subtitle: any) => (
                      <option
                        key={subtitle.lang}
                        value={subtitle.lang.toLowerCase().split(" ")[0]}
                      >
                        {subtitle.lang}
                      </option>
                    ))}
                  </select>
                )}
                <button>
                  <Settings className="h-5 w-5" />
                </button>
                <button onClick={handleFullscreen}>
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
            {/* <div className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration}
              step={0.1}
              onValueChange={(value) => {
                if (videoRef.current) {
                  videoRef.current.currentTime = value[0];
                }
              }}
              className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-blue-500"
            /> */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-4 mb-6">
              <Link href={`/anime/${anime?.id}`}>
                <Button variant="ghost" className="p-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{anime?.title}</h1>
                <div className="text-sm text-gray-400">
                  Episode {anime?.number}: {anime?.title}
                </div>
              </div>
              <div className="ml-auto">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Bookmark className="mr-2 h-4 w-4" /> Add to Bookmarks
                </Button>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <Button variant="outline" className="border-gray-700">
                Previous Episode
              </Button>
              <Link href={`/watch/${anime?.id}?episode=${anime?.nextEpisode}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Next Episode
                </Button>
              </Link>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Comments</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowComments(!showComments)}
                >
                  {showComments ? (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" /> Hide
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" /> Show
                    </>
                  )}
                </Button>
              </div>

              {showComments && (
                <>
                  <div className="mb-6">
                    <form onSubmit={handleCommentSubmit}>
                      <Textarea
                        placeholder="Add a comment..."
                        className="bg-gray-800 border-gray-700 text-white mb-2"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Post Comment
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Up Next</h2>
            <div className="space-y-3">
              {anime?.episodes?.map((episode: any) => (
                <Link key={episode.id} href={`/watch/${episode.id}`}>
                  <div className="bg-gray-900 rounded-lg overflow-hidden flex hover:bg-gray-800 transition-colors mb-2">
                    <div className="p-3">
                      <div className="text-sm font-medium mb-1">
                        Episode {episode.number}
                      </div>
                      <div className="text-xs text-gray-400">
                        {episode.duration || "23 min"}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
