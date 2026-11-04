"use client";
import { useState } from "react";
import Image from "next/image";

export default function Avatar({ user, large = false }) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-accent-soft font-semibold text-accent ${large ? "size-24 text-3xl" : "size-10 text-base"}`}
    >
      {user.name?.trim().slice(0, 1).toUpperCase() || "R"}
      {user.image && !failed && (
        <Image
          unoptimized
          src={user.image}
          alt={`${user.name}'s profile`}
          fill
          className="object-cover"
          onError={() => setFailed(true)}
          sizes={large ? "96px" : "40px"}
        />
      )}
    </span>
  );
}
