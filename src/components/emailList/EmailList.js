import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeEmail } from "../../store/email-actions";

const EmailList = (props) => {
  const history = useHistory();
  const emailAuth = useSelector((state) => state.email);
  const dispatch = useDispatch();

  let dataType;
  if (emailAuth.isInbox) {
    dataType = "inbox";
  }

  let shortContent = "";

  if (props.mails.content.length > 80) {
    shortContent = props.mails.content.slice(0, 80);
  } else if (props.mails.content.length < 80) {
    shortContent = props.mails.content;
  }

  const clickHandler = () => {
    history.push(`/email/${props.mails.id}`);
  };

  const removeHandler = () => {
    dispatch(removeEmail(emailAuth.email, dataType, props.mails.id));
  };
  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center border p-2 rounded">
        <div className="d-flex">
          {!props.mails.isRead && (
            <div
              className="me-3 mt-2 bg-primary"
              style={{ borderRadius: "50%", width: "10px", height: "10px" }}
            ></div>
          )}
          <div className="me-5 fw-bold">{props.mails.from}</div>
          <div onClick={clickHandler}>{shortContent}</div>
        </div>
        <div className="d-flex  justify-content-between align-items-center">
          <div>{props.mails.date}</div>
          <button className="btn" onClick={removeHandler}>
            <MdDelete size={"20px"} className=" ms-5" />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailList;
