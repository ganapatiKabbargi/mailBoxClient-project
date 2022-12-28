import { emailActions } from "./email-reducer";

export const addEmailData = (email, body) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-client-7d38c-default-rtdb.firebaseio.com/emails/${email}/inbox.json`,
        {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        console.log("in");
        let sEmail = localStorage.getItem("email");
        const response2 = await fetch(
          `https://mail-box-client-7d38c-default-rtdb.firebaseio.com/emails/${sEmail}/sent.json`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const myMail = localStorage.getItem("email");
        dispatch(fetchEmailData(myMail));
        alert("mail sent Successfully");
      } else {
        const errorMessage = "sending mail failed...";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};

export const fetchEmailData = (myMail) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://mail-box-client-7d38c-default-rtdb.firebaseio.com/emails/${myMail}.json`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const sentMails = data.sent;
        const receivedMails = data.inbox;
        console.log(sentMails);

        let sentMail = [];
        let receivedMail = [];

        for (let key in sentMails) {
          let body = sentMails[key];
          sentMail.push({
            id: key,
            to: body.to,
            from: body.from,
            date: body.date,
            subject: body.subject,
            content: body.content,
          });
        }

        for (let key in receivedMails) {
          let body = receivedMails[key];
          receivedMail.push({
            id: key,
            to: body.to,
            from: body.from,
            date: body.date,
            subject: body.subject,
            content: body.content,
          });
        }

        dispatch(emailActions.updateEmailData({ receivedMail, sentMail }));
      } else {
        let errorMessage = "sending mail failed";
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
  };
};
