import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Store.scss"
import SellingArtwork from "../../components/sellingArtwork/SellingArtwork.jsx";
import UploadSellingArtwork from "../../components/uploadSellingArtwork/UploadSellingArtwork.jsx";

export default function Store() {
  const { id } = useParams();
  const [storeItems, setStoreItems] = useState([
    // {
    //   _id: 1,
    //   title: "[Free Ship] Cloudy Night Sky A5",
    //   price: 16.2,
    //   sold: 1200,
    //   fields: [
    //     {
    //       title: "Watercolor",
    //     },
    //     { title: "Illustration" },
    //   ],
    //   images: [
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //   ],
    // },
    // {
    //   _id: 1,
    //   title: "[Free Ship] Cloudy Night Sky A5",
    //   price: 16.2,
    //   sold: 1200,
    //   fields: [
    //     {
    //       title: "Watercolor",
    //     },
    //     { title: "Illustration" },
    //   ],
    //   images: [
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //   ],
    // },
    // {
    //   _id: 1,
    //   title: "[Free Ship] Cloudy Night Sky A5",
    //   price: 16.2,
    //   sold: 1200,
    //   fields: [
    //     {
    //       title: "Watercolor",
    //     },
    //     { title: "Illustration" },
    //   ],
    //   images: [
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //     "https://i.pinimg.com/564x/23/0a/7b/230a7b43c26d880af7a4b6b288056fea.jpg",
    //   ],
    // },
  ]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/artworks/talent/${id}?forSelling=true`);
        console.log(response.data);
        setStoreItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStoreItems();
  }, []);

  const [showUploadSellingArtworkForm, setShowUploadSellingArtworkForm] =
    useState(false);

  return (
    <div className="store">
      <h3 className="profile-page__header">
        Store
        <button
          className="btn btn-1 add-btn"
          onClick={() => {
            setShowUploadSellingArtworkForm(true);
          }}
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </h3>
      <div className="selling-artwork-container">
        {storeItems.length > 0 ? storeItems.map((storeItem) => (
          <SellingArtwork sellingArtwork={storeItem} />
        )) : (<p>The talent has not uploaded any artworks for sell yet.</p>)}
      </div>

      {/* Modal forms */}
      {showUploadSellingArtworkForm && <UploadSellingArtwork setShowUploadSellingArtworkForm={setShowUploadSellingArtworkForm}/>}
    </div>
  );
}
