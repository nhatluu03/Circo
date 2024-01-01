import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddCollection from "../../components/addCollection/AddCollection";
import "./Artpieces.scss";
import axios from "axios";

export default function Artpieces() {
  const { id } = useParams();
  // if (!talentId) {
  //   return null;
  // }
  const [artpieces, setArtpieces] = useState([]);

  useEffect(() => {
    const fetchArtpieces = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/artworks/talent/" + id
        );
        console.log(response.data);
        setArtpieces(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArtpieces();
  }, []);

  // Toggle display add-collection-form
  const [showAddCollectionForm, setShowAddCollectionForm] = useState(false);

  return (
    <div className="artpieces">
      <div className="collection-container">
        <button className="collection-item">
          <img
            className="collection-item__bg"
            src="https://picsum.photos/200"
            alt="Collection background"
          />
          <span className="collection-item__title">All</span>
        </button>
        <button className="collection-item">
          <img
            className="collection-item__bg"
            src="https://picsum.photos/200"
            alt="Collection background"
          />
          <span className="collection-item__title">Illustration</span>
        </button>
        <button className="collection-item">
          <img
            className="collection-item__bg"
            src="https://picsum.photos/200"
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
        {artpieces.map((artpiece, index) => {
          return (
            <div className="artpiece-item" key={index}>
              {/* <img src={`../../public/uploads/artworks/${artpiece.images[0]}`} alt="" /> */}
              <img src={`${artpiece.images[0]}`} alt="" />
            </div>
          );
        })}

        {/* <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/736x/51/fa/9e/51fa9e365265c97b6433b2033451297b.jpg" alt="" />
            </div>
            <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/564x/f5/3c/37/f53c379e64d62ea962b9c7a2f198ac6d.jpg"/>
            </div>
            <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/564x/c6/b3/a6/c6b3a697b075b8abb639dd3b51c81551.jpg" alt=""/>
            </div>
            <div className="artpiece-item"> 
                <img src="https://i.pinimg.com/736x/51/fa/9e/51fa9e365265c97b6433b2033451297b.jpg" alt="" />
            </div> */}
      </div>

      {/* Modal forms */}
      {showAddCollectionForm && (
        <AddCollection setShowAddCollectionForm={setShowAddCollectionForm} />
      )}
    </div>
  );
}
