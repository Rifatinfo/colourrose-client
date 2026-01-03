import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Music,
} from "lucide-react";

export default function SocialIcons() {
  return (
    <div className="flex gap-4 bg-transparent text-white">
      <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
      <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
      <Music className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" /> {/* TikTok */}
      <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" /> {/* X */}
      <Youtube className="w-5 h-5 cursor-pointer hover:text-gray-400 transition" />
    </div>
  );
}
