import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import React, { Fragment, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { addEmailData } from "../store/email-actions";
import Navbar from "../components/Navbar";
import SideBar from "../components/MailboxSideBar";
import { FiSend } from "react-icons/fi";
import { useHistory } from "react-router-dom";

const ComposeMail = () => {
  const inputEmailRef = useRef("");
  const dispatch = useDispatch();
  const history = useHistory();

  const [editorState, setEditorState] = useState("");
  const [subject, setSubject] = useState("");

  const updateTextDescripton = (state) => {
    let text = "";
    state.blocks.forEach((e) => {
      text = text + e.text;
    });

    setEditorState(text);
  };

  const clickHandler = (e) => {
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
    history.push("/inbox");
  };
  return (
    <Fragment>
      <Navbar />
      <div className="d-flex">
        <SideBar />
        <form
          className=" w-50  bg-light m-auto py-4 px-2 rounded shadow mt-5"
          onSubmit={clickHandler}
          style={{}}
        >
          <div className="border-bottom border-primary border-2 pb-2">
            <label>To </label>
            <input
              type="email"
              className="border-0 ms-2"
              style={{ width: "95%" }}
              ref={inputEmailRef}
              required
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
            <button className="btn btn-primary mt-2">
              Send <FiSend className="mb-1 ms-2" />
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default ComposeMail;
