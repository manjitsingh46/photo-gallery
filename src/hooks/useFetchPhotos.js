import { useEffect, useState } from "react";

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    async function fetchPhotos() {
      setLoading(true);
      setError("");

      try {
        const res = await fetch("https://picsum.photos/v2/list?limit=30");
        if (!res.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await res.json();
        if (!isCancelled) {
          setPhotos(data);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Could not load photos. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { photos, loading, error };
}
