import React, { useState, useEffect, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "../css/list.css";
import { useNotification } from "./NotificationContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./user/apiuser";

const SearchResult = ({ onPostDeleted }) => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const [results, setResults] = useState([]);
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/search?q=${searchTerm}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setResults(response.data.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      } finally {
        setIsLoading(false); // Đặt isLoading là false sau khi fetch xong
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);
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
        navigate("/");
        showNotification("Xóa thành công!", "warning", id);
      } else {
        showNotification("Lỗi!", "error");
      }
    } catch {
      showNotification("Lỗi api", "error");
    }
  };

  return (
    <div className="blog-list-container" style={{ margin_top:'150px' }}>
      <div className="blog-list">
        {isLoading ? ( // Kiểm tra isLoading
          <div className="loading">
            <div className="spinner"></div> {/* Hiển thị spinner */}
            <p>Loading...</p> {/* Hiển thị text "Loading..." */}
          </div>
        ) : results.length > 0 ? (
          <>
            <h3>Kết quả tìm kiếm cho "{searchTerm}":</h3>
            {results.map((result) => (
              <div className="blog-item" key={result.id}>
                <div className="blog-header">
                  <h3 className="blog-title">{result.title}</h3>
                  {userData &&
                    result.id_user === userData.id && ( // Kiểm tra userData trước
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(result.id)}
                      >
                        Xóa
                      </button>
                    )}
                </div>
                <p className="blog-content">
                  {result.content.length > 80
                    ? `${result.content.slice(0, 80)}...`
                    : result.content}
                </p>
                {result.image ? (
                  <div className="image">
                    <img
                      src={`http://localhost:8000/storage/${result.image}`}
                      alt=""
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                ) : (
                  <div></div>
                )}
                <Link to={`/posts/${result.id}`}>
                  <p className="blog-content" style={{ color: "gray" }}>
                    Chi tiết
                  </p>
                </Link>
              </div>
            ))}
          </>
        ) : (
          <h3>Không tìm thấy kết quả cho "{searchTerm}"</h3>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
