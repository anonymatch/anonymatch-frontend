import { areUsersSimilar } from "@/ai/actions";

export async function GET() {
  // TODO: get users from DB
  const users = []
  const matchedUsers = []
  const loggedUser = {}

  // Stop when get 10 match users
  for (const userToMatch of users) {
    const areSimilar = await areUsersSimilar(userToMatch, loggedUser);
    if (areSimilar) {
      matchedUsers.push(userToMatch)
    }
  }
  return Response.json(matchedUsers);
}
