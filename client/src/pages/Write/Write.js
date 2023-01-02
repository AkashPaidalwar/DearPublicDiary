import React from "react";
import "./Write.css";
import { userContext } from "../../Context/Context";
import DocumentPicker from 'react-native-document-picker';
export default function Write() {
  const { user } = React.useContext(userContext);
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [file, setFile] = React.useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const picker_res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log('res : ' + JSON.stringify(picker_res));
      setFile(res);

      let fileName = "";
      const data = new FormData();

      if (file) {
        fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
      }
    console.log("data")
    console.log(data)
      const filestack_res = await fetch("api/upload", {
        method: "POST",
        body: data,

      });
      const filestack_data = await filestack_res.json();
      const postData = {
        title: title,
        description: desc,
        photo: fileName,
        username: user.username,
        categories: "",
        photoURL: filestack_data.url
      };
      const res = await fetch("api/posts/", {
        method: "POST",
        body: JSON.stringify(postData)
        
      });
      const newPostResponse = await res.json();
      window.location.replace("/post/" + newPostResponse._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={event => setFile(event.target.files[0])}
          />
          <input
            type="text"
            placeholder="title"
            className="writeInput"
            autoFocus="true"
            onChange={event => setTitle(event.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            placeholder="Tell Your Story..."
            type="text"
            className="writeInput writeText"
            onChange={event => setDesc(event.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
