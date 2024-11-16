"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, MessageSquare, User, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import BottomNavigation from "@/components/BottomNavigation";
import { useState, useEffect } from "react";
import userProfileData from "@/data/user-profile.json";

export default function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: CALL TO API
        // const response = await fetch('/api/profile'); // Reemplaza con la URL de tu API
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const jsonData = await response.json();
        setData(userProfileData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <User className="w-6 h-6" />
          <h1 className="text-lg font-semibold">Welcome Back, {data.user.name}!</h1>
          <Settings className="w-6 h-6" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-24 h-24 border-4 border-[#FF4081]">
              <AvatarImage
                src={data.user.avatar}
                alt="Revilla"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold">{data.user.name}</h2>
              <p className="text-sm text-gray-500">{data.user.username}</p>
            </div>
          </div>

          {/* Matches Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Matches Suggested for You</h3>
            <div className="space-y-4">
              {data.matches.map((match, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={match.image}
                        alt={match.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">
                            {match.name}, {match.age}
                          </h4>
                          <p className="text-sm text-gray-500">{match.bio}</p>
                        </div>
                        <Link href="/match-profile">
                          <Button className="bg-[#FF4081] hover:bg-[#FF6B6B]">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" className="w-full">
                See More Matches
              </Button>
            </div>
          </div>

          {/* Past Dates Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">People You've Dated</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.pastDates.map((date, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-32 w-full">
                      <Image
                        src={date.image}
                        alt={date.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold">
                        {date.name}, {date.age}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {date.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <BottomNavigation activePath="/main-home" />
    </div>
  );
}
