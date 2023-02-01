import { useState, useEffect } from "react";
import {
  FactorButton,
  API_URL,
  SignupButton,
  RankingButton,
  HomeButton,
} from "./Components";
import "./App.css";
import { Button, Badge } from "reactstrap";

//please run (npm update --force) if unable to start application after running npm install and npm start

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");

  //Login Page Template from Mitchell Johnson Prac 7 Demonstration, referenced

  useEffect(() => {
    //check local storage to see if a token is already stored
    let _token = localStorage.getItem("token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  function storeToken(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logout() {
    localStorage.setItem("token", "");
    setToken(null);
  }

  //Login function Template from Prac 7: JWT Client-Side Worksheet, referenced

  function login() {
    const url = `${API_URL}/user/login`;

    return fetch(url, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.message);
        }
        storeToken(res.token);
      });
  }
  return (
    //navigation bar
    <div>
      <ul>
        <li>
          <HomeButton />
        </li>
        <li>
          <FactorButton />
        </li>
        <li>
          <RankingButton />
        </li>
        <li>
          <SignupButton />
        </li>
      </ul>
      <center>
        <h1> Log In</h1>
      </center>
      <br></br>

      {/* implement logic to see if user is logged in  */}
      {token ? (
        <div id="input">
          <center>
            <Badge color="success">Success</Badge>
            <p>Log In successful</p>
            <br></br>
            <br></br>
            <Button color="warning" onClick={logout}>
              Log Out
            </Button>
          </center>
        </div>
      ) : (
        <div id="input">
          <form
            onSubmit={(event) => {
              //prevent webpage from reloading
              event.preventDefault();
            }}
          >
            <center>
              {/* React form template from Prac 7: React Forms, referenced */}
              <label htmlFor="Email">Email: </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(input) => {
                  const { value } = input.target;
                  //apply regex expression to validate email address
                  if (/^(.+)@(.+)$/.test(value)) {
                    setError(null);
                  } else {
                    setError("Please enter a valid email");
                  }

                  setEmail(input.target.value);
                }}
              ></input>
              <br></br>
              <label htmlFor="Password">Password: </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(input) => {
                  setPassword(input.target.value);
                }}
              ></input>
              {/* apply logic to see if error occured */}
              {error != null ? (
                <div>
                  <Badge color="danger">Error</Badge>
                  <p>Error: {error}</p>
                </div>
              ) : null}
              <br></br>
              <br></br>
              <Button color="warning" onClick={login}>
                Log In
              </Button>
              <br></br>
              <br></br>
              <p>
                New user? <SignupButton />
              </p>
            </center>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
