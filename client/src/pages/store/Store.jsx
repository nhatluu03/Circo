import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Store.scss";
import SellingArtwork from "../../components/sellingArtwork/SellingArtwork.jsx";
import UploadSellingArtwork from "../../components/uploadSellingArtwork/UploadSellingArtwork.jsx";
import { UserContext } from "../../contexts/user.context.jsx";
import { useQuery, useMutation, useQueryClient } from "react-query";

export default function Store() {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const fetchStoreItems = async () => {
    console.log("Getting all store items");
    try {
      const response = await axios.get(
        `http://localhost:3000/artworks/talent/${id}?forSelling=true`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadSellingArtwork = async (files, inputs) => {
    try {
      // Step 2: Post image to url2
      const uploadFiles = async () => {
        let imagePaths = [];
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          try {
            const res1 = await axios.post(
              "http://localhost:3000/artworks/upload",
              formData,
              {
                withCredentials: true,
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            imagePaths.push(res1.data.url);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
        return imagePaths;
      };

      const uploadFilesAndCreateArtwork = async () => {
        try {
          let imagePaths = await uploadFiles();

          inputs.images = imagePaths;
          inputs.forSelling = true;

          const res2 = await axios.post(
            "http://localhost:3000/artworks/",
            inputs,
            {
              withCredentials: true,
            }
          );

          console.log("Artwork Data:", res2.data);
          return res2.data;
        } catch (error) {
          console.error("Error:", error);
          // Handle the error as needed
        }
      };

      // Await the result of uploadFilesAndCreateArtwork
      const output = await uploadFilesAndCreateArtwork();
      console.log("Output", output);
      return output;
    } catch (error) {
      console.log(error);
    }
  };

  const queryClient = useQueryClient();

  const { data: storeItems } = useQuery({
    queryKey: ["storeItems"],
    queryFn: fetchStoreItems,
  });

  const mutation = useMutation({
    mutationFn: handleUploadSellingArtwork,
    onSuccess: async () => {
      // Invalidate and refetch
      alert("Handle submit in parent component");
      await queryClient.invalidateQueries({ queryKey: ["storeItems"] });
    },
  });

  const [showUploadSellingArtworkForm, setShowUploadSellingArtworkForm] = useState(false);

  return (
    <div className="store">
      <h3 className="profile-page__header">
        Store
        {user?._id == id && (
          <button
            className="btn btn-1 add-btn"
            onClick={() => {
              setShowUploadSellingArtworkForm(true);
            }}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </h3>
      <div className="selling-artwork-container">
        {storeItems?.length > 0 ? (
          storeItems.map((storeItem) => (
            <SellingArtwork
              key={storeItem._id}
              sellingArtwork={storeItem}
              isOwner={true}
            />
          ))
        ) : (
          <p>The talent has not uploaded any artworks for sell yet.</p>
        )}
      </div>

      {/* Modal forms */}
      {showUploadSellingArtworkForm && (
        <UploadSellingArtwork
          setShowUploadSellingArtworkForm={setShowUploadSellingArtworkForm}
          handleUploadSellingArtwork={handleUploadSellingArtwork}
          mutation={mutation}
        />
      )}
    </div>
  );
}
