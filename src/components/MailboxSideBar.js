import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchEmailData } from "../store/email-actions";
import { emailActions } from "../store/email-reducer";
import { FiSend } from "react-icons/fi";
import { MdOutlineCallReceived } from "react-icons/md";

const SideBar = () => {
  const mailAuth = useSelector((state) => state.email);
  const inboxMails = useSelector((state) => state.email.receivedMails);
  const dispatch = useDispatch();
  const history = useHistory();

  let unread = 0;
  inboxMails.forEach((element) => {
    if (element.isRead === false) {
      unread = unread + 1;
    }
  });

  const inboxHandler = () => {
    dispatch(fetchEmailData(mailAuth.email));
    dispatch(emailActions.fetchInboxData());

    history.push("/inbox");
  };

  const sentHandler = () => {
    dispatch(emailActions.fetchSentData());
    dispatch(fetchEmailData(mailAuth.email));
    history.push("/inbox");
  };

  const composeHandler = () => {
    history.push("/compose");
  };

  return (
    <div className="bg-light" style={{ height: "90vh", width: "260px" }}>
      <div className="text-center ">
        <button className="btn btn-primary mt-5 w-50" onClick={composeHandler}>
          Compose
        </button>
      </div>
      <div className="text-center mt-5 d-flex justify-content-center">
        <button className="btn btn-success w-50" onClick={inboxHandler}>
          Inbox <MdOutlineCallReceived className="mb-1 ms-2" />
        </button>
        <div
          className=" text-white"
          style={{
            width: "23px",
            height: "23px",
            borderRadius: "50%",
            position: "absolute",
            left: "200px",
            top: "190px",
            backgroundColor: "red",
          }}
        >
          {" "}
          {unread}
        </div>
      </div>
      <div className="text-center mt-5 d-flex justify-content-center">
        <button className="btn btn-secondary w-50" onClick={sentHandler}>
          Sent <FiSend className="mb-1 ms-2" />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
