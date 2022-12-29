import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import EmailList from "../components/emailList/EmailList";
import SideBar from "../components/MailboxSideBar";
import { FiSend } from "react-icons/fi";
import { MdOutlineCallReceived } from "react-icons/md";

const MailDisplay = () => {
  const mailAuth = useSelector((state) => state.email);

  let data;
  if (mailAuth.isInbox) {
    data = mailAuth.receivedMails;
  } else if (mailAuth.isSent) {
    data = mailAuth.sentMails;
  }

  const mails = data.map((mail) => {
    return <EmailList mails={mail} />;
  });

  return (
    <Fragment>
      <Navbar />
      <div className="d-flex">
        <SideBar />
        <div style={{ width: "1180px" }}>
          <div className="mb-2 p-2 " style={{ backgroundColor: "#9678b6" }}>
            <h3 className=" text-white">
              {mailAuth.isInbox ? <MdOutlineCallReceived /> : <FiSend />}{" "}
              {mailAuth.isInbox ? "Recieved mails" : "Sent Mails"}
            </h3>
          </div>
          <ul className="p-0">{mails}</ul>
        </div>
      </div>
    </Fragment>
  );
};

export default MailDisplay;
