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
  } else if (emailAuth.isSent) {
    dataType = "sent";
  }

  let mail = "";
  if (emailAuth.isInbox) {
    mail = props.mails.from;
  } else if (emailAuth.isSent) {
    mail = props.mails.to;
  }

  let shortContent = "";

  if (props.mails.content.length > 80) {
    shortContent = props.mails.content.slice(0, 80);
  } else if (props.mails.content.length < 80) {
    shortContent = props.mails.content;
  }

  let date = props.mails.date.toLocaleString().slice(0, 10);

  const clickHandler = () => {
    history.push(`/email/${props.mails.id}`);
  };

  const removeHandler = () => {
    dispatch(removeEmail(emailAuth.email, dataType, props.mails.id));
  };
  return (
    <Fragment>
      <li className="d-flex justify-content-between align-items-center border-bottom border-2 p-2 rounded">
        <div className="d-flex">
          {!props.mails.isRead && emailAuth.isInbox && (
            <div
              className="me-3 mt-2 bg-primary"
              style={{ borderRadius: "50%", width: "10px", height: "10px" }}
            ></div>
          )}
          <div className="me-5 fw-bold">{mail}</div>
          <div onClick={clickHandler}>{shortContent}</div>
        </div>
        <div className="d-flex  justify-content-between align-items-center">
          <div>{date}</div>
          <button className="btn" onClick={removeHandler}>
            <MdDelete size={"20px"} className=" ms-5" />
          </button>
        </div>
      </li>
    </Fragment>
  );
};

export default EmailList;
