import { useState, useEffect } from "react";
import {
  FactorButton,
  LoginButton,
  SignupButton,
  RankingButton,
} from "./Components";
import "./App.css";
import { Button } from "reactstrap";

export default function Landing() {
  var [token, setToken] = useState(null);
  //check if a token is stored in local storage, if so, get token
  useEffect(() => {
    let _token = localStorage.getItem("token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  function LogoutButton() {
    function logout() {
      setToken("");
      localStorage.setItem("token", "");
    }

    return (
      <Button color="link" onClick={logout}>
        Log Out
      </Button>
    );
  }

  return (
    <div>
      {/* implement logic to see if user is logged in  */}
      {token ? (
        <div id="id">
          <ul>
            <li>
              <FactorButton />
            </li>
            <li>
              <RankingButton />
            </li>
            <li>
              <SignupButton />
            </li>
            <li>
              <LogoutButton />
            </li>
          </ul>
        </div>
      ) : (
        <div id="id">
          <ul>
            <li>
              <FactorButton />
            </li>
            <li>
              <RankingButton />
            </li>
            <li>
              <SignupButton />
            </li>
            <li>
              <LoginButton />
            </li>
          </ul>
        </div>
      )}
      <section className="main">
        <center>
          <h1 className="title">The World Happiness Ranking</h1>
          <br></br>
          <br></br>
          <p className="subtitle">
            Deep dive into Happiness scores all around the globe
          </p>
        </center>
      </section>
    </div>
  );
}
