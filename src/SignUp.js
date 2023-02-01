import { useState } from "react";
import {
  LoginButton,
  API_URL,
  RankingButton,
  FactorButton,
  HomeButton,
} from "./Components";
import { Button, Badge } from "reactstrap";

export default function SignUp() {
  const url = `${API_URL}/user/register`;
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function createUser() {
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
        } else setMessage(res.message);
      });
  }
  return (
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
          <LoginButton />
        </li>
      </ul>
      <div>
        <center>
          <h1> Sign Up </h1>
        </center>
        <br></br>

        {/* implement logic to see if there is a message returned */}
        {message ? (
          <div id="input">
            <center>
              <Badge color="success">Success</Badge>
              <p>{message} , Please Log In</p>
              <br></br>
              <LoginButton />
            </center>
          </div>
        ) : (
          <div id="input">
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <center>
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
                <Button color="warning" onClick={createUser}>
                  Sign Up
                </Button>
                <br></br>
                <br></br>
                <p>
                  Already have an account? <LoginButton />
                </p>
              </center>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
