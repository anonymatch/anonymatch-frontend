'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, MessageSquare, User, Settings } from 'lucide-react'
import Image from "next/image"
import BottomNavigation from "@/components/BottomNavigation"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <User className="w-6 h-6" />
          <h1 className="text-lg font-semibold">Welcome Back, John!</h1>
          <Settings className="w-6 h-6" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center space-y-2">
            <Avatar className="w-24 h-24 border-4 border-[#FF4081]">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Revilla" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-xl font-bold">Revilla</h2>
              <p className="text-sm text-gray-500">@john_doe</p>
            </div>
          </div>

          {/* Matches Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Matches Suggested for You</h3>
            <div className="space-y-4">
              {[
                {
                  name: "Jane",
                  age: 28,
                  bio: "Loves hiking and reading",
                  image: "/placeholder.svg?height=300&width=400"
                },
                {
                  name: "Emily",
                  age: 25,
                  bio: "Enjoys cooking and traveling",
                  image: "/placeholder.svg?height=300&width=400"
                }
              ].map((match, index) => (
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
                          <h4 className="font-semibold">{match.name}, {match.age}</h4>
                          <p className="text-sm text-gray-500">{match.bio}</p>
                        </div>
                        <Button className="bg-[#FF4081] hover:bg-[#FF6B6B]">
                          View Profile
                        </Button>
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
              {[
                {
                  name: "Anna",
                  age: 27,
                  description: "Had a great time at the beach",
                  image: "/placeholder.svg?height=200&width=200"
                },
                {
                  name: "Michael",
                  age: 30,
                  description: "Went to a concert",
                  image: "/placeholder.svg?height=200&width=200"
                }
              ].map((date, index) => (
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
                      <h4 className="font-semibold">{date.name}, {date.age}</h4>
                      <p className="text-xs text-gray-500">{date.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <BottomNavigation activePath="/main-chats" />
    </div>
  )
}