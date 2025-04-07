/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Star, TrendingUp } from "lucide-react";
import FeaturedAnime from "@/components/featured-anime";
import AnimeCard from "@/components/anime-card";
import useNewReleases from "@/hooks/new-releases";
import useLatestCompleted from "@/hooks/latest-completed";
import { useEffect } from "react";
import useRecentAdded from "@/hooks/recent-episodes";
import useRecentEpisodes from "@/hooks/recent-episodes";
import Header from "@/components/header";

type Anime = {
  id: string;
  title: string;
  url: string;
  image: string;
  japaneseTitle: string;
  type: string;
  sub: number;
  dub: number;
  episodes: number;
};

export default function HomePage() {
  const { newReleases, newReleasesLoading } = useNewReleases();
  const { latestCompleted, latestCompletedLoading } = useLatestCompleted();
  const { recentEpisodes, recentEpisodesLoading } = useRecentEpisodes();

  useEffect(() => {
    console.log("New Releases:", newReleases);
    console.log("Latest Completed:", latestCompleted);
  }, [latestCompleted, newReleases]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 pb-12">
        <FeaturedAnime />

        <section className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="text-blue-500" />
            <h2 className="text-2xl font-bold">Trending Now</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newReleasesLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-md h-64 animate-pulse"
                    ></div>
                  ))
              : newReleases?.results.map((anime: Anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-blue-500" />
            <h2 className="text-2xl font-bold">Popular This Season</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {latestCompletedLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-md h-64 animate-pulse"
                    ></div>
                  ))
              : latestCompleted?.results.map((anime: Anime) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <PlayCircle className="text-blue-500" />
            <h2 className="text-2xl font-bold">New Episodes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recentEpisodesLoading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-md h-64 animate-pulse"
                    ></div>
                  ))
              : recentEpisodes?.results.map((anime: Anime) => (
                  <Card
                    key={anime.id}
                    className="bg-gray-900 border-gray-800 overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={anime.image || "/placeholder.svg"}
                        alt={anime.title}
                        className="w-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">
                        EP {anime.episodes}
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-medium truncate">{anime.title}</h3>
                      <p className="text-xs text-gray-400">
                        New episode released today
                      </p>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </section>
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
