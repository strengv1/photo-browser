import type { Album } from "../lib/types";

const API_BASE = "https://jsonplaceholder.typicode.com/albums"

export const fetchAlbum = async (albumId: number, signal?: AbortSignal) => {
  const res = await fetch(`${API_BASE}/${albumId}/`, { signal });
  if (!res.ok) {
    throw new Error("Failed to fetch album");
  }

  const album: Album = await res.json();

  return album;
};

export const fetchUserAlbums = async (userId: number, signal?: AbortSignal) => {
  const res = await fetch(`${API_BASE}?userId=${userId}`, { signal });
  if (!res.ok) {
    throw new Error("Failed to fetch albums");
  }

  const albums: Album[] = await res.json();

  return albums;
};
