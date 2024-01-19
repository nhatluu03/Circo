import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ShowcasingArtworks from "../showcasingArtworks/ShowcasingArtworks.jsx";
import "./Artworks.scss";
import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { UserContext } from "../../contexts/user.context.jsx";

export default function Artworks() {
    const [showcasingArtworks, setShowcasingArtworks] = useState([]);
//   const queryClient = useQueryClient();
  useEffect(() => {
    const fetchShowcasingArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/artworks`);
        console.log(response.data);
        // return response.data;
        setShowcasingArtworks(response.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchShowcasingArtworks();
  }, []);

//   const { data: showcasingArtworks } = useQuery({
//     queryKey: ["storeItems"],
//     queryFn: fetchShowcasingArtworks,
//   });

//   const mutation = useMutation({
//     mutationFn: handleUploadSellingArtwork,
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ["storeItems"] });
//     },
//   });

  return (
    <div className="newsfeed">
      <ShowcasingArtworks showcasingArtworks={showcasingArtworks} />
    </div>
  );
}
