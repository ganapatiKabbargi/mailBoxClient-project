import React from "react";
import { useHistory } from "react-router-dom";

const EmailList = (props) => {
  const history = useHistory();

  let shortContent = "";

  if (props.mails.content.length > 80) {
    shortContent = props.mails.content.slice(0, 80);
  } else if (props.mails.content.length < 80) {
    shortContent = props.mails.content;
  }

  const clickHandler = () => {
    history.push(`/email/${props.mails.id}`);
  };
  return (
    <div
      className="d-flex justify-content-between border p-2 rounded"
      onClick={clickHandler}
    >
      <div className="d-flex">
        {!props.mails.isRead && (
          <div
            className="me-3 mt-2 bg-primary"
            style={{ borderRadius: "50%", width: "10px", height: "10px" }}
          ></div>
        )}
        <div className="me-5 fw-bold">{props.mails.from}</div>
        <div>{shortContent}</div>
      </div>
      <div>{props.mails.date}</div>
    </div>
  );
};

export default EmailList;
