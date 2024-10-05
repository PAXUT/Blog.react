import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './Components/NotificationContext';
import List from './Components/blog/list';
import Add from './Components/blog/add';
import PostDetail from './Components/blog/detail';
import Login from './Components/login';
import Register from './Components/register';
import PrivateRoute from './Components/private';
import User from './Components/user/user';
import { UserProvider } from './Components/user/apiuser';
import ChangePassword from './Components/user/editPassword';
import SearchResult from './Components/searchRequest';
import Navbar from './Components/navbar';

const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/posts', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        });
        if (response.data.code === 200) {
          setPosts(response.data.data);
        } else {
          // Hiển thị thông báo lỗi cụ thể
          console.error(response.data.message, "error"); 
          console.error('Lỗi khi lấy bài viết:', response.data.message);
        }
      } catch (err) {
        // Xử lý lỗi mạng hoặc lỗi server
        console.error("Lỗi mạng hoặc lỗi server!", "error");
        console.error('Lỗi khi lấy bài viết:', err);
      }
    };
    fetchPosts();
  }, []); 

  const handlePostAdded = (newPost) => {
    setPosts((prevPosts) => [newPost,...prevPosts]);
  };
  const handlePostDeleted = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };
  const handlePostUpdated = (updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  return (
    <BrowserRouter>
      <NotificationProvider>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<List posts={posts} onPostDeleted={handlePostDeleted} />}/>
              <Route path="/create" element={<Add onPostAdded={handlePostAdded} />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/user" element={<User />} />
              <Route path="/user/password" element={<ChangePassword />} />
              <Route path="/search" element={<SearchResult onPostDeleted={handlePostDeleted}/>} />
              <Route path="/update/:id" element={<Add onPostUpdated={handlePostUpdated}/>} />
            </Route>
          </Routes>
        </UserProvider>  
      </NotificationProvider>
    </BrowserRouter>
  );
};

export default App;
