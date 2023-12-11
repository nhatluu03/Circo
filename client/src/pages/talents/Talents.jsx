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
      artworks: [
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 1,
      username: "nhat_luu",
      fullName: "Luu Quoc Nhat",
      followers: 1700,
      commissions: 115,
      rating: 4.5,
      artworks: [
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 1,
      username: "nhat_luu",
      fullName: "Luu Quoc Nhat",
      followers: 1700,
      commissions: 115,
      rating: 4.5,
      artworks: [
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 1,
      username: "nhat_luu",
      fullName: "Luu Quoc Nhat",
      followers: 1700,
      commissions: 115,
      rating: 4.5,
      artworks: [
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 1,
      username: "nhat_luu",
      fullName: "Luu Quoc Nhat",
      followers: 1700,
      commissions: 115,
      rating: 4.5,
      artworks: [
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 1,
      username: "nhat_luu",
      fullName: "Luu Quoc Nhat",
      followers: 1700,
      commissions: 115,
      rating: 4.5,
      artworks: [
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
      ],
    },
    {
      id: 1,
      username: "nhat_luu",
      fullName: "Luu Quoc Nhat",
      followers: 1700,
      commissions: 115,
      rating: 4.5,
      artworks: [
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
        },
        {
          id: 1,
          url: "https://via.placeholder.com/150",
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
          <Link
            to={"/talents/" + talent.id}
            key={talent.id}
            className="talent-item"
          >
            <div className="talent-item-details">
              <div className="talent-item-details__bg">
                <img src="https://images.unsplash.com/photo-1699694927472-46a4fcf68973?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <img src="https://images.unsplash.com/photo-1699694927472-46a4fcf68973?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <img src="https://images.unsplash.com/photo-1699694927472-46a4fcf68973?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </div>
              <div className="talent-item-details__basics">
                <img
                  src="https://images.unsplash.com/photo-1699694927472-46a4fcf68973?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Avatar of "
                  className="talent-item-details__basics__avt"
                />

                <div className="talent-item-details__basics__name">
                  <h3 className="talent-item-details__basics__fullname">
                    {talent.fullName}
                  </h3>
                  <p className="talent-item-details__basics__username">
                    @{talent.username}
                  </p>
                </div>
              </div>

              <p>
                {talent.followers} followers
                <span className="dot-delimiter">&#8226;</span>
                {talent.commissions} commissions
                <span className="dot-delimiter">&#8226;</span>
                <div className="rating">
                  {talent.rating}{" "}
                  <img
                    className="star-ic"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABZNJREFUaEPtmluME1UYx//faeWiXKSdLqTTKIhEiCZ4lwi6hGCIvGiMGKMPq76oeCFqjBFod3a6K2qCMRI10QfUhBA1PnhJDLyIBG8xq8aEoJEILJ3ibqfdiERu7fnMLCzZXbs7c844tQvMy6Qz3+X/m68z58w3h3CObXSO8eI88Nle8fMVjrrCpVzGIvCTACQYrxp5pzPqnEPjN7TCpWymlYh3DBUgSN6S6Di0q1HQDQV2c+Z2ALcNg2PabuQLK8464NL69BUk6Jd6YCx5fqqz+GsjoBtWYTdnvgOgbRSozYbtPHTWAP9hzWyJy7gDID4KVLUqquYsq7cvauiGVNjNmS8AeN4HpsuwnfXjHvjgU5nJk6eyV90ZPjD9SXHxLLJ2n4gSOvIKu9n04yDaFBBitWE7bwa01TKLFJgtCFdm9hJ4ThB1DNpn2IW5BHAQex2bSIHd9sxdYP5IRRgLviNlFT9R8VGxjRY4Z34F4GY1QbwzaRdbVXxUbCMDdq3MjZD8nYqYQVtBtDDRUfhZx9fPJzrgnPkBgFV+AuqdJ9DWpF24T8fXzycSYHddxkSMewAIPwGjTURQo9lGV8Ebzv7TTQm4z0pNiXM8USWREECCgISs0cCeCAk5cEwmAFoAYH5IpXvA2MNE/QKoMKPCQEXEeGAvgUqcZaVK1UqLVToSNFdd4IHJwhT5BEC3gzATQAIY2Dfz1gugAkYvEz5L2c7G+rdLnaOldnMjMZ5uZjo/bQzkU7aTG2lXt8JuzjwKYJJf0CY/32PYzqVBgfcD+JdxkwOOlLfXsJ15gYDL7eYiZtoG8LRxBnlGLglenLSKXwcC9oxOdSiwA6BZ4wz6KAtambIKw3pngwxjDkvldjPD7EFj7jiBPkKCV9SrbCBgz+hPK5M4KeU2gK5vbmg6DKblRv7g92PpDDTx2GfNnjS1dvJTEJY3KXS/FFjWYjk/+ekLBOwF4VWIlReYW3Xnx35CdM8z4AqOLU3me3YHiREYeDBYOZd5mcHPBgketY0HC8lLVFq8ysAehJszHwXwRtRAPvF7WXKrCqwXTwvYcyznzFUMeH/x2P8A7tRE7NaZVs/vqrm1gQcqbaWXQ9LHAC5UTRzC/kCsJltndB06oBMjFLCXsC+bvkYQea2cyToCFH0OoUY3hHlPDg1cee6y6XLi8f4wt4cCdN0XAgV//Xv4zFM7a97DhPdVkoaxZRJmquNgUTdG6Aq77eZmMB7QFaDqR+B7k3ZR+wKHB86Z3gewlKpwbXvi14yO4hpd/1DApx9YP+gm1/OjbsMuaM/rQwG7OXMdgIau0fDWhvwlLrhojrX/mM4FCwVcypm7CFiskziMDwPLUrbzhU4MbeAGD0fD2RhZ3dU/2sDlBg9HQ4kZ+DxlOysbWuEwwxEBA++tDFytIxqgw4ZdmK7jq11hV284OkFAZ0I4GzyxlVp6LRN5D74JquKJY1cFfQceGlsLuGSlryVJ3WoiqZtYtI0UWc5ecqWk2hYCFqrEY6aHU/nCWyo+nq0WsOJwdBxAR1I4L5EFWU8gW4iXpek1FdoBTAwI8a5hO8ozPF3ggB+6qZulvD/oS/qp1rDYAvB1AaDrNtr9/JSBAw5Hx5g5a8SKr4xW1dGEnVoXkn6GQLbf554JJ2FM2+CU/SBD3cNly7ybJT4cI8k3UlJbS2fhNxUhI2371mfmCcHvAVg0ehy+07CLXgMi8KZcYTebXg2i1+tk+JtAaxOisEm1qmNVuyLNNQx01W0wMD9m5ItKvTUN4MxNIP52+N+Ed1ZF/EGdHlOQ0vRZmctJ8mYClgybgDAtTeULXwaJMWijDOw5lrLmI0TwFpD9CODtqBeTDYo93S1d7f1m0Ispu7BFBVZ7WFJN0kz2WhVuJgBVLeeBVa/YeLM/5yr8D2d52kwr7SkkAAAAAElFTkSuQmCC"
                  />
                </div>
              </p>
              <div className="talent-item-button-container">
                <button className="follow-btn btn btn-1">
                  <img
                    className="btn-ic"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAA+ZJREFUaEPtmkmoT1Ecxz+vLMhGkjIUFhIWZIooUqQMZYMSJRsypogoYykUolAWiAUbmbJAkUyZQ+ZQhmwQJUnoy3263e5wzrnn3Pfy7m/z6v3Pb/ie3++c33BuAy2MGloYXmrA/7vHaw8H9nB/YAMwNNJzBVgF3A2s95/4Kj28CViaAWwNsLYK0FUBHgecLgA0DLgaGnRowO2BmcBioFsBmBfAduAA8DEU8FCAewEK02mOhh+K+J858mey+QbcDtgJTPdk6H5gIfDZkzyvhUdf4JRB6Nra/hwYDzy2ZUxb78vDw4GzQOsCoy4Dr4C30bouQPdYmspi/wKMBG6XBe0DcA/gFqBwTiOdw43A0ZzLqAMwGVgBSF4avQEGA+/KgC4LuA1wE+idYsTX6OLZbGmgCpH1GTzXDKIhV11ZwLqg5qVoUNjq3D2wBNu4XJ48CXRM4V8HrHaUW+rSGg2cS1H8EBgBfHA1Kna+VYh0TZEzwPU8l/HwdWBQwpj3wEBA580H6ahIT9uEsBPAJBcFroB1Y55PUTgVOOJiSA7PImBb4vdf0b1hnapcAR9MKS7U8agbCkGKmM4JwVtympFMG1wBK492SkidAWgjQtDyKLXFZSvUh9gqcwHcE3iSUPQdUC5VgRCCVJyouYjTz+hsf7NR6AJ4CnA4oeQMMNZGscPaR4CakjgpG1yykeUCeA6wK6FkHzDLRrHD2uPAxASfurHk5ueKdgGcdp5UTS1zAGHDoptaN3aclgBbbYS4AFafm6x0NJ7R/0OSF701YAMXedlpAz3JJV701h422HkvO22gp/awj8uyDmmDUKtDOnom+S/zsF4PLqSMYpuq8NAoSb25/hqRzRkWWBXqGq0maS6w20ij+6K0Gl7S1CtrTGwE2hSw2rOLGfMlKVLj/8kdixGnxsD3Mmx4Hc3RCkGbAM7zrNXuGsHKX1TaliLA2tU7Gc8nmnoolF56AGIjQtGmo5Uc+UiGhgT98gYRRYA1c9bsOUlVezapP8/TOut7snawCHBazm1qsI1YskDnZgwXwFWkINMQty6CXAArD6fNpE2N9LluVJSH4zK9e9inwSFk1YDju1oU0vOBHSHcEFDmgozM8kdlEWDlvKdAq4AG+hT9A9BDQWZtUARYxuj6H5NR0vk0tqwslZd6EMgtL00AlzWkWfHXgD27Q99/6LXehvSlji2PsfzQHtYr/TFja/4unBB972XJZrY8NGBZoYc3FfQmpCGChgnBqArAMn4vMLsAhToc041x3pCqAMtAfYq0EugT62XVed2PXvdvOKOwYKwSsIVZ4ZbWgMPtbfOQXHu4efghnBW/AUeavj0VD6FUAAAAAElFTkSuQmCC"
                  />
                  Follow
                </button>
                <button className="order-btn btn btn-2">
                  <img
                    className="btn-ic"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABBJJREFUaEPtmk2oVVUUx3//EvoCEVP7UjDNSdEgcCIVGQkJWkgpogQNIpJKKWhg9GXaoEnkB6lBkyhM1ES0iVFpWSREFESO7AMyvyhoooioS1bsB5ftPu+ec8/Z9717392TN3jr7LV/+7/vWuusfcQYGxpjvAyA+13xgcIDhftsB5JH2szWFHD+Dfwg6ede3YciYGsDdBh4RNI/vQbeKbBz/ihp9lgCdtbnJG3uJeg6CjvnUUmz+gE4FbSuAVYn4OZJ+rJXoCsVHmZ2EHgggtst6fF+BV4C7IjgLgG3STrZC9BVFR4H/AXcHMGtkfRm3wE7UChK3ojgXF1X2dUe1aOSwgH4FuB4guoDwCuxkR7ngUOSDqUWUhk4QO8EFo80WRv/L0l6J7bpFHgucGCUA/8raVIjwEHlo8DMUQx9TNK0JoGfBzaNYuDtkpY1CTwe8Oh8XTSpB4uvurgRtwJPJ/w9LOnzxoDDsd4CrIgmPSLprm4Bm9mrwLrIn2eRqZKueM3tKGgNTW5mdwK/JuDmSvq6G9Bm9jtwe+TrbUkvN5aWWicys2+A+6PJd0hamhvYzO7znJvwM0PSH7mAHWx7NPkFYFru+trMvNh5KvJ9WNKcos2udaTD73hE6mszuxbwFtMNEdwKSe9nAw7Qa4HXIidZ62szewL4KPJ5Dpgk6UxuYH978jr6qsjREkm7cvyWzewL4KFo7mTubbWpfaRbIvanwGPRAg5KerBpYDPz3HsMrrgbmy9p/3D+mgT23fZdj8cdkn5rErpq7s2icPgtp+rr9yR5GdrYqJp7cwKvAjZEZGeByZL8b+3RSe7NCez19Qng+ojsWUlehtYeneTebMDhWG8FnonIGqmvO829uYGz1ded5t6swEFlr2+9zm0dfgE3bMoocd497d0d2X0iaXmJZ/83aSwttTo0M3/x3lZ2ETXt2ubebijs9bWXljfWhGn3eOF7b9GDWRQOx/ot4JV2K675/8L33pEAngD84p2HmlBFj3tenyUp1SMvdJlN4aCydzUXABMbhvYbjl2SjlSdNytw1cV0w34A3PQum9m7gOdJvwX4HvBA81kVP2a2MFzGe+vGuxzbJL1YZY4h26wKm9le/9onsTD/AqgUdIDdl5hjn6RHq0JnAx5mob7G7yTFlVhy7Wb2LXBvAVjpjcuusJl5j8t7XalxSdLVZdQxs4uJ1tHQo69Lipvww06bU+GVwMYC76cl3VQS+BQwpcB2laRK91s5gf3m7s8CddaXDToh6L2QAPZcPF2Sf4JRemQDDoWHt1I/jKArB5tE8HPYJyV9XJo0GGYFDtCu9CLAS82fykbnGCQEwXuA/4A9VZXNHrSq7ny37LMr3C2Qsn4GwGV3qlftBgr3qnJl1z3mFL4Mi21kTAMj1SMAAAAASUVORK5CYII="
                  />
                  Order{" "}
                </button>
              </div>
            </div>

            <div className="talent-collection-container">
              <Link className="talent-collection-item"></Link>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
