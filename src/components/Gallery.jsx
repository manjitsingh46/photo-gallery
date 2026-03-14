import React, { useMemo } from "react";
import { useFetchPhotos } from "../hooks/useFetchPhotos.js";
import PhotoCard from "./PhotoCard.jsx";

function Gallery({ searchTerm, onToggleFavourite, favouriteIds, showFavourites }) {
  const { photos, loading, error } = useFetchPhotos();

  const filteredPhotos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let result = photos;
    if (term) {
      result = result.filter((photo) => {
        const author = photo.author || "";
        return author.toLowerCase().includes(term);
      });
    }
    if (showFavourites) {
      result = result.filter((photo) => favouriteIds.has(photo.id));
    }
    return result;
  }, [photos, searchTerm, showFavourites, favouriteIds]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-600 font-medium py-6">
        {error}
      </p>
    );
  }

  return (
    <div className="photo-grid">
      {filteredPhotos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favouriteIds.has(photo.id)}
          onToggleFavourite={() => onToggleFavourite(photo)}
        />
      ))}
    </div>
  );
}

export default Gallery;
