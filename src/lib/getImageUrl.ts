// lib/getImageUrl.ts
export function getImageUrl(url?: string) {
  if (!url) return "/placeholder.png";

  // already absolute
  if (url.startsWith("http")) return url;

  // backend relative path
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}
