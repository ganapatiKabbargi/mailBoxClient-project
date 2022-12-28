import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchEmailData } from "../store/email-actions";

const SideBar = () => {
  const mail = useSelector((state) => state.email.email);
  const dispatch = useDispatch();
  const history = useHistory();
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
      <div className="text-center mt-5">
        <button className="btn btn-success w-50" onClick={ClickHandler}>
          Inbox
        </button>
      </div>
    </div>
  );
};

export default SideBar;
