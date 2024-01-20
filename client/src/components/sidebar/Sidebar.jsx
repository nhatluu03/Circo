import { useState, useContext, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import EditTalentInfo from "../../components/crudTalentProfile/editTalentInfo/EditTalentInfo.jsx";
import "./Sidebar.scss";
import axios from "axios";
import { UserContext } from "../../contexts/user.context.jsx";

export default function Sidebar({
  talent,
  handleSubmitTalentInfo,
  fetchTalent,
  talentInfoMutation,
  showCreatedConversation
}) {
  const { user, login, logout } = useContext(UserContext);
  if (!talent) {
    // talent = {
    //   fullname: "Luu Quoc Nhat",
    //   username: "nhat_luu",
    //   title: "Freelance artist",
    //   avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUFJREFUSEvN1U0rRVEUxvHfLQMTpSgpBmYmiqkMDMRnUDJQUgx8E0YkMpLyGZTEhIy8jUwU5aVkpCQDOrd96tzTyb37XifucN+11389a+31nIqSf5WS8ysCtGMByxhosIBbrGALH9k7eUA/9jHYYOJ82DUm8Zj+kQW04QwjeAgqTvFSB9aNUWyiB0cYLwIsYg3PGMZTpIo+XKET09hL7mcVXGIIM9iNTJ6GzwclB5jIA96RDLi3iepTQDLDO7yiKw/4ClGtPt2aPNlkfwZIBp88gHUsBZVFZ2mbohWkF7ItLTprGlC6gtgXG92ifwVItvkeb+goYw/msI2T4E81VtHqHiTVn4cNnsXObylI3HQMG8FNj4ObVgsu2uTYoWbjLzAVHLl6ngUcZn08knKD1dD/z5++aJF564e36px1CaUDvgHWfUYZ0CP4jAAAAABJRU5ErkJggg==",
    //   followers: [],
    //   following: [],
    // }
    return null;
  }

  // Toggle display edit-talent-profile-infor form
  const [showEditTalentInfoForm, setShowEditTalentInfoForm] = useState(false);
  const chatCreating = async () => {
    const res2 = await axios.post(
      "http://localhost:3000/conversations",
      {
        members: [
          {
            user: user?._id,
          },
          {
            user: talent._id,
          },
        ],
      },
      { withCredentials: true }
    );
    const createdConversation = res2.data._id
    showCreatedConversation(createdConversation)
  };
  return (
    <div className="sidebar">
      <i
        className="fa-solid fa-pen-to-square edit-profile-ic"
        onClick={() => {
          setShowEditTalentInfoForm(true);
        }}
      ></i>
      <div className="profile-basics">
        <img src={talent.avatar} className="profile-basics__avt" alt="Avatar" />
        <h3 className="profile-basics__fullname">{talent.username}</h3>
        <p className="profile-basics__username">@{talent.username}</p>
        <p className="profile-basics__job">
          {talent.title ? talent.title : "Freelance Artist"}
        </p>
        <p className="profile-basics__loc">
          <i className="bx bx-location-plus"></i>{" "}
          {talent.province ? talent.province + ", " : ""}{" "}
          {talent.country ? talent.country : ""}
        </p>
      </div>

      <div className="profile-buttons">
        <button className="btn btn-2 chat-btn" onClick={chatCreating}>
          <i className="fa-regular fa-message"></i>
          Chat
        </button>
        <button className="btn btn-3">
          <i className="bx bx-cart"></i>
          Commmission
        </button>
      </div>

      <div className="profile-stats">
        <div className="profile-stats-followers">
          <div className="profile-stats-followers__img-container">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
          </div>
          <p>{talent.followers.length} followers</p>
        </div>
        <span className="dot-delimiter">&#8226;</span>
        <div className="profile-stats-following">
          <p>{talent.following.length} following</p>
        </div>
      </div>

      <div className="profile-section bio">
        <h4 className="profile-section__title">Bio</h4>
        <hr />
        {/* <input className="form-field__input" value="/> */}
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <div className="profile-section socials">
        <h4 className="profile-section__title socials">Socials</h4>
        <hr />
        <p>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAOVJREFUSEvt1DFKQ0EQxvFfChHraOMRtEthYZPGAwREb2DQMk0qG4v0dhFs7WIjthYWtnqABFIqaK4QCA+mCJKw7OM9SJGtht2d7z87szMNNa9Gzfo2DnCMAU6wj2884XZdJnJecIgpdv+JPeOiCsAQ1yuERrisAvCJVgi94wzz1CfJSdEvDkLwBg8p8eI8BzBDM0S7eKwCUOT2KIT62Av7FV9hf+CtbA2KH3KeiLSH+zoBHbyUBdyhHc6n2Al7jJ+wrzApC1j2+4vuLfYqK/IWkNVo2xokJ0vtKUpGsOpCzjTdTMACXwcqGZt877oAAAAASUVORK5CYII=" />{" "}
          fb/luuquocnhat
        </p>
        <p>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAhZJREFUSEvF1UvIT1sYBvDfhyLCRGfkVigkOSeShAFSSnLJ3cQEZ6DIpchAiVxCRgYMJLdco5SYSUkk5XY60emUCSMycu/R+tdu9999X+rrW/Xvv/e73vU+z/s8a63doZtHRzfX12MAo7AFMzCBRiI/8Az3cAz/1hVp18EGHEcf/I8HeNUg5V+YhGH4gr9xsppbB5hcCr7AIrzuokfp8gaGYwqetNbVAa5iPsbivy4UX4s9+IB1eITrWNIEkKJhH5Dq6IW5GI9veIm7JXa7SDmiAAzByCaAjziLjZXq0fciptVAY+wpvMMfOI0oMA8DmgC+4zC2l4Qwv18YbcUd9C7MD5ZdMxPZTRkhsrTk/ArUPUjifuwsC5aVRfm/VOtgOS5gYTE40+eReIg1AoTZjjKf520YiE81gGj9Hnuxu8xF3lVV4u06yIHZXBYcKHINRvypjhbAPuwqE2ewpjOAo+UUZ0222+Wi65UaQJiGcVWivK/ozINqBy2TswUjVUzOCZ+DQ/gHs2omB7BfkwfROSzWV9gOLWZOb7NNV+JtJZ5tOhuRtK3Juazya3fQwmwBPuMWblaYt+o9xiCMaQII+8UY18WrotrURDzFOaxuAvgTYZHEGPymJkvTa4pfQ7yaWmq0lSjB1nUdgx8WSRL/iufoi9HF7MT7I7dw5jfhRJVF0xftdz44R9pd7z32yeyi9J2ndXsHPwHCfnMZO3GOhQAAAABJRU5ErkJggg==" />
          insta/nhatluuquoc03
        </p>
        <p>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUFJREFUSEvd1T8ohWEUx/HPTTIYTAYpJQMGu8VmVAorZVMmZWCRTJQyKZti9WeRyWYxMzAJKYPJYJD86eh5dd3udf91l3uWp97zPud7fr/zPs+b0+DINbi+5gKMYx0Dddp2jUWcRp18ix7RXWfxbPst+goBXyk7iJsaQaE+FPzWzleQAV4xg6MqIRPYQ3s5QFZ3E0v4KANqSbML3/Pjp/liCmaxgzacYxLPJSCdOMQI3jCH3XIKAjqEE/TgCSH/ogAynGzswgPGcIXM6pIKMlUdOMAo3rGA7QSZxxZacYYpvKRcxYDMwlWspM37aZ1Oa+TW8rqOx1UBMldCRagJVRHRbXQd3RdGTYAo0otjfKaZ3JUYfM2ASo9FEwPu03dfqRX/vRfziZn9OclxXW+gv07CJZaLXdd11i2+vbl+mQ2x6BtqhEIZ+AjT5wAAAABJRU5ErkJggg==" />
          email/nhatluudev@gmail.com
        </p>
      </div>

      <div className="profile-section achievements">
        <h4 className="profile-section__title">Achievements</h4>
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

      <div className="profile-section extra">
        <p>Report</p>
        <hr />
        <p>Block</p>
      </div>
      {/* Modal forms */}
      {showEditTalentInfoForm && (
        <EditTalentInfo
          setShowEditTalentInfoForm={setShowEditTalentInfoForm}
          handleSubmitTalentInfo={handleSubmitTalentInfo}
          talentInfoMutation={talentInfoMutation}
        />
      )}
    </div>
  );
}
