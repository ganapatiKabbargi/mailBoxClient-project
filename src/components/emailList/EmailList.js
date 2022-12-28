import React from "react";

const EmailList = (props) => {
  return (
    <div className="d-flex justify-content-between border p-2  rounded">
      <div className="d-flex">
        <div className="me-5">{props.mails.from}</div>
        <div>{props.mails.content}</div>
      </div>
      <div>{props.mails.date}</div>
    </div>
  );
};

export default EmailList;
