import type { Photo } from "../lib/types"

const API_BASE = "https://jsonplaceholder.typicode.com/photos"
const IMAGE_REPLACE_API_BASE = "https://picsum.photos"

export const replaceBrokenLinks = (p: Photo) => {
  return {
    ...p,
    thumbnailUrl: `${IMAGE_REPLACE_API_BASE}/seed/${p.id}/150.webp`,
    url: `${IMAGE_REPLACE_API_BASE}/seed/${p.id}/600/400.webp`
  }
}

export const fetchPhotos = async (page: number, limit: number, signal?: AbortSignal) => {
  const res = await fetch(`${API_BASE}?_page=${page}&_limit=${limit}`, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch photos");
  }

  const photos: Photo[] = await res.json();

  return photos.map((p) => replaceBrokenLinks(p));
};


export const fetchSinglePhoto = async (id: number, signal?: AbortSignal) => {
  const res = await fetch(`${API_BASE}/${id}`, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch photo");
  }

  const photo: Photo = await res.json();

  return replaceBrokenLinks(photo);
};
