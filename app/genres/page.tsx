import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Swords,
  Compass,
  Car,
  Laugh,
  Brain,
  Skull,
  Theater,
  Heart,
  Wand2,
  Gamepad2,
  Users,
  Landmark,
  Ghost,
  PlugIcon as Portal,
  Flower2,
  Baby,
  Sparkles,
  Dumbbell,
  BotIcon as Robot,
  Shield,
  Music2,
  Search,
  BadgeAlert,
  HeartHandshake,
  Sword,
  GraduationCap,
  Rocket,
  User,
  Flower,
  HeartPulse,
  FlameKindling,
  Flame,
  Sandwich,
  Orbit,
  Trophy,
  Zap,
  Bomb,
  Droplets
} from "lucide-react";

export default function GenresPage() {
  // Updated genres list with icons and descriptions
  const genres = [
    {
      id: "action",
      name: "Action",
      description:
        "Fast-paced excitement with physical challenges, battles, and high-stakes conflicts.",
      icon: Swords,
      animeCount: 1240
    },
    {
      id: "adventure",
      name: "Adventure",
      description:
        "Journeys, exploration, and exciting experiences in new worlds.",
      icon: Compass,
      animeCount: 987
    },
    {
      id: "cars",
      name: "Cars",
      description: "Focuses on automobiles, racing, and motorsports.",
      icon: Car,
      animeCount: 89
    },
    {
      id: "comedy",
      name: "Comedy",
      description:
        "Humorous content designed to make you laugh with funny situations and jokes.",
      icon: Laugh,
      animeCount: 1456
    },
    {
      id: "dementia",
      name: "Dementia",
      description:
        "Psychological themes with surreal, disorienting, or mind-bending elements.",
      icon: Brain,
      animeCount: 45
    },
    {
      id: "demons",
      name: "Demons",
      description:
        "Features demons, devils, and other supernatural evil entities.",
      icon: Skull,
      animeCount: 187
    },
    {
      id: "drama",
      name: "Drama",
      description:
        "Character-driven stories with emotional themes and realistic conflicts.",
      icon: Theater,
      animeCount: 1123
    },
    {
      id: "ecchi",
      name: "Ecchi",
      description: "Contains mild sexual content and suggestive themes.",
      icon: Heart,
      animeCount: 432
    },
    {
      id: "fantasy",
      name: "Fantasy",
      description:
        "Magical worlds with supernatural elements, mythical creatures, and extraordinary powers.",
      icon: Wand2,
      animeCount: 876
    },
    {
      id: "game",
      name: "Game",
      description: "Centers around games, gaming, or game-like scenarios.",
      icon: Gamepad2,
      animeCount: 156
    },
    {
      id: "harem",
      name: "Harem",
      description:
        "Features a protagonist surrounded by multiple romantic interests.",
      icon: Users,
      animeCount: 321
    },
    {
      id: "historical",
      name: "Historical",
      description:
        "Set in the past, often featuring historical events or settings.",
      icon: Landmark,
      animeCount: 245
    },
    {
      id: "horror",
      name: "Horror",
      description:
        "Frightening content designed to scare viewers with supernatural or psychological themes.",
      icon: Ghost,
      animeCount: 432
    },
    {
      id: "isekai",
      name: "Isekai",
      description:
        "Characters transported to or reborn in another world, often with fantasy elements.",
      icon: Portal,
      animeCount: 543
    },
    {
      id: "josei",
      name: "Josei",
      description:
        "Aimed at adult women, featuring mature themes and realistic relationships.",
      icon: Flower2,
      animeCount: 132
    },
    {
      id: "kids",
      name: "Kids",
      description:
        "Content suitable for children, often educational or with simple moral lessons.",
      icon: Baby,
      animeCount: 210
    },
    {
      id: "magic",
      name: "Magic",
      description: "Features magical abilities, spells, and enchanted worlds.",
      icon: Sparkles,
      animeCount: 654
    },
    {
      id: "martial-arts",
      name: "Martial Arts",
      description:
        "Focuses on fighting techniques, combat skills, and martial arts disciplines.",
      icon: Dumbbell,
      animeCount: 321
    },
    {
      id: "mecha",
      name: "Mecha",
      description:
        "Features robots, cyborgs, and mechanical technology, often with epic battles.",
      icon: Robot,
      animeCount: 345
    },
    {
      id: "military",
      name: "Military",
      description: "Focuses on armed forces, warfare, and military conflicts.",
      icon: Shield,
      animeCount: 187
    },
    {
      id: "music",
      name: "Music",
      description: "Centers around music, musicians, or the music industry.",
      icon: Music2,
      animeCount: 156
    },
    {
      id: "mystery",
      name: "Mystery",
      description:
        "Intriguing stories with puzzles, secrets, and suspenseful revelations.",
      icon: Search,
      animeCount: 567
    },
    {
      id: "parody",
      name: "Parody",
      description:
        "Humorous imitations of other works, genres, or conventions.",
      icon: Theater,
      animeCount: 123
    },
    {
      id: "police",
      name: "Police",
      description:
        "Focuses on law enforcement, detective work, and crime-solving.",
      icon: BadgeAlert,
      animeCount: 145
    },
    {
      id: "psychological",
      name: "Psychological",
      description:
        "Explores the human mind, mental states, and psychological phenomena.",
      icon: Brain,
      animeCount: 321
    },
    {
      id: "romance",
      name: "Romance",
      description:
        "Focuses on love stories, relationships, and emotional connections between characters.",
      icon: HeartHandshake,
      animeCount: 987
    },
    {
      id: "samurai",
      name: "Samurai",
      description: "Features Japanese warriors, often set in feudal Japan.",
      icon: Sword,
      animeCount: 98
    },
    {
      id: "school",
      name: "School",
      description:
        "Set in educational institutions, focusing on student life and relationships.",
      icon: GraduationCap,
      animeCount: 765
    },
    {
      id: "sci-fi",
      name: "Sci-Fi",
      description:
        "Explores futuristic concepts, advanced technology, and scientific theories.",
      icon: Rocket,
      animeCount: 765
    },
    {
      id: "seinen",
      name: "Seinen",
      description:
        "Aimed at adult men, often with mature themes and complex narratives.",
      icon: User,
      animeCount: 432
    },
    {
      id: "shoujo",
      name: "Shoujo",
      description:
        "Aimed at young women, often focusing on romance and personal growth.",
      icon: Flower,
      animeCount: 543
    },
    {
      id: "shoujo-ai",
      name: "Shoujo Ai",
      description:
        "Focuses on romantic relationships between women, typically non-explicit.",
      icon: HeartPulse,
      animeCount: 123
    },
    {
      id: "shounen",
      name: "Shounen",
      description:
        "Aimed at young men, often featuring action, adventure, and coming-of-age themes.",
      icon: FlameKindling,
      animeCount: 876
    },
    {
      id: "shounen-ai",
      name: "Shounen Ai",
      description:
        "Focuses on romantic relationships between men, typically non-explicit.",
      icon: Flame,
      animeCount: 145
    },
    {
      id: "slice-of-life",
      name: "Slice of Life",
      description:
        "Portrays everyday experiences and realistic situations in characters' lives.",
      icon: Sandwich,
      animeCount: 876
    },
    {
      id: "space",
      name: "Space",
      description:
        "Set in outer space, featuring space travel, aliens, and cosmic phenomena.",
      icon: Orbit,
      animeCount: 234
    },
    {
      id: "sports",
      name: "Sports",
      description:
        "Centers around athletic competitions, teamwork, and the pursuit of victory.",
      icon: Trophy,
      animeCount: 543
    },
    {
      id: "super-power",
      name: "Super Power",
      description:
        "Features characters with extraordinary abilities beyond normal human capabilities.",
      icon: Zap,
      animeCount: 432
    },
    {
      id: "supernatural",
      name: "Supernatural",
      description:
        "Features paranormal elements like ghosts, psychic abilities, and otherworldly phenomena.",
      icon: Sparkles,
      animeCount: 765
    },
    {
      id: "thriller",
      name: "Thriller",
      description:
        "Suspenseful stories with high tension, excitement, and unexpected plot twists.",
      icon: Bomb,
      animeCount: 432
    },
    {
      id: "vampire",
      name: "Vampire",
      description:
        "Features vampires and vampire-related themes, often with horror or romance elements.",
      icon: Droplets,
      animeCount: 123
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-500">
            AniStream
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link
                href="/discover"
                className="hover:text-blue-400 transition-colors"
              >
                Discover
              </Link>
              <Link href="/genres" className="text-blue-400">
                Genres
              </Link>
              <Link
                href="/schedule"
                className="hover:text-blue-400 transition-colors"
              >
                Schedule
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hover:text-blue-400 transition-colors"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Anime Genres</h1>
          <p className="text-gray-400">
            Explore anime by genre and discover new series that match your
            interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <Link key={genre.id} href={`/genres/${genre.id}`}>
              <Card className="bg-gray-900 border-gray-800 overflow-hidden h-full hover:border-blue-500 transition-colors">
                <div className="p-6 flex items-center gap-4">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <genre.icon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold capitalize">
                      {genre.name}
                    </h2>
                    <div className="text-sm text-blue-400">
                      {genre.animeCount} titles
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 pt-0">
                  <p className="text-gray-300 text-sm">{genre.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-gray-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Popular Genre Combinations
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Action & Adventure",
              "Romance & Comedy",
              "Sci-Fi & Mystery",
              "Fantasy & Action",
              "Drama & Slice of Life",
              "Horror & Supernatural",
              "Action & Romance",
              "Comedy & Slice of Life",
              "Fantasy & Romance",
              "Mystery & Thriller",
              "Mecha & Sci-Fi",
              "Adventure & Fantasy",
              "Isekai & Fantasy",
              "School & Romance",
              "Supernatural & Mystery",
              "Action & Super Power"
            ].map((combo, index) => (
              <Link
                key={index}
                href={`/discover?genres=${combo
                  .toLowerCase()
                  .replace(" & ", "+")}`}
              >
                <Button
                  variant="outline"
                  className="border-gray-700 hover:border-blue-500 hover:bg-blue-900/20"
                >
                  {combo}
                </Button>
              </Link>
            ))}
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
