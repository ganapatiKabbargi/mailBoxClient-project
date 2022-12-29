import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchEmailData } from "../store/email-actions";

const SideBar = () => {
  const mail = useSelector((state) => state.email.email);
  const inboxMails = useSelector((state) => state.email.receivedMails);
  const dispatch = useDispatch();
  const history = useHistory();

  let unread = 0;
  inboxMails.forEach((element) => {
    if (element.isRead === false) {
      unread = unread + 1;
    }
  });

  const ClickHandler = () => {
    dispatch(fetchEmailData(mail));
    history.push("/inbox");
  };

  const composeHandler = () => {
    history.push("/compose");
  };

  return (
    <div className=" bg-light" style={{ height: "100vh", width: "260px" }}>
      <div className="text-center ">
        <button className="btn btn-primary mt-5 w-50" onClick={composeHandler}>
          Compose
        </button>
      </div>
      <div className="text-center mt-5 d-flex justify-content-center">
        <button className="btn btn-success w-50" onClick={ClickHandler}>
          Inbox
        </button>
        <div
          className=" text-white"
          style={{
            width: "23px",
            height: "23px",
            borderRadius: "50%",
            position: "absolute",
            left: "200px",
            top: "170px",
            backgroundColor: "red",
          }}
        >
          {" "}
          {unread}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
