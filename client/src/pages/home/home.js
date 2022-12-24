import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./home.css";

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const location = useLocation();
  const search = location.search;

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts" + search);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />

      <div className="home">
        <Posts posts={posts} />
        <Sidebar className="sidebar" />
      </div>
    </>
  );
}
