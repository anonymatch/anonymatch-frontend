import { generateObject } from "ai";
import { z } from "zod";
import { geminiFlashModel } from ".";

interface User {
  id: string;
  name: string;
  bio: string;
  sharedPreferences: string[];
  sharedVisions: string[];
  dateIdeas: { title: string; image: string }[];
  galleryImages: string[];
  // ... other fields ...
}

export async function areUsersSimilar(user1: User, user2: User): Promise<boolean> {
  // Construct the prompt to compare the two users
  const prompt = `Determine if the following two user profiles are similar based on their bios, shared preferences, shared visions, and date ideas.  Return "true" if they are similar, "false" otherwise.

  User 1:
  Bio: "${user1.bio}"
  Shared Preferences: ${user1.sharedPreferences.join(", ")}
  Shared Visions: ${user1.sharedVisions.join(", ")}
  Date Ideas: ${user1.dateIdeas.map((idea) => idea.title).join(", ")}

  User 2:
  Bio: "${user2.bio}"
  Shared Preferences: ${user2.sharedPreferences.join(", ")}
  Shared Visions: ${user2.sharedVisions.join(", ")}
  Date Ideas: ${user2.dateIdeas.map((idea) => idea.title).join(", ")}
  `;


  const { object: similarity } = await generateObject({
    model: geminiFlashModel,
    prompt: prompt,
    schema: z.boolean(), // Schema for a boolean response
  });

  return similarity;
}
