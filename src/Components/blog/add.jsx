import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/add.css";
import { useNotification } from "../NotificationContext";
import Back from "../back";

const Add = ({ onPostAdded, onPostUpdated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng
  const { showNotification } = useNotification();
  const { id } = useParams();
  const isEditing = !!id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Nếu đang ở chế độ chỉnh sửa, fetch dữ liệu bài viết
    if (isEditing) {
      const fetchPost = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/posts/${id}`,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          setTitle(response.data.data.title);
          setContent(response.data.data.content);
          setPost(response.data.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu bài viết:", error);
        }
      };
      fetchPost();
    }
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (isEditing) {
        // Chỉnh sửa bài viết
        console.log('Title:', formData.get('title'));
        console.log('Content:', formData.get('content'));
        try {
          const response = await axios.put(
            `http://localhost:8000/api/posts/${id}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          if (response.data.code === 200) {
            onPostUpdated(response.data.data);
            navigate("/");
            showNotification("Chỉnh sửa thành công!", "success");
          } else {
            showNotification("Chỉnh sửa không thành công!", "error");
          }
        } catch (error) {
          if (error.response && error.response.status === 422) {
            console.log(error.response.data);
          }
        }
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/posts/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        if (response.data.code === 200) {
          onPostAdded(response.data.data);
          navigate("/");
          showNotification("Thêm thành công!", "success");
        } else {
          showNotification("Thêm không thành công!", "error");
        }
      }
    } catch (error) {
      console.error(
        `Lỗi khi ${isEditing ? "chỉnh sửa" : "thêm"} bài viết:`,
        error
      );
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Cập nhật state image với file ảnh
  };

  return (
    <div>
      <div className="add-form-container">
        <Back/>
        <h2>{isEditing ? "Chỉnh sửa bài viết" : "Thêm bài viết"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            {isEditing &&
              post?.image && ( // Hiển thị hình ảnh hiện tại nếu đang chỉnh sửa và có hình ảnh
                <img
                  src={`http://localhost:8000/storage/${post.image}`}
                  alt="Hình ảnh hiện tại"
                  style={{ width: "200px", height: "auto" }}
                />
              )}
            <input id="image" type="file" onChange={handleImageChange} />
          </div>
          <button type="submit">
            {isEditing ? "Lưu thay đổi" : "Thêm bài viết"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
