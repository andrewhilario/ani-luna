"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Info, Play } from "lucide-react";
import Link from "next/link";
import useSpotlight from "@/hooks/spotlight";
import useAnimeInfo from "@/hooks/info";

export default function FeaturedAnime() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { spotlight, spotlightLoading } = useSpotlight();

  const current = spotlight?.results[currentSlide];

  const { anime, animeLoading } = useAnimeInfo(current?.id);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % spotlight.results.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? spotlight.results.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative h-[500px] mt-4 rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${current?.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      <div className="relative h-full flex flex-col justify-center px-8 md:px-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          {current?.title}
        </h1>
        <div className="flex gap-2 mb-4">
          {anime?.genres.map((genre: any) => (
            <span
              key={genre}
              className="bg-blue-600/80 px-2 py-1 rounded text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
        <p className="text-gray-200 mb-6 line-clamp-3">{anime?.description}</p>
        <div className="flex gap-4">
          <Link href={`/watch/${current?.id}`}>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Play className="mr-2 h-4 w-4" /> Watch Now
            </Button>
          </Link>
          <Link href={`/anime/${current?.id}`}>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/10"
            >
              <Info className="mr-2 h-4 w-4" /> More Info
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {spotlightLoading ? (
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse"></div>
          </div>
        ) : (
          spotlight?.results.map((data: any, index: number) => (
            <button
              key={data.id}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-blue-500" : "bg-white/30"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))
        )}
      </div>

      <div className="absolute top-1/2 left-4 -translate-y-1/2">
        <button
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          onClick={handlePrev}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <button
          className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          onClick={handleNext}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
