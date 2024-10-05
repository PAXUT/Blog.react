import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/detail.css";
import moment from "moment";
import { UserContext } from "../user/apiuser";
import Back from "../back";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  //const [showFullContent, setShowFullContent] = useState({});
  const { userData } = useContext(UserContext);
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleGoBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setPost(response.data.data);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the post!", error);
      });
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // const handleShowFullContent = (postId) => {
  //   setShowFullContent((prevState) => ({
  //     ...prevState,
  //     [postId]: !prevState[postId],
  //   }));
  // };

  return (
    <div style={{ paddingTop: "20px" }}>
      <div className="post-detail-container" key={post.id}>
        <Back />
        {userData &&
          post.id_user === userData.id && ( // Kiểm tra userData trước
            <Link to={`/update/${id}`}>
              <p style={{ color: "gray" }}>Chỉnh sửa</p>
            </Link>
          )}
        <h2 className="post-title">{post.title}</h2>
        <p>
          {
            post.content /* {showFullContent[post.id]
            ? post.content
            : post.content.length > 100
            ? `${post.content.slice(0, 100)}...`
            : post.content} */
          }
        </p>
        {/* {!showFullContent[post.id] && post.content.length > 100 && (
          <button onClick={() => handleShowFullContent(post.id)}>
            Xem thêm
          </button>
        )} */}
        {post.image ? (
          <div className="image">
            <img src={`http://localhost:8000/storage/${post.image}`} alt="" />
          </div>
        ) : (
          <span></span>
        )}
        <p>Người viết {post.user.name}</p>
        <p>{post.created_at}</p>
        <p>{moment(post.created_at).format("DD/MM/YYYY HH:mm:ss")}</p>
      </div>
    </div>
  );
};

export default PostDetail;
