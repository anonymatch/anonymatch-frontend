"use client";

import { Button } from "@/components/ui/button";
import { ImageIcon, Plus, Settings, Upload, User } from "lucide-react";
import Link from "next/link";
import BottomNavigation from "@/components/BottomNavigation";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import data from "@/data/user-profile.json";

export default function Component() {
  const [profile, setProfile] = useState({
    profilePicture: null as File | null,
    age: "",
    location: "",
    sexualOrientation: "",
    relationshipPreference: "",
    occupation: "",
    mediaFiles: [] as File[],
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMediaAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + profile.mediaFiles.length <= 10) {
      setProfile((prev) => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, ...files],
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", profile);
    // Handle form submission
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <User className="w-6 h-6" />
          <h1 className="text-lg font-semibold"> Update your profile</h1>
          <Settings className="w-6 h-6" />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Profile Picture Upload */}
          <div className="space-y-2">
            <Label>Profile Picture or PFP</Label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#FF4081] transition-colors"
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">
                    Click to upload profile picture
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label>Age</Label>
            <Input
              type="number"
              min="18"
              max="120"
              value={profile.age}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, age: e.target.value }))
              }
              className="bg-gray-50"
            />
          </div>

          {/* Base Location */}
          <div className="space-y-2">
            <Label>Base Location</Label>
            <Input
              type="text"
              value={profile.location}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, location: e.target.value }))
              }
              className="bg-gray-50"
              placeholder="City, Country"
            />
          </div>

          {/* Sexual Orientation */}
          <div className="space-y-2">
            <Label>Sexual Orientation</Label>
            <Select
              onValueChange={(value) =>
                setProfile((prev) => ({ ...prev, sexualOrientation: value }))
              }
            >
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Select your orientation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="straight">Straight</SelectItem>
                <SelectItem value="gay">Gay</SelectItem>
                <SelectItem value="lesbian">Lesbian</SelectItem>
                <SelectItem value="bisexual">Bisexual</SelectItem>
                <SelectItem value="pansexual">Pansexual</SelectItem>
                <SelectItem value="asexual">Asexual</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Relationship Preference */}
          <div className="space-y-2">
            <Label>Relationship Preference</Label>
            <Select
              onValueChange={(value) =>
                setProfile((prev) => ({
                  ...prev,
                  relationshipPreference: value,
                }))
              }
            >
              <SelectTrigger className="bg-gray-50">
                <SelectValue placeholder="Select relationship type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="long-term">
                  Long Term Relationship
                </SelectItem>
                <SelectItem value="casual">Casual Dating</SelectItem>
                <SelectItem value="friendship">Friendship</SelectItem>
                <SelectItem value="marriage">Marriage Minded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label>What do you do for a living?</Label>
            <Input
              type="text"
              value={profile.occupation}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, occupation: e.target.value }))
              }
              className="bg-gray-50"
              placeholder="Your occupation"
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <Label>Share 10 media to describe your personality</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  ref={mediaInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaAdd}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-24 bg-gray-50"
                  onClick={() => mediaInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center">
                    <ImageIcon className="h-6 w-6 mb-1" />
                    <span className="text-sm">Add picture</span>
                  </div>
                </Button>
                {profile.mediaFiles.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#FF4081] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {profile.mediaFiles.length}
                  </span>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                className="h-24 bg-gray-50"
                onClick={() => mediaInputRef.current?.click()}
              >
                <div className="flex flex-col items-center">
                  <Plus className="h-6 w-6 mb-1" />
                  <span className="text-sm">Add media</span>
                </div>
              </Button>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/onboarding-3">
              <Button
                type="submit"
                className="w-full h-12 bg-[#FF4081] hover:bg-[#FF6B6B] text-white rounded-full text-lg font-semibold"
              >
                Submit
              </Button>
            </Link>
          </motion.div>
        </motion.form>
      </motion.div>
      {/* Bottom Navigation */}
      <BottomNavigation activePath="/main-profile" />
    </div>
  );
}
