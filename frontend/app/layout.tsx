import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Summary from "@/components/summary";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative">
          <Image
            src="/bg.jpeg"
            height={800}
            width={1920}
            alt="Background Image"
            className="w-full h-[55vh] object-cover"
          />
          <Navbar />
          <div className="absolute top-24 left-0 right-0 z-10">
            <div className="container max-w-7xl ">
              <div className="text-center flex flex-col gap-3 my-6 pb-4">
                <h1 className="text-xl md:text-2xl font-bold text-pink-500">
                  Share the Bounty
                </h1>
                <h2 className="text-sky-500 text-lg md:text-xl font-bold">
                  Connecting Excess Food to Those in Need
                </h2>
                <p className="text-neutral-200 text-md md:text-lg font-semibold">
                  Join Us in Reducing Food Waste and Fighting Hunger in Your
                  Community
                </p>
                <div className="space-x-4 my-2">
                  <Link
                    href={"/listings/create"}
                    className={cn(buttonVariants(), "bg-sky-600 min-w-28")}
                  >
                    Contribute
                  </Link>
                </div>
              </div>
              <Card className="min-h-[62vh] my-10 p-4 sm:p-8">
                <div className="mt-4">
                  <Summary />
                  <Separator className="mt-8" />
                </div>

                {children}
                
              </Card>
            </div>
            <Footer />
          </div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}