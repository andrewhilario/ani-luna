"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    setLoading(true);

    const { username, password, rememberMe } = formData;

    // Example API call
    await signIn("credentials", {
      username: username,
      password: password,
      redirect: false
    }).then((callback) => {
      if (callback?.error) {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
        setLoading(false);
      } else {
        toast({
          title: "Login successful",
          description: "Welcome back!",
          variant: "default"
        });
        router.push("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-500">
            AniLuna
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6">Welcome back</h1>
          <p className="text-gray-400 mt-2">Sign in to continue to AniLuna</p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 shadow-xl">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    checked={formData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                    className="data-[state=checked]:bg-blue-600"
                  />
                  <Label
                    htmlFor="remember-me"
                    className="text-sm text-gray-300"
                  >
                    Remember me
                  </Label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </Link>
              </div>

              {loading ? (
                <Button
                  type="submit"
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                  disabled={true}
                >
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 animate-spin" />
                    Loading...
                  </span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Sign In
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
