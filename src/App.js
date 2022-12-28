import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import ComposeMail from "./pages/ComposeMail";
import MailDisplay from "./pages/MailDisplay";
import { useSelector } from "react-redux";
function App() {
  const isLogedIn = useSelector((state) => state.auth.isLogedIn);
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
