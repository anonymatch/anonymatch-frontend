"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackButton";
import matchProfileData from "@/data/match-profile.json";

export default function Component() { // Asegúrate de que profileData tiene el tipo correcto

  if (!matchProfileData) {
    return <p>Cargando datos del perfil...</p>; // Manejo de datos no disponibles
  }

  const {
    name,
    age,
    coverImage,
    profileImage,
    bio,
    sharedPreferences,
    sharedVisions,
    dateIdeas,
    galleryImages,
  } = matchProfileData.profile; // Acceder a los datos del perfil


  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <BackButton />
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-[#FF4081]" />
            <span className="font-bold text-[#FF4081]">ANONYMATCH</span>
          </div>
          <div className="w-10" />
        </div>
      </header>

      <main className="pb-20">
        {/* Profile Hero */}
        <div className="relative h-96">
          <Image src={coverImage} alt="Profile cover" fill className="object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{name}</h1>
            <p className="text-xl text-white">Age {age}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 space-y-8 mt-6">
          <section>
            <h2 className="text-xl font-bold mb-3">Bio</h2>
            <p className="text-gray-600">{bio}</p> {/* Mostrar la biografía */}
          </section>

          {/* Shared Preferences */}
          <section>
            <h2 className="text-xl font-bold mb-3">Shared Preferences</h2>
            <div className="flex flex-wrap gap-2">
              {sharedPreferences.map((pref) => (
                <Badge key={pref} variant="secondary" className="px-3 py-1">
                  {pref}
                </Badge>
              ))}
            </div>
          </section>

          {/* Shared Visions */}
          <section>
            <h2 className="text-xl font-bold mb-3">Shared Visions</h2>
            <div className="flex flex-wrap gap-2">
              {sharedVisions.map((vision) => (
                <Badge key={vision} variant="secondary" className="px-3 py-1">
                  {vision}
                </Badge>
              ))}
            </div>
          </section>

          {/* Date Ideas */}
          <section>
            <h2 className="text-xl font-bold mb-3">Date Ideas</h2>
            <div className="grid grid-cols-2 gap-4">
              {dateIdeas.map((idea) => (
                <div key={idea.title} className="relative rounded-lg overflow-hidden">
                  <Image
                    src={idea.image}
                    alt={idea.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-2">
                    <p className="text-white text-sm">{idea.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section>
            <h2 className="text-xl font-bold mb-3">Gallery</h2>
            <div className="grid grid-cols-2 gap-2">
              {galleryImages.map((src, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image src={src} alt={`Gallery image ${index + 1}`} fill className="object-cover" />
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Fixed Date Request Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/chat">
            <Button
              className="w-full h-12 bg-[#FF4081] hover:bg-[#FF6B6B] text-white rounded-full text-lg font-semibold"
              onClick={() => console.log("Date requested")}
            >
              Date Request
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}