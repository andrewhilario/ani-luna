import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

type Props = {};

export default function Header({}: Props) {
  const { data: session } = useSession();
  const [dropdownVisible, setDropdownVisible] = React.useState(false);

  return (
    <header className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          AniLuna
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
            <Link
              href="/genres"
              className="hover:text-blue-400 transition-colors"
            >
              Genres
            </Link>
          </nav>

          {!session ? (
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
          ) : (
            <div
              className="relative"
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <button className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {session?.user.username?.[0] ||
                    session?.user?.email?.[0] ||
                    "U"}
                </div>
                <span className="hidden md:inline">
                  {session?.user?.name || session?.user?.email}
                </span>
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
