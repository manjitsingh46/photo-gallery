import React from "react";

function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div className="photo-card">
      <img src={photo.download_url} alt={photo.author} />
      <div className="photo-card-body">
        <div className="photo-author">{photo.author}</div>
        <button onClick={onToggleFavourite} className="favorite-btn" aria-label="Toggle favourite">
          <span className={isFavourite ? "text-red-500" : "text-gray-400"}>{isFavourite ? "♥" : "♡"}</span>
        </button>
      </div>
    </div>
  );
}

export default PhotoCard;
