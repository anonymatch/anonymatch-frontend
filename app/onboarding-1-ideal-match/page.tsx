"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function Component() {
  const [formData, setFormData] = useState({
    interests: "",
    values: "",
    goals: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-40 h-40">
            <img
              src="/assets/logo.png"
              alt="ANONYMATCH Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Describe your ideal Match
            </h2>
            <p className="text-sm text-gray-600">
              Help us understand what you are looking for. There are no limits
              and be as descriptive as possible. We will use AI to find people
              who are looking for something similar to suit your preferences and
              needs.
            </p>
          </div>

          <div className="space-y-6">
            {/* Interests Section */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-900">
                Interests
              </label>
              <Textarea
                placeholder="What do you want to share with your loved one?"
                className="min-h-[100px] bg-gray-50 border-gray-200"
                value={formData.interests}
                onChange={(e) => handleChange("interests", e.target.value)}
              />
            </div>

            {/* Values Section */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-900">
                Values
              </label>
              <Textarea
                placeholder="What are the core values are you searching? What are your non negociables?"
                className="min-h-[100px] bg-gray-50 border-gray-200"
                value={formData.values}
                onChange={(e) => handleChange("values", e.target.value)}
              />
            </div>

            {/* Goals Section */}
            <div className="space-y-2">
              <label className="text-lg font-semibold text-gray-900">
                Goals
              </label>
              <Textarea
                placeholder="Where do you see yourself in the next 2 years? in 5? how about in 10?"
                className="min-h-[100px] bg-gray-50 border-gray-200"
                value={formData.goals}
                onChange={(e) => handleChange("goals", e.target.value)}
              />
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/onboarding-2-create-profile">
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
    </div>
  );
}
