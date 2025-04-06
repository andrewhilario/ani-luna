/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Image from "next/image";

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
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`}>
      <Card className="bg-gray-900 border-gray-800 overflow-hidden group transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
        <div className="relative aspect-[2/3]">
          <img
            src={anime.image || anime.banner}
            alt={anime.title}
            className="w-full h-full object-cover"
            loading="lazy"
            width={300}
            height={450}
            style={{ aspectRatio: "2/3" }}
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="bg-black/60 p-1.5 rounded-full hover:bg-blue-600/80"
              onClick={(e) => {
                e.preventDefault();
                // Bookmark functionality would be implemented here
              }}
            >
              <Bookmark className="h-4 w-4" />
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
          <h3 className="font-medium text-sm line-clamp-2">{anime.title}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
