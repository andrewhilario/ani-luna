/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark, BookmarkCheck } from "lucide-react";
import Image from "next/image";
import useBookmark from "@/hooks/bookmark";
import { useEffect } from "react";
import useAnimeInfo from "@/hooks/info";

interface AnimeCardProps {
  anime: {
    id: string;
    title: string;
    url: string;
    banner?: string;
    image: string;
    japaneseTitle: string;
    type: string; // Could be more specific like "TV" | "Movie" | "OVA" | etc.
    sub: number;
    dub: number;
    episodes: number;
    description?: string;
    anime_id?: string;
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const { addBookMark, bookmarkDetail, bookmarkDetailLoading } = useBookmark(
    anime.id
  );

  const { anime: info, animeLoading } = useAnimeInfo(
    anime.anime_id ?? anime.id
  );

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    const releaseDate = new Date().toISOString().split("T")[0];

    addBookMark({
      anime: {
        anime_id: anime.id,
        title: anime.title,
        description: anime.description ?? "",
        release_date: releaseDate
      }
    });
  };

  return (
    <Link href={`/anime/${anime.id}`}>
      <Card className="bg-gray-900 border-gray-800 overflow-hidden group transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
        <div className="relative aspect-[2/3]">
          <img
            src={anime.image || anime.banner || info?.banner || info?.image}
            alt={anime.title || info?.title}
            className="w-full h-full object-cover"
            loading="lazy"
            width={300}
            height={450}
            style={{ aspectRatio: "2/3" }}
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className={`p-1.5 rounded-full ${
                bookmarkDetail?.anime?.anime_id === anime.id ||
                info?.id === anime.id
                  ? "bg-blue-600/80 text-white"
                  : "bg-black/60 hover:bg-blue-600/80 text-gray-400"
              }`}
              onClick={handleBookmark}
              disabled={bookmarkDetailLoading}
            >
              {bookmarkDetail?.anime?.anime_id === anime.id || info?.id ? (
                <BookmarkCheck className="w-5 h-5" />
              ) : (
                <Bookmark className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent pt-10 pb-2 px-2">
            <div className="flex items-center justify-between">
              {/* <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                {anime.rating}
              </span> */}
              <span className="text-xs text-gray-300">HD</span>
            </div>
          </div>
        </div>
        <CardContent className="p-2">
          <h3 className="font-medium text-sm line-clamp-2">
            {anime.title || info?.title}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
}
