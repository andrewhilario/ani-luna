"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  VolumeX,
} from "lucide-react"

export default function WatchPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showComments, setShowComments] = useState(true)
  const [commentText, setCommentText] = useState("")

  // Mock data - in a real app, this would be fetched based on the ID
  const anime = {
    id: Number.parseInt(params.id),
    title: "Attack on Titan: Final Season",
    episode: 1,
    episodeTitle: "The Other Side of the Sea",
    nextEpisode: 2,
    comments: [
      {
        id: 1,
        user: { name: "AnimeKing42", avatar: "/placeholder.svg?height=40&width=40" },
        text: "This episode was incredible! The animation quality is top-notch.",
        time: "2 days ago",
        likes: 24,
      },
      {
        id: 2,
        user: { name: "MangaReader", avatar: "/placeholder.svg?height=40&width=40" },
        text: "I've read the manga and they did an amazing job adapting this scene.",
        time: "1 week ago",
        likes: 18,
      },
      {
        id: 3,
        user: { name: "OtakuGirl", avatar: "/placeholder.svg?height=40&width=40" },
        text: "The opening scene gave me chills. Can't wait for the next episode!",
        time: "2 weeks ago",
        likes: 15,
      },
    ],
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send the comment to an API
    console.log("Comment submitted:", commentText)
    setCommentText("")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <div className="bg-gray-900 aspect-video relative">
          <video className="w-full h-full">
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              type="video/mp4"
            />
          </video>

          {/* Video Controls */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={togglePlay}
              className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center"
            >
              {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4 mb-2">
              <button onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button>
                <Forward className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
                <Slider
                  defaultValue={[70]}
                  max={100}
                  step={1}
                  className="w-24 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-blue-500"
                />
              </div>
              <div className="text-sm">14:22 / 23:45</div>
              <div className="ml-auto flex items-center gap-4">
                <button>
                  <Settings className="h-5 w-5" />
                </button>
                <button>
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
            <Slider
              defaultValue={[60]}
              max={100}
              step={1}
              className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-2/3">
            <div className="flex items-center gap-4 mb-6">
              <Link href={`/anime/${anime.id}`}>
                <Button variant="ghost" className="p-2">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">{anime.title}</h1>
                <div className="text-sm text-gray-400">
                  Episode {anime.episode}: {anime.episodeTitle}
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
              <Link href={`/watch/${anime.id}?episode=${anime.nextEpisode}`}>
                <Button className="bg-blue-600 hover:bg-blue-700">Next Episode</Button>
              </Link>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Comments</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
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
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Post Comment
                      </Button>
                    </form>
                  </div>

                  <div className="space-y-6">
                    {anime.comments.map((comment) => (
                      <div key={comment.id} className="flex gap-4">
                        <Avatar>
                          <AvatarImage src={comment.user.avatar} />
                          <AvatarFallback>{comment.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{comment.user.name}</span>
                            <span className="text-xs text-gray-400">{comment.time}</span>
                          </div>
                          <p className="text-gray-200 mb-2">{comment.text}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <button className="flex items-center gap-1 hover:text-blue-400">
                              <ThumbsUp className="h-4 w-4" />
                              <span>{comment.likes}</span>
                            </button>
                            <span className="mx-2">•</span>
                            <button className="hover:text-blue-400">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <h2 className="text-lg font-semibold mb-4">Up Next</h2>
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <Link key={i} href={`/watch/${anime.id}?episode=${anime.episode + i + 1}`}>
                  <div className="bg-gray-900 rounded-lg overflow-hidden flex hover:bg-gray-800 transition-colors">
                    <div className="w-40 relative">
                      <img
                        src={`/placeholder.svg?height=90&width=160`}
                        alt={`Episode ${anime.episode + i + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-sm font-medium mb-1">Episode {anime.episode + i + 1}</div>
                      <div className="text-xs text-gray-400">23 min</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

