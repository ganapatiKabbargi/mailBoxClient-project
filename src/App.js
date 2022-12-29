import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ComposeMail from "./pages/ComposeMail";
import MailDisplay from "./pages/MailDisplay";
import { useDispatch, useSelector } from "react-redux";
import ReadMail from "./pages/ReadMail";
import { fetchEmailData } from "./store/email-actions";
import { useEffect } from "react";

function App() {
  const emailAuth = useSelector((state) => state.email);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmailData(emailAuth.email));
  }, []);
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login"></Redirect>
        </Route>
        <Route path="/home">
          <Home />
        </Route>

        <Route path="/compose">
          <ComposeMail />
        </Route>
        <Route path="/email/:emailId" exact>
          <ReadMail />
        </Route>
        <Route path="/inbox">
          <MailDisplay />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
