"use client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";

export function useBooks(query = "", authenticated = false) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((v) => v + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: "" }));
    apiRequest(`/books${query ? `?${query}` : ""}`, {
      authenticated,
      signal: controller.signal,
    })
      .then((data) => {
        if (!controller.signal.aborted)
          setState({ data, loading: false, error: "" });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setState({ data: null, loading: false, error: error.message });
        if (error.status !== 401) toast.error(error.message);
      });
    return () => controller.abort();
  }, [query, authenticated, version]);
  return { ...state, reload };
}
