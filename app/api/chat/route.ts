import { areUsersSimilar } from "@/ai/actions";

export async function GET() {
  // const chatId = '
  // TODO: get user from DB FIRESTORE
  const chat = {
    messages: []
  }
  return Response.json(
    chat
  );
}
