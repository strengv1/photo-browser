import type { User } from "../lib/types";

const API_BASE = "https://jsonplaceholder.typicode.com/users"

export const fetchUser = async (userId: number, signal?: AbortSignal) => {
  const res = await fetch(`${API_BASE}/${userId}`, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }

  const user: User = await res.json();

  return user;
};
