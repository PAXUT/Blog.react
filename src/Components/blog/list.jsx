import React, { useContext } from "react";
import axios from "axios";
import "../../css/list.css";
import { Link } from "react-router-dom";
import { useNotification } from "../NotificationContext";
import { UserContext } from "../user/apiuser";

const List = ({ posts, onPostDeleted }) => {
  const { showNotification } = useNotification();
  const { userData } = useContext(UserContext);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/posts/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.code === 200) {
        onPostDeleted(id);
        showNotification("Xóa thành công!", "warning", id);
      } else {
        showNotification("Lỗi!", "error");
      }
    } catch {
      showNotification("Lỗi!", "error");
    }
  };

  return (
    <div className="blog-list-container">
      {posts.length > 0 ? (
        <div className="blog-list">
          {posts.map((post) => (
            <div className="blog-item" key={post.id}>
              <div className="blog-header">
                <h3 className="blog-title">{post.title}</h3>
                {userData &&
                  post.id_user === userData.id && ( // Kiểm tra userData trước
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(post.id)}
                    >
                      Xóa
                    </button>
                  )}
              </div>
              <p className="blog-content">
                {post.content.length > 80
                  ? `${post.content.slice(0, 80)}...`
                  : post.content}
              </p>
              {post.image ? (
                <div className="image">
                  <img
                    src={`http://localhost:8000/storage/${post.image}`}
                    alt=""
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <Link to={`/posts/${post.id}`}>
                <p className="blog-content" style={{ color: "gray" }}>
                  Chi tiết
                </p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-blogs">Loading...</p>
      )}
    </div>
  );
};

export default List;
