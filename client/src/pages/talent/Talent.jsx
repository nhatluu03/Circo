import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Talent.scss";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Artpieces from "../../pages/artpieces/Artpieces.jsx";
import axios from "axios";

export default function Talent() {
  const { id } = useParams();
  const [talent, setTalent] = useState(null);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users/" + id);
        console.log(response.data);
        setTalent(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTalent();
  }, []);

  return (
    <>
      <Artpieces talentId={talent?._id} />
    </>
  );
}