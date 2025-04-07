import type React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { TanstackProvider } from "@/components/tanstack-provider/provider";
import AuthProviders from "@/components/auth-provider/auth-provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Ani-Luna",
  description: "An anime streaming platform"
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <AuthProviders session={session}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </AuthProviders>
        </TanstackProvider>
      </body>
    </html>
  );
}
