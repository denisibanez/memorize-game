import React from "react";
import { FiUser } from "react-icons/fi";
import Image from "next/image";

export default function UserAvatar({
  image,
  name,
  className = "",
}: {
  image?: string;
  name?: string;
  className?: string;
}) {
  return image ? (
    <Image
      src={image}
      alt={name || "Avatar"}
      width={28}
      height={28}
      className={`w-7 h-7 rounded-full border-2 border-cyan-400 shadow ${className}`}
    />
  ) : (
    <FiUser
      data-testid="user-avatar-fallback"
      size={28}
      className={`text-cyan-400 bg-cyan-900 rounded-full p-1 border-2 border-cyan-400 shadow w-7 h-7 ${className}`}
    />
  );
}
