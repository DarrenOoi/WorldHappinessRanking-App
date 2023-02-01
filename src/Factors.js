import {
  useFactor,
  countries,
  LogoutButton,
  LoginButton,
  RankingButton,
  SignupButton,
  HomeButton,
} from "./Components";
import { Button, Badge } from "reactstrap";
import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Typeahead } from "react-bootstrap-typeahead";

//get token from local storage
let token = localStorage.getItem("token");

export default function Factor() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2020");
  const [title, setTitle] = useState("Year");
  const [limit, setLimit] = useState("10");

  function allRankings() {
    setSearch("");
    setLimit("");
  }

  function Type() {
    return (
      <Typeahead
        id="searchbar"
        onChange={setSearch}
        options={countries}
        placeholder="Search by Country Name"
        selected={search}
      />
    );
  }
  //fetch data
  const { loading, error, rowData } = useFactor(search, year, token, limit);

  const columns = [
    {
      headerName: "Rank",
      field: "rank",
      width: 68,
      filter: "agNumberColumnFilter",
    },
    { headerName: "Country", field: "country", width: 160, filter: true },
    {
      headerName: "Score",
      field: "score",
      width: 80,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Economy",
      field: "economy",
      width: 90,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Family",
      field: "family",
      width: 80,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Health",
      field: "health",
      width: 80,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Freedom",
      field: "freedom",
      width: 90,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Generosity",
      field: "generosity",
      width: 100,
      filter: "agNumberColumnFilter",
    },
    {
      headerName: "Trust",
      field: "trust",
      width: 70,
      filter: "agNumberColumnFilter",
    },
  ];

  if (error) {
    if (error.message === "Authorization header ('Bearer token') not found") {
      return (
        <div id="error">
          <Badge color="danger">Error</Badge>

          <h1>Error401 (Unauthorized)-Please Login to Access this Page</h1>
          <LoginButton />
        </div>
      );
    } else if (error.message === "JWT token has expired") {
      return (
        <div id="error">
          <Badge color="danger">Error</Badge>

          <h1>
            Error401 (Unauthorized)-Session has expired. Please Log Out and Log
            Back In Again
          </h1>
          <LoginButton />
        </div>
      );
    } else if (error.message === "Invalid JWT token") {
      return (
        <div id="error">
          <Badge color="danger">Error</Badge>

          <h1>Error401 (Unauthorized)-Session has expired. Please Log In</h1>
          <LoginButton />
        </div>
      );
    }
    return (
      <div id="error">
        <h1>Something went wrong: {error.message}</h1>
        <h1> Please check your internet connection and try again</h1>
      </div>
    );
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div>
        <ul>
          <li>
            <HomeButton />
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
      <div id="main">
        <h1> Factors</h1>
        <br></br>
        <Type />
        <br></br>
        {/* apply logic to see if a search value exist */}
        {search ? (
          <div>
            <Button color="warning" onClick={allRankings}>
              Show All Rankings
            </Button>
          </div>
        ) : /* apply logic to see if limit exists */

        limit ? (
          <div>
            <Button color="warning" onClick={allRankings}>
              Show All Rankings
            </Button>
          </div>
        ) : (
          <div>
            <Button
              color="warning"
              onClick={() => {
                setSearch("");
                setLimit("10");
              }}
            >
              Show Top Ten
            </Button>
          </div>
        )}
        <br></br>
        <DropdownButton
          title={title}
          id="dropdownmenu"
          variant="warning"
          onSelect={(selection) => {
            setYear(selection);
            setTitle(selection);
          }}
        >
          <Dropdown.Item eventKey="2020">2020</Dropdown.Item>
          <Dropdown.Item eventKey="2019">2019</Dropdown.Item>
          <Dropdown.Item eventKey="2018">2018</Dropdown.Item>
          <Dropdown.Item eventKey="2017">2017</Dropdown.Item>
          <Dropdown.Item eventKey="2016">2016</Dropdown.Item>
          <Dropdown.Item eventKey="2015">2015</Dropdown.Item>
        </DropdownButton>
        <br></br>
        {/* AgGridReact Template from Prac 6: Tables using ag-grid React, referenced */}
        <div
          className="ag-theme-balham"
          style={{
            height: "370px",
            width: "820px",
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={rowData}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
