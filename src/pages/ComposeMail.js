import { EditorState, convertToRaw } from "draft-js";
import React, { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeMail = () => {
  const inputEmailRef = useRef("");
  //   const inputTextRef = useRef("");

  const [editorState, setEditorState] = useState(() => {
    EditorState.createEmpty();
  });

  const updateTextDescripton = (state) => {
    setEditorState(state);
  };

  const ClickHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    let usermail = localStorage.getItem("email");
    let Email = enteredEmail.replace(/[.]/g, "");

    const data = convertToRaw(editorState.getCurrentContent());
    console.log(data);

    fetch(
      `https://mail-box-client-7d38c-default-rtdb.firebaseio.com/${usermail}/${Email}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          let errMessage = "Sending request failed";
          throw new Error(errMessage);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="bg-light w-50 m-auto py-4 px-2 rounded shadow mt-5">
      <div className="border-bottom border-primary border-2 pb-2">
        <label>To </label>
        <input
          type="email"
          className="border-0 ms-2"
          style={{ width: "95%" }}
          ref={inputEmailRef}
        />
      </div>
      <div className="border-bottom border-primary border-2 py-2">
        <label>Subject</label>
        <input
          type="text"
          className=" border-0 ms-2"
          style={{ width: "90%" }}
        />
      </div>
      <div className=" mt-2 border-bottom border-primary border-2">
        <label>ComposeMail</label>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName "
          wrapperClassName="wrapperClassName bg-light p-2"
          editorClassName="editorClassName bg-white "
          onEditorStateChange={updateTextDescripton}
        />
      </div>
      <div>
        <button className="btn btn-primary mt-2" onClick={ClickHandler}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ComposeMail;
