import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Talents.scss";

export default function Talents() {
  const [talents, setTalents] = useState([
    {
      id: 1,
      username: "nhat_luu",
      fullName: "Luu Quoc Nhat",
      followers: 1700,
      commissions: 115,
      rating: 4.5,
      collections: [
        {
          id: 1,
          title: "Collection 1",
          images: [
            {
              id: 1,
              url: "https://via.placeholder.com/150",
            },
            {
              id: 2,
              url: "https://via.placeholder.com/150",
            },
            {
              id: 3,
              url: "https://via.placeholder.com/150",
            },
          ],
        },
        {
          id: 2,
          title: "Collection 2",
          images: [
            {
              id: 1,
              url: "https://via.placeholder.com/150",
            },
            {
              id: 2,
              url: "https://via.placeholder.com/150",
            },
            {
              id: 3,
              url: "https://via.placeholder.com/150",
            },
          ],
        },
        {
          id: 3,
          title: "Collection 3",
          images: [
            {
              id: 1,
              url: "https://via.placeholder.com/150",
            },
            {
              id: 2,
              url: "https://via.placeholder.com/150",
            },
            {
              id: 3,
              url: "https://via.placeholder.com/150",
            },
          ],
        },
      ],
    },
  ]);

  // Fetch talents info along with their collections

  // useEffect(() => {
  //   const fetchTalents = async () => {
  //     try {
  //       const response = await axios.get("localhost:3000/talents");
  //       const data = await response.json();
  //       console.log(data);
  //       setTalents(data);
  //     } catch(error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchTalents();
  // }, []);

  return (
    <div className="talent-container">
      {talents.map((talent) => {
        return (
          <div className="talent-item">
            <div className="talent-item-details">
              <img
                src="https://media.istockphoto.com/id/1419410282/photo/silent-forest-in-spring-with-beautiful-bright-sun-rays.webp?b=1&s=170667a&w=0&k=20&c=0eyjD9xiGItjC1Yklk_q3Ry1Jr0zWAUJ6q8kDmBuyvk="
                alt="Background image of "
                className="talent-item-details__bg"
              />

              <div className="talent-item-details__basics">
                <img
                  src="https://images.unsplash.com/photo-1699694927472-46a4fcf68973?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Avatar of "
                  className="talent-item-details__basics__avt"
                />
                <h3 className="talent-item-details__basics__fullname">{talent.fullName}</h3>
                <p className="talent-item-details__basics__username">{talent.username}</p>
              </div>
              
              <p>
                {talent.followers} followers &#8226; {talent.commissions} commissions {talent.rating} <img className="star-ic" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABZNJREFUaEPtmluME1UYx//faeWiXKSdLqTTKIhEiCZ4lwi6hGCIvGiMGKMPq76oeCFqjBFod3a6K2qCMRI10QfUhBA1PnhJDLyIBG8xq8aEoJEILJ3ibqfdiERu7fnMLCzZXbs7c844tQvMy6Qz3+X/m68z58w3h3CObXSO8eI88Nle8fMVjrrCpVzGIvCTACQYrxp5pzPqnEPjN7TCpWymlYh3DBUgSN6S6Di0q1HQDQV2c+Z2ALcNg2PabuQLK8464NL69BUk6Jd6YCx5fqqz+GsjoBtWYTdnvgOgbRSozYbtPHTWAP9hzWyJy7gDID4KVLUqquYsq7cvauiGVNjNmS8AeN4HpsuwnfXjHvjgU5nJk6eyV90ZPjD9SXHxLLJ2n4gSOvIKu9n04yDaFBBitWE7bwa01TKLFJgtCFdm9hJ4ThB1DNpn2IW5BHAQex2bSIHd9sxdYP5IRRgLviNlFT9R8VGxjRY4Z34F4GY1QbwzaRdbVXxUbCMDdq3MjZD8nYqYQVtBtDDRUfhZx9fPJzrgnPkBgFV+AuqdJ9DWpF24T8fXzycSYHddxkSMewAIPwGjTURQo9lGV8Ebzv7TTQm4z0pNiXM8USWREECCgISs0cCeCAk5cEwmAFoAYH5IpXvA2MNE/QKoMKPCQEXEeGAvgUqcZaVK1UqLVToSNFdd4IHJwhT5BEC3gzATQAIY2Dfz1gugAkYvEz5L2c7G+rdLnaOldnMjMZ5uZjo/bQzkU7aTG2lXt8JuzjwKYJJf0CY/32PYzqVBgfcD+JdxkwOOlLfXsJ15gYDL7eYiZtoG8LRxBnlGLglenLSKXwcC9oxOdSiwA6BZ4wz6KAtambIKw3pngwxjDkvldjPD7EFj7jiBPkKCV9SrbCBgz+hPK5M4KeU2gK5vbmg6DKblRv7g92PpDDTx2GfNnjS1dvJTEJY3KXS/FFjWYjk/+ekLBOwF4VWIlReYW3Xnx35CdM8z4AqOLU3me3YHiREYeDBYOZd5mcHPBgketY0HC8lLVFq8ysAehJszHwXwRtRAPvF7WXKrCqwXTwvYcyznzFUMeH/x2P8A7tRE7NaZVs/vqrm1gQcqbaWXQ9LHAC5UTRzC/kCsJltndB06oBMjFLCXsC+bvkYQea2cyToCFH0OoUY3hHlPDg1cee6y6XLi8f4wt4cCdN0XAgV//Xv4zFM7a97DhPdVkoaxZRJmquNgUTdG6Aq77eZmMB7QFaDqR+B7k3ZR+wKHB86Z3gewlKpwbXvi14yO4hpd/1DApx9YP+gm1/OjbsMuaM/rQwG7OXMdgIau0fDWhvwlLrhojrX/mM4FCwVcypm7CFiskziMDwPLUrbzhU4MbeAGD0fD2RhZ3dU/2sDlBg9HQ4kZ+DxlOysbWuEwwxEBA++tDFytIxqgw4ZdmK7jq11hV284OkFAZ0I4GzyxlVp6LRN5D74JquKJY1cFfQceGlsLuGSlryVJ3WoiqZtYtI0UWc5ecqWk2hYCFqrEY6aHU/nCWyo+nq0WsOJwdBxAR1I4L5EFWU8gW4iXpek1FdoBTAwI8a5hO8ozPF3ggB+6qZulvD/oS/qp1rDYAvB1AaDrNtr9/JSBAw5Hx5g5a8SKr4xW1dGEnVoXkn6GQLbf554JJ2FM2+CU/SBD3cNly7ybJT4cI8k3UlJbS2fhNxUhI2371mfmCcHvAVg0ehy+07CLXgMi8KZcYTebXg2i1+tk+JtAaxOisEm1qmNVuyLNNQx01W0wMD9m5ItKvTUN4MxNIP52+N+Ed1ZF/EGdHlOQ0vRZmctJ8mYClgybgDAtTeULXwaJMWijDOw5lrLmI0TwFpD9CODtqBeTDYo93S1d7f1m0Ispu7BFBVZ7WFJN0kz2WhVuJgBVLeeBVa/YeLM/5yr8D2d52kwr7SkkAAAAAElFTkSuQmCC"/>
              </p>
              <button className="order-commission-btn">Order commission</button>
            </div>

            <div className="talent-collection-container">
              <Link className="talent-collection-item">

              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
