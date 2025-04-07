/* eslint-disable @next/next/no-img-element */
"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Bookmark,
  BookmarkCheck,
  Calendar,
  Clock,
  Play,
  Star,
  ThumbsUp
} from "lucide-react";
import useAnimeInfo from "@/hooks/info";
import Header from "@/components/header";

export default function AnimePage({ params }: { params: { id: string } }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { anime, animeLoading } = useAnimeInfo(params.id);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the comment to an API
    console.log("Comment submitted:", commentText);
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {animeLoading ? (
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/4 lg:w-1/5">
              <div className="aspect-[2/3] rounded-lg bg-gray-800 animate-pulse" />
            </div>
            <div className="w-full md:w-3/4 lg:w-4/5">
              <div className="h-8 w-3/4 bg-gray-800 rounded animate-pulse mb-4" />
              <div className="flex gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-800 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-800 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-800 rounded animate-pulse" />
              </div>
              <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2" />
              <div className="h-4 w-full bg-gray-800 rounded animate-pulse mb-2" />
              <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse mb-6" />
              <div className="h-10 w-32 bg-gray-800 rounded animate-pulse mb-8" />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <div
              className="h-[300px] w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${anime?.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          </div>

          <main className="container mx-auto px-4 pb-12">
            <div className="flex flex-col md:flex-row gap-8 -mt-24 relative z-10">
              <div className="w-full md:w-1/4 lg:w-1/5">
                <div className="aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={anime?.image || "/placeholder.svg"}
                    alt={anime?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  onClick={toggleBookmark}
                  className={`w-full mt-4 ${
                    isBookmarked
                      ? "bg-blue-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="mr-2 h-4 w-4" /> Bookmarked
                    </>
                  ) : (
                    <>
                      <Bookmark className="mr-2 h-4 w-4" /> Add to Bookmarks
                    </>
                  )}
                </Button>
              </div>

              <div className="w-full md:w-3/4 lg:w-4/5">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {anime?.title}
                </h1>

                <div className="flex flex-wrap gap-2 mb-4">
                  {anime?.genres?.map((genreItem: string) => {
                    // Check if the format is "Genres: genre1, genre2, ..."
                    const genresString = genreItem.includes("Genres:")
                      ? genreItem.split("Genres:")[1].trim()
                      : genreItem;

                    // Split by comma and render each genre separately
                    return genresString.split(",").map((genre: string) => (
                      <span
                        key={genre.trim()}
                        className="bg-blue-600/80 px-2 py-1 rounded text-xs"
                      >
                        {genre.trim()}
                      </span>
                    ));
                  })}
                </div>

                <div className="flex items-center gap-6 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 h-4 w-4" />
                    <span>{anime?.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{anime?.releaseYear}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{anime?.duration}</span>
                  </div>
                  <div>
                    <span className="text-green-500">{anime?.status}</span>
                  </div>
                </div>

                <p className="text-gray-200 mb-8">{anime?.description}</p>

                <Link href={`/watch/${anime?.id}`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 mb-8">
                    <Play className="mr-2 h-4 w-4" /> Watch Now
                  </Button>
                </Link>

                <Tabs defaultValue="comments">
                  <TabsList className="bg-gray-800">
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="related">Related Anime</TabsTrigger>
                    <TabsTrigger value="episodes">Episodes</TabsTrigger>
                  </TabsList>

                  <TabsContent value="comments" className="mt-6">
                    {/* Comments section */}
                    <div className="mb-6">
                      {false ? (
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
                      ) : (
                        <div className="text-center p-4 bg-gray-800 rounded-lg">
                          <p className="mb-2">Please log in to post comments</p>
                          <Link href="/login">
                            <Button className="bg-blue-600 hover:bg-blue-700">
                              Log In
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="related" className="mt-6">
                    {/* releated anime */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {anime?.recommendations?.map((relatedAnime: any) => (
                        <Link
                          key={relatedAnime.id}
                          href={`/anime/${relatedAnime.id}`}
                        >
                          <div className="bg-gray-800 p-3 rounded-lg flex flex-col items-center">
                            <img
                              src={relatedAnime.image}
                              alt={relatedAnime.title}
                              className="w-full h-auto mb-2 rounded"
                            />
                            <h3 className="text-center font-medium">
                              {relatedAnime.title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="episodes" className="mt-6">
                    <div className="grid gap-2">
                      {anime?.episodes?.map((animeInfo: any) => (
                        <Link
                          key={animeInfo.id}
                          href={`/watch/${animeInfo?.id}`}
                        >
                          <div className="bg-gray-900 p-3 rounded-lg flex justify-between items-center hover:bg-gray-800 transition-colors">
                            <div>
                              <span className="font-medium">
                                Episode {animeInfo?.number}
                              </span>
                            </div>
                            <Play className="h-4 w-4" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </>
      )}

      <footer className="bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-blue-500">
                AniLuna
              </Link>
              <p className="text-gray-400 text-sm mt-2">
                The ultimate anime streaming platform
              </p>
            </div>
            <div className="flex gap-6">
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/faq"
                className="text-gray-400 hover:text-white transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} AniLuna. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
