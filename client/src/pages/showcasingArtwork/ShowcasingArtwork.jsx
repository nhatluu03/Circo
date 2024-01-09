import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCollection from "../../components/addCollection/AddCollection.jsx";
import "./ShowcasingArtwork.scss";
import axios from "axios";
import { makeRequest } from "../../axios.js";
// C:\Users\A\Circo\client\src\axios.js
import { useMutation, useQueryClient, useQuery } from "react-query";

export default function ShowcasingArtwork({setShowUploadArtworkForm}) {
  const { id } = useParams();
  const [artpieces, setArtpieces] = useState([]);
  const queryClient = useQueryClient();

  const fetchArtpieces = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/artworks/talent/${id}?forSelling=false`,
        { withCredentials: true }
      );
      console.log("abc");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate } = useMutation(fetchArtpieces, {
    onSuccess: (uploadedItem) => {
      queryClient.invalidateQueries(["artworks"]);
      setArtpieces((prevArtpieces) => [...prevArtpieces, uploadedItem]);
      console.log(artpieces);
    },
  });

  const handleUpload = () => {
    const newItem = {
      _id: "new",
      talent: "new",
      images: ["new.jpg"],
      likes: 0,
      saves: 0,
      forSelling: false,
      createdAt: "2024-01-06T13:01:56.756Z",
      updatedAt: "2024-01-06T13:01:56.756Z",
      __v: 0,
    };
    mutate();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchArtpieces();
      setArtpieces(data || []); // Set the state with the fetched data, or an empty array if data is falsy
    };
    fetchData(); // Call the fetchData function
  }, [id]);

  // Toggle display add-collection-form
  const [showAddCollectionForm, setShowAddCollectionForm] = useState(false);

  return (
    <div className="artpieces">
      <button onClick={handleUpload}>Click me to mutate</button>
      <div className="collection-container">
        <button className="collection-item">
          <img
            className="collection-item__bg"
            src="https://i.pinimg.com/564x/96/35/a8/9635a8b7806d24033d055e40d9f01cb6.jpg"
            alt="Collection background"
          />
          <span className="collection-item__title">All</span>
        </button>
        <button className="collection-item">
          <img
            className="collection-item__bg"
            src="https://i.pinimg.com/564x/64/e7/99/64e7993a296a9d9efac3d140fc141267.jpg"
            alt="Collection background"
          />
          <span className="collection-item__title">Illustration</span>
        </button>
        <button className="collection-item">
          <img
            className="collection-item__bg"
            src="https://i.pinimg.com/564x/fa/3d/6f/fa3d6fcf09ca718b30bf40b70dc3f706.jpg"
            alt="Collection background"
          />
          <span className="collection-item__title">Handmade</span>
        </button>
        <button className="collection-item">
          <img
            className="collection-item__bg"
            src="https://picsum.photos/200"
            alt="Collection background"
          />
          <span className="collection-item__title">Posters</span>
        </button>
        <button
          className="collection-item"
          onClick={() => {
            setShowAddCollectionForm(true);
          }}
        >
          <i className="fa-solid fa-plus"></i>
          <span className="collection-item__title">Add collection</span>
        </button>
      </div>

      <div className="artpiece-container">
        {artpieces?.length === 0 ? (
          <p>The talent has not uploaded any artpieces</p>
        ) : (
          artpieces?.map((artpiece, index) => (
            <div className="artpiece-item" key={index}>
              {artpiece.images && artpiece.images.length > 0 && (
                <img
                  src={`../../public/uploads/artworks/${artpiece.images[0]}`}
                  alt=""
                />
              )}
              <p>{artpiece.talent}</p>
            </div>
          ))
        )}
      </div>

      {/* Modal forms */}
      {showAddCollectionForm && (
        <AddCollection
          setShowAddCollectionForm={setShowAddCollectionForm}
          artpieces={artpieces}
        />
      )}
    </div>
  );
}
