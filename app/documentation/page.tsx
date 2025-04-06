/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  Info,
  Search,
  Clock,
  Calendar,
  Sparkles,
  Film,
  Tv
} from "lucide-react";

export default function DocumentationPage() {
  const providerInfo = {
    intro:
      "Welcome to the animekai provider: check out the provider's website @ https://animekai.to",
    routes: [
      "/:query",
      "/latest-completed",
      "/new-releases",
      "/recent-added",
      "/recent-episodes",
      "/schedule/:date",
      "/spotlight",
      "/search-suggestions/:query",
      "/info",
      "/watch/:episodeId",
      "/genre/list",
      "/genre/:genre",
      "/movies",
      "/ona",
      "/ova",
      "/specials",
      "/tv"
    ],
    documentation: "https://anime-db-eight.vercel.app/anime/animekai"
  };

  // Group routes by category for better organization
  const routeCategories = {
    browse: [
      "/:query",
      "/latest-completed",
      "/new-releases",
      "/recent-added",
      "/recent-episodes",
      "/spotlight"
    ],
    search: ["/search-suggestions/:query"],
    info: ["/info", "/watch/:episodeId"],
    genres: ["/genre/list", "/genre/:genre"],
    types: ["/movies", "/ona", "/ova", "/specials", "/tv"],
    schedule: ["/schedule/:date"]
  };

  // Icon mapping for route categories
  const categoryIcons: Record<string, React.ReactNode> = {
    browse: <Clock className="h-4 w-4" />,
    search: <Search className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
    genres: <Film className="h-4 w-4" />,
    types: <Tv className="h-4 w-4" />,
    schedule: <Calendar className="h-4 w-4" />
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            AnimeKai Provider Documentation
          </h1>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm">
              API
            </Badge>
            <Badge variant="outline" className="text-sm">
              Anime
            </Badge>
            <Link
              href="https://animekai.to"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
            >
              <ExternalLink className="h-3 w-3" />
              animekai.to
            </Link>
          </div>
          <p className="text-lg text-muted-foreground">{providerInfo.intro}</p>
        </div>

        {/* Main documentation card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Available Routes
            </CardTitle>
            <CardDescription>
              The following endpoints are available in the AnimeKai provider API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(routeCategories).map(([category, routes]) => (
                <Card key={category} className="overflow-hidden border-muted">
                  <CardHeader className="bg-muted/50 py-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      {categoryIcons[category]}
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ul className="divide-y">
                      {routes.map((route) => (
                        <li
                          key={route}
                          className="px-4 py-2 text-sm hover:bg-muted/50"
                        >
                          <code className="font-mono bg-muted px-1 py-0.5 rounded text-xs">
                            {route}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Example usage */}
        <Card>
          <CardHeader>
            <CardTitle>Example Usage</CardTitle>
            <CardDescription>
              Here's how to use the AnimeKai provider API
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Base URL</h3>
                <code className="font-mono bg-muted p-2 rounded block">
                  https://anime-db-eight.vercel.app/anime/animekai
                </code>
              </div>

              <div>
                <h3 className="font-medium mb-2">Search for Anime</h3>
                <code className="font-mono bg-muted p-2 rounded block">
                  GET /search/naruto
                </code>
              </div>

              <div>
                <h3 className="font-medium mb-2">Get Recent Episodes</h3>
                <code className="font-mono bg-muted p-2 rounded block">
                  GET /recent-episodes
                </code>
              </div>

              <div>
                <h3 className="font-medium mb-2">Watch an Episode</h3>
                <code className="font-mono bg-muted p-2 rounded block">
                  GET /watch/episode-id-here
                </code>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional resources */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href={providerInfo.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  Official Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://animekai.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  AnimeKai Website
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
