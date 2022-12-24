import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { userContext } from "../../Context/Context";
import "./SinglePost.css";
export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(userContext);
  const publicFolder = "/images/"
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`/api/posts/${path}`, {
        method: "DELETE",
        body: JSON.stringify({
          username: user.username
        }),
        headers: { "Content-type": "application/json" }
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${path}`);
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setDesc(data.description);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [path]);

  const handleUpdate = async () => {
    try {
      await fetch(`/api/posts/${path}`, {
        method: "PUT",
        body: JSON.stringify({
          username: user.username,
          title: title,
          description: desc
        }),
        headers: { "Content-type": "application/json" }
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img
            src={publicFolder + post.photo}
            alt=""
            className="singlePostImg"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={event => setTitle(event.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {user && post.username === user.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon fa-regular fa-pen-to-square"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={event => setDesc(event.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
