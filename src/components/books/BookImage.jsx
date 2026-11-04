"use client";
import { useState } from "react";
import Image from "next/image";

export default function BookImage({
  src,
  title,
  priority = false,
  className = "",
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px",
}) {
  const [failed, setFailed] = useState(false);
  return (
    <Image
      unoptimized
      src={failed || !src ? "/images/cover-fallback.svg" : src}
      alt={`Cover of ${title}`}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
