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
import useSignUp from "@/hooks/signup";

export default function RegisterPage() {
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, loading, setLoading } = useSignUp();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Handle registration logic here
    const { username, email, password, agreeTerms } = formData;
    if (!agreeTerms) {
      toast({
        title: "Terms not accepted",
        description: "You must accept the terms and conditions to register.",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    // Example API call
    await signUp({
      username: username,
      email: email,
      password: password
    });

    // Reset form
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false
    });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-blue-500">
            AniLuna
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6">
            Create an account
          </h1>
          <p className="text-gray-400 mt-2">Join the AniLuna community</p>
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
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
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
                    placeholder="Create a password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-200">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={handleCheckboxChange}
                  required
                  className="data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-400 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {loading ? (
                <Button type="submit" className="w-full mt-4" disabled={true}>
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 animate-spin" />
                    Signing Up...
                  </span>
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Create Account
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
