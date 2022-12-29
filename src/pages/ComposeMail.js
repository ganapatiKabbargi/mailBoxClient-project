import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import React, { Fragment, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { addEmailData } from "../store/email-actions";
import Navbar from "../components/Navbar";
import SideBar from "../components/MailboxSideBar";

const ComposeMail = () => {
  const inputEmailRef = useRef("");
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState("");
  const [subject, setSubject] = useState("");

  const updateTextDescripton = (state) => {
    let text = "";
    state.blocks.forEach((e) => {
      text = text + e.text;
    });

    setEditorState(text);
  };

  const ClickHandler = (e) => {
    e.preventDefault();
    const enteredEmail = inputEmailRef.current.value;
    let usermail = localStorage.getItem("email");
    let Email = enteredEmail.replace(/[.]/g, "");

    const mailData = {
      from: usermail,
      to: Email,
      subject: subject,
      date: new Date(),
      content: editorState,
      isRead: false,
    };

    dispatch(addEmailData(Email, mailData));
  };
  return (
    <Fragment>
      <Navbar />
      <div className="d-flex">
        <SideBar />
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
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className=" mt-2 border-bottom border-primary border-2">
            <label>ComposeMail</label>
            <Editor
              value={editorState}
              toolbarClassName="toolbarClassName "
              wrapperClassName="wrapperClassName bg-light p-2"
              editorClassName="editorClassName bg-white "
              onContentStateChange={updateTextDescripton}
            />
          </div>
          <div>
            <button className="btn btn-primary mt-2" onClick={ClickHandler}>
              Send
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ComposeMail;
