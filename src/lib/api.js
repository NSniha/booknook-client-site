"use client";
import { authClient } from "./auth-client";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function apiRequest(
  path,
  { authenticated = false, body, ...options } = {},
) {
  const headers = new Headers(options.headers);
  if (body !== undefined) headers.set("Content-Type", "application/json");
  if (authenticated) {
    const { data, error } = await authClient.token();
    if (error || !data?.token) {
      window.dispatchEvent(new Event("booknook:unauthorized"));
      throw new ApiError("Please log in to continue.", 401);
    }
    headers.set("Authorization", `Bearer ${data.token}`);
  }
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      cache: "no-store",
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError(
      "The library could not be reached. Please try again.",
      503,
    );
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && authenticated)
      window.dispatchEvent(new Event("booknook:unauthorized"));
    throw new ApiError(
      data.message || "Something went wrong. Please try again.",
      response.status,
    );
  }
  return data;
}

export async function uploadCover(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key)
    throw new Error(
      "Image uploads are not configured yet. Please add your imgbb API key.",
    );
  const data = new FormData();
  data.append("image", file);
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${encodeURIComponent(key)}`,
    { method: "POST", body: data },
  );
  const result = await response.json();
  if (!response.ok || !result.success)
    throw new Error(
      result.error?.message ||
        "The cover could not be uploaded. Please try again.",
    );
  return result.data.url;
}
