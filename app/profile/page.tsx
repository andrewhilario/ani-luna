/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookmarkCheck, Edit, LogOut, Settings } from "lucide-react";
import AnimeCard from "@/components/anime-card";
import Header from "@/components/header";

export default function ProfilePage() {
  // Mock user data - in a real app, this would be fetched from an API
  const user = {
    name: "AnimeEnthusiast",
    avatar: "/placeholder.svg?height=100&width=100",
    joinDate: "January 2023",
    bookmarkedAnime: [
      {
        id: 1,
        title: "Attack on Titan: Final Season",
        rating: 9.8,
        image: "/placeholder.svg?height=300&width=200"
      },
      {
        id: 2,
        title: "Demon Slayer: Entertainment District",
        rating: 9.6,
        image: "/placeholder.svg?height=300&width=200"
      },
      {
        id: 3,
        title: "Jujutsu Kaisen",
        rating: 9.5,
        image: "/placeholder.svg?height=300&width=200"
      },
      {
        id: 4,
        title: "Chainsaw Man",
        rating: 9.4,
        image: "/placeholder.svg?height=300&width=200"
      },
      {
        id: 5,
        title: "Spy x Family",
        rating: 9.2,
        image: "/placeholder.svg?height=300&width=200"
      },
      {
        id: 6,
        title: "My Hero Academia",
        rating: 9.0,
        image: "/placeholder.svg?height=300&width=200"
      }
    ],
    watchHistory: [
      {
        id: 7,
        title: "One Piece",
        episode: 1071,
        lastWatched: "2 hours ago",
        image: "/placeholder.svg?height=180&width=320"
      },
      {
        id: 8,
        title: "Demon Slayer",
        episode: 11,
        lastWatched: "Yesterday",
        image: "/placeholder.svg?height=180&width=320"
      },
      {
        id: 9,
        title: "My Hero Academia",
        episode: 25,
        lastWatched: "3 days ago",
        image: "/placeholder.svg?height=180&width=320"
      },
      {
        id: 10,
        title: "Jujutsu Kaisen",
        episode: 24,
        lastWatched: "1 week ago",
        image: "/placeholder.svg?height=180&width=320"
      }
    ],
    reviews: [
      {
        id: 1,
        animeTitle: "Attack on Titan: Final Season",
        rating: 5,
        text: "Absolutely mind-blowing finale to an incredible series. The animation quality and storytelling were on another level.",
        date: "2 months ago"
      },
      {
        id: 2,
        animeTitle: "Demon Slayer: Entertainment District Arc",
        rating: 5,
        text: "The animation in this season is breathtaking. Every fight scene is a masterpiece.",
        date: "3 months ago"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-gray-900 rounded-xl p-6 flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <h1 className="text-xl font-bold mb-1">{user.name}</h1>
              <p className="text-sm text-gray-400 mb-4">
                Member since {user.joinDate}
              </p>

              <div className="w-full space-y-2 mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700"
                >
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700"
                >
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-3/4 lg:w-4/5">
            <Tabs defaultValue="bookmarks">
              <TabsList className="bg-gray-800 mb-6">
                <TabsTrigger
                  value="bookmarks"
                  className="data-[state=active]:bg-blue-600"
                >
                  <BookmarkCheck className="mr-2 h-4 w-4" /> Bookmarks
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-blue-600"
                >
                  Watch History
                </TabsTrigger>
                <TabsTrigger
                  value="reviews"
                  className="data-[state=active]:bg-blue-600"
                >
                  My Reviews
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bookmarks">
                <h2 className="text-2xl font-bold mb-6">My Bookmarks</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {user.bookmarkedAnime.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime as any} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="history">
                <h2 className="text-2xl font-bold mb-6">Watch History</h2>
                <div className="space-y-4">
                  {user.watchHistory.map((item) => (
                    <Link
                      key={item.id}
                      href={`/watch/${item.id}?episode=${item.episode}`}
                    >
                      <div className="bg-gray-900 rounded-lg overflow-hidden flex hover:bg-gray-800 transition-colors">
                        <div className="w-48 relative">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                            EP {item.episode}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{item.title}</h3>
                          <div className="text-sm text-gray-400 mb-2">
                            Episode {item.episode}
                          </div>
                          <div className="text-xs text-gray-500">
                            Last watched {item.lastWatched}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
                <div className="space-y-6">
                  {user.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{review.animeTitle}</h3>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={
                                i < review.rating
                                  ? "text-yellow-500"
                                  : "text-gray-600"
                              }
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300 mb-2">{review.text}</p>
                      <div className="text-xs text-gray-500">
                        Posted {review.date}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

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
