import React, { useContext } from 'react';
import "./Sidebar.scss";
import { SharedDataContext } from '../../SharedDataContext.jsx'; // Adjust the path accordingly

export default function Sidebar() {
  const { sharedData } = useContext(SharedDataContext);

  return (
    <div className="sidebar">
      {!sharedData && ("abc")}
      <div className="profile-basics">
        <img
          src="https://via.placeholder.com/150"
          className="profile-basics__avt"
          alt="Avatar"
        />
        <h3 className="profile-basics__fullname">Luu Quoc Nhat</h3>
        <p className="profile-basics__username">@nhatluu03</p>
        <p className="profile-basics__job">Watercolor artist</p>
        <p className="profile-basics__loc">Ho Chi Minh City, Vietnam</p>
      </div>

      <div className="profile-buttons">
        <button className="btn btn-1">
          <img
            className="btn-ic"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUFJREFUSEvN1U0rRVEUxvHfLQMTpSgpBmYmiqkMDMRnUDJQUgx8E0YkMpLyGZTEhIy8jUwU5aVkpCQDOrd96tzTyb37XifucN+11389a+31nIqSf5WS8ysCtGMByxhosIBbrGALH9k7eUA/9jHYYOJ82DUm8Zj+kQW04QwjeAgqTvFSB9aNUWyiB0cYLwIsYg3PGMZTpIo+XKET09hL7mcVXGIIM9iNTJ6GzwclB5jIA96RDLi3iepTQDLDO7yiKw/4ClGtPt2aPNlkfwZIBp88gHUsBZVFZ2mbohWkF7ItLTprGlC6gtgXG92ifwVItvkeb+goYw/msI2T4E81VtHqHiTVn4cNnsXObylI3HQMG8FNj4ObVgsu2uTYoWbjLzAVHLl6ngUcZn08knKD1dD/z5++aJF564e36px1CaUDvgHWfUYZ0CP4jAAAAABJRU5ErkJggg=="
          />{" "}
          Chat
        </button>
        <button className="btn btn-2">
          <img
            className="btn-ic"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABBJJREFUaEPtmk2oVVUUx3//EvoCEVP7UjDNSdEgcCIVGQkJWkgpogQNIpJKKWhg9GXaoEnkB6lBkyhM1ES0iVFpWSREFESO7AMyvyhoooioS1bsB5ftPu+ec8/Z9717392TN3jr7LV/+7/vWuusfcQYGxpjvAyA+13xgcIDhftsB5JH2szWFHD+Dfwg6ede3YciYGsDdBh4RNI/vQbeKbBz/ihp9lgCdtbnJG3uJeg6CjvnUUmz+gE4FbSuAVYn4OZJ+rJXoCsVHmZ2EHgggtst6fF+BV4C7IjgLgG3STrZC9BVFR4H/AXcHMGtkfRm3wE7UChK3ojgXF1X2dUe1aOSwgH4FuB4guoDwCuxkR7ngUOSDqUWUhk4QO8EFo80WRv/L0l6J7bpFHgucGCUA/8raVIjwEHlo8DMUQx9TNK0JoGfBzaNYuDtkpY1CTwe8Oh8XTSpB4uvurgRtwJPJ/w9LOnzxoDDsd4CrIgmPSLprm4Bm9mrwLrIn2eRqZKueM3tKGgNTW5mdwK/JuDmSvq6G9Bm9jtwe+TrbUkvN5aWWicys2+A+6PJd0hamhvYzO7znJvwM0PSH7mAHWx7NPkFYFru+trMvNh5KvJ9WNKcos2udaTD73hE6mszuxbwFtMNEdwKSe9nAw7Qa4HXIidZ62szewL4KPJ5Dpgk6UxuYH978jr6qsjREkm7cvyWzewL4KFo7mTubbWpfaRbIvanwGPRAg5KerBpYDPz3HsMrrgbmy9p/3D+mgT23fZdj8cdkn5rErpq7s2icPgtp+rr9yR5GdrYqJp7cwKvAjZEZGeByZL8b+3RSe7NCez19Qng+ojsWUlehtYeneTebMDhWG8FnonIGqmvO829uYGz1ded5t6swEFlr2+9zm0dfgE3bMoocd497d0d2X0iaXmJZ/83aSwttTo0M3/x3lZ2ETXt2ubebijs9bWXljfWhGn3eOF7b9GDWRQOx/ot4JV2K675/8L33pEAngD84p2HmlBFj3tenyUp1SMvdJlN4aCydzUXABMbhvYbjl2SjlSdNytw1cV0w34A3PQum9m7gOdJvwX4HvBA81kVP2a2MFzGe+vGuxzbJL1YZY4h26wKm9le/9onsTD/AqgUdIDdl5hjn6RHq0JnAx5mob7G7yTFlVhy7Wb2LXBvAVjpjcuusJl5j8t7XalxSdLVZdQxs4uJ1tHQo69Lipvww06bU+GVwMYC76cl3VQS+BQwpcB2laRK91s5gf3m7s8CddaXDToh6L2QAPZcPF2Sf4JRemQDDoWHt1I/jKArB5tE8HPYJyV9XJo0GGYFDtCu9CLAS82fykbnGCQEwXuA/4A9VZXNHrSq7ny37LMr3C2Qsn4GwGV3qlftBgr3qnJl1z3mFL4Mi21kTAMj1SMAAAAASUVORK5CYII="
          />
          Order commission
        </button>
      </div>

      <div className="profile-stats">
        <div className="profile-stats-followers">
          <div className="profile-stats-followers__img-container">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
          </div>
          <p>1.4K followers</p>
        </div>
        <span className="dot-delimiter">&#8226;</span>
        <div className="profile-stats-following">
          <p>116 following</p>
        </div>
      </div>

      <div className="profile-section bio">
        <h4 className="profile-section__title">Bio</h4>
        <hr />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="profile-section socials">
        <h4 className="profile-section__title socials">Socials</h4>
        <hr />
        <p>Facebook</p>
        <p>Instagram</p>
        <p>Email</p>
      </div>

      <div className="profile-section socials">
        <h4 className="profile-section__title socials">Achievements</h4>
        <hr />
        <ul>
          <li>
            <p>Feb 2023</p>
            <p>Top contributor of the month</p>
          </li>
          <li>
            <p>Feb 2023</p>
            <p>Top contributor of the month</p>
          </li>
          <li>
            <p>Feb 2023</p>
            <p>Top contributor of the month</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
