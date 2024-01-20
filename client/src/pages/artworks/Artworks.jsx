import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ShowcasingArtworks from "../showcasingArtworks/ShowcasingArtworks.jsx";
import FieldSlider from "../../components/fieldSlider/FieldSlider.jsx";
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
        setShowcasingArtworks(response.data);
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

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fields");
        const initialCreativeFields = {};
        response.data.forEach((field) => {
          initialCreativeFields[field.name] = false;
        });

        setFields(response.data);
        setFilters({
          ...filters,
          creativeFields: initialCreativeFields,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchFields();
  }, []);

  const [showFilterBar, setShowFilterBar] = useState(false);
  const [fields, setFields] = useState([]);

  return (
    <div className="newsfeed">
      <FieldSlider showFilterBar={showFilterBar} fields={fields} setShowFilterBar={setShowFilterBar}/>

      <ShowcasingArtworks showcasingArtworks={showcasingArtworks} />
    </div>
  );
}
