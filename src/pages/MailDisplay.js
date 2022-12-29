import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmailList from "../components/emailList/EmailList";
import SideBar from "../components/MailboxSideBar";

const MailDisplay = () => {
  const inboxMails = useSelector((state) => state.email.receivedMails);

  const mails = inboxMails.map((mail) => {
    return <EmailList mails={mail} />;
  });

  return (
    <Fragment>
      <Navbar />
      <div className="d-flex">
        <SideBar />
        <div style={{ width: "1180px" }}>
          <div className="my-2">
            <h4 className="text-center">Recieved mails</h4>
          </div>
          <ul className="p-0">{mails}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export default MailDisplay;
