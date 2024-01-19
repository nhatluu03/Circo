import { useState } from "react";
import { Link } from "react-router-dom";

export default function ShowcasingArtwork(showcasingArtwork, setSelectedArtworkIdx) {
  if (showcasingArtwork && showcasingArtwork.images && showcasingArtwork.images.length > 0) {
    console.log(showcasingArtwork);
  } else {
    return null;
  }
  return (
    <div key={showcasingArtwork._id} className="showcasing-artwork-item">
      <img
                src={showcasingArtwork?.images[0]}
                alt={showcasingArtwork.description}
                onClick={() => {
                  console.log(index);
                  setSelectedArtworkIdx((prev) => {
                    return showcasingArtwork._id;
                  });
                }}
              />
{/* 
              <div className="showcasing-artwork-item__details">
                <Link
                  className="showcasing-artwork-item__author"
                  to={`http://localhost:5173/talents/${showcasingArtwork.talent._id}`}
                >
                  <img
                    src={showcasingArtwork.talent._id}
                    alt={"Avatar of " + showcasingArtwork.fullname}
                  />
                  <p>{showcasingArtwork.talent ? showcasingArtwork.talent.username : ""}</p>
                </Link>
                <div className="showcasing-artwork-item__reacts">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAdhJREFUSEvV1MurTmEYBfDfiUwRItdSGCjJwCWXJDGlGCi5TFxG/hUjl4wwoSgGZuR+KSkGipQIA5dSUgaE1un9tL9t7+/bnTrJW3v07netZz3PetaIcT4j44zvnxHsxnaswi/cwXlcKop3IN9aRot8gAs4V+9IXcEMnMXWltaFaBJWttxfwX587N1XCSbgNtbgAw7iHn5gA05henkYgAO4hYnl/gSmFYyN+Jl/qwSHcByfsQxva1XOxdXSss14V7ufjyeYgr04Uyd4hBXYh9NjdFdUncRNREWfgu9Fbip5M0aCxXiO95jVRjCvoT1d+ZbgWXkfnD4F97Eae4qTuoJW/zuMY7iMbXWCIziKT1jeMMRhhHPwFJOxs+xFn4L4Oyoy6BdYX3o5DDj3M4s9F+Ea4rLRU1+0DCYOyLC6kqTy6wh4BpydyR41EvSqyYItxMvyoO753vuA38WCAr6utPiP6rawi+QoiStel8ypk1TB0/v4PvPrO4PSNLGQ7GkiqYI/xqaSAH/Na1hch+QGllaUJHuiLm15WAb6pc0JwwjybmohST69Kmk6uzhuC74OslkXgh5JkjZKcmKCRPpA8CabDiomSi4i7diFb10WpKuCLliN//z/BL8BMG5eGQAMP+8AAAAASUVORK5CYII=" />
                  <p>{showcasingArtwork.likes}</p>
                </div>
              </div> */}
    </div>
  );
}
