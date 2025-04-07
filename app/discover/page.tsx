"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Search,
  Filter,
  Star,
  Calendar,
  Clock,
  TrendingUp
} from "lucide-react";
import AnimeCard from "@/components/anime-card";
import useMostFavorite from "@/hooks/most-favorite";
import Header from "@/components/header";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import useSpotlight from "@/hooks/spotlight";
import useMostPopular from "@/hooks/most-popular";
import useNewReleases from "@/hooks/new-releases";

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
  nsfw: boolean;
};

export default function DiscoverPage() {
  const router = useRouter();
  const params = useSearchParams();
  const tab = params.get("tab");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [ratingRange, setRatingRange] = useState<number[]>([0, 10]);
  // Add these new state variables after the existing ones
  const [selectedType, setSelectedType] = useState<string>("");
  const [showNsfw, setShowNsfw] = useState<boolean>(true);
  const [subDubFilter, setSubDubFilter] = useState<string>("all");

  const [animeLists, setAnimeLists] = useState<any[]>([]);

  const { mostFavorite, mostFavoriteLoading } = useMostFavorite();
  const { spotlight, spotlightLoading } = useSpotlight();
  const { newReleases, newReleasesLoading } = useNewReleases();
  const { mostPopular, mostPopularLoading } = useMostPopular();

  useEffect(() => {
    const currentTab = tab || "trending";

    switch (currentTab) {
      case "trending":
        if (!mostFavoriteLoading && mostFavorite?.results) {
          setAnimeLists(mostFavorite.results);
        }
        break;
      case "popular":
        if (!mostPopularLoading && mostPopular?.results) {
          setAnimeLists(mostPopular.results);
        }
        break;
      case "newest":
        if (!newReleasesLoading && newReleases?.results) {
          setAnimeLists(newReleases.results);
        }
        break;
      case "upcoming":
        if (!spotlightLoading && spotlight?.results) {
          setAnimeLists(spotlight.results);
        }
        break;
      default:
        if (!mostFavoriteLoading && mostFavorite?.results) {
          setAnimeLists(mostFavorite.results);
        }
    }
  }, [
    mostFavorite?.results,
    mostFavoriteLoading,
    mostPopular?.results,
    mostPopularLoading,
    newReleases?.results,
    newReleasesLoading,
    params,
    tab,
    spotlight?.results,
    spotlightLoading
  ]);

  // Update the filteredAnime function to include the new filters
  const filteredAnime = animeLists?.filter((anime: Anime) => {
    // Filter by search query
    if (
      searchQuery &&
      !anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by type
    if (selectedType && anime.type !== selectedType) {
      return false;
    }

    // Filter by NSFW
    if (!showNsfw && anime.nsfw) {
      return false;
    }

    // Filter by sub/dub
    if (subDubFilter === "sub" && anime.sub !== 1) {
      return false;
    }
    if (subDubFilter === "dub" && anime.dub !== 1) {
      return false;
    }

    // // Filter by year
    // if (selectedYear && anime.year?.toString() !== selectedYear) {
    //   return false
    // }

    // // Filter by season
    // if (selectedSeason && anime.season !== selectedSeason) {
    //   return false
    // }

    // // Filter by status
    // if (selectedStatus && anime.status !== selectedStatus) {
    //   return false
    // }

    // // Filter by rating range
    // if (anime.rating && (anime.rating < ratingRange[0] || anime.rating > ratingRange[1])) {
    //   return false
    // }

    return true;
  });

  const handleGenreToggle = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Update the resetFilters function to include the new filters
  const resetFilters = () => {
    setSelectedGenres([]);
    setSelectedYear("");
    setSelectedSeason("");
    setSelectedStatus("");
    setRatingRange([0, 10]);
    setSelectedType("");
    setShowNsfw(true);
    setSubDubFilter("all");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Discover Anime</h1>
          <p className="text-gray-400">
            Find your next favorite anime with our advanced search and filters
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Section - Mobile Toggle */}
          <div className="lg:hidden w-full mb-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="w-full border-gray-700 flex items-center justify-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters Section */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-1/4 bg-gray-900 rounded-xl p-4`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Year</h3>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="All Years" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Years</SelectItem>
                    {[2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Season</h3>
                <Select
                  value={selectedSeason}
                  onValueChange={setSelectedSeason}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="All Seasons" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="Winter">Winter</SelectItem>
                    <SelectItem value="Spring">Spring</SelectItem>
                    <SelectItem value="Summer">Summer</SelectItem>
                    <SelectItem value="Fall">Fall</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Status</h3>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Rating Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 10]}
                    min={0}
                    max={10}
                    step={0.1}
                    value={ratingRange}
                    onValueChange={setRatingRange}
                    className="[&>span:first-child]:h-1 [&>span:first-child]:bg-gray-700 [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-blue-500"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>{ratingRange[0].toFixed(1)}</span>
                    <span>{ratingRange[1].toFixed(1)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Genres</h3>
                <div className="space-y-2">
                  {[
                    "Action",
                    "Adventure",
                    "Comedy",
                    "Drama",
                    "Fantasy",
                    "Horror",
                    "Mystery",
                    "Romance",
                    "Sci-Fi",
                    "Slice of Life"
                  ].map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => handleGenreToggle(genre)}
                        className="data-[state=checked]:bg-blue-600"
                      />
                      <Label
                        htmlFor={`genre-${genre}`}
                        className="text-sm text-gray-300"
                      >
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Add these new filter sections inside the filters div (after the existing filters) */}
              <div>
                <h3 className="text-sm font-medium mb-2">Type</h3>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="TV">TV</SelectItem>
                    <SelectItem value="Movie">Movie</SelectItem>
                    <SelectItem value="OVA">OVA</SelectItem>
                    <SelectItem value="ONA">ONA</SelectItem>
                    <SelectItem value="Special">Special</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Version</h3>
                <Select value={subDubFilter} onValueChange={setSubDubFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Sub/Dub" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Versions</SelectItem>
                    <SelectItem value="sub">Subbed</SelectItem>
                    <SelectItem value="dub">Dubbed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="show-nsfw"
                  checked={showNsfw}
                  onCheckedChange={(checked) => setShowNsfw(checked as boolean)}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="show-nsfw" className="text-sm text-gray-300">
                  Show NSFW Content
                </Label>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search anime by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white"
                />
              </div>
            </div>

            <Tabs
              defaultValue={"trending"}
              value={tab || "trending"}
              onValueChange={(value) => {
                console.log("Tab changed to:", value); // Add this to verify
                router.push(`/discover?tab=${value}`);
              }}
            >
              <TabsList className="bg-gray-800 mb-6">
                <TabsTrigger
                  value="trending"
                  className="data-[state=active]:bg-blue-600"
                >
                  <TrendingUp className="mr-2 h-4 w-4" /> Trending
                </TabsTrigger>
                <TabsTrigger
                  value="popular"
                  className="data-[state=active]:bg-blue-600"
                >
                  <Star className="mr-2 h-4 w-4" /> Popular
                </TabsTrigger>
                <TabsTrigger
                  value="newest"
                  className="data-[state=active]:bg-blue-600"
                >
                  <Calendar className="mr-2 h-4 w-4" /> Newest
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-blue-600"
                >
                  <Clock className="mr-2 h-4 w-4" /> Upcoming
                </TabsTrigger>
              </TabsList>

              {["trending", "popular", "newest", "upcoming"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  {(tab === "trending" && mostFavoriteLoading) ||
                  (tab === "popular" && mostPopularLoading) ||
                  (tab === "newest" && newReleasesLoading) ||
                  (tab === "upcoming" && spotlightLoading) ? (
                    <div className="flex justify-center items-center py-20">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : filteredAnime?.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {filteredAnime?.map((anime: any) => (
                        <AnimeCard key={anime.id} anime={anime} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-400">
                        No anime found matching your filters.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 border-gray-700"
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-blue-500">
                AniStream
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
            © {new Date().getFullYear()} AniStream. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
