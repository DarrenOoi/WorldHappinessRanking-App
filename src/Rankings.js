import "./App.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import React, { useState } from "react";

import {
  useRanking,
  countries,
  FactorButton,
  LoginButton,
  SignupButton,
  HomeButton,
} from "./Components";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Line } from "react-chartjs-2";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Ranking() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("2020");
  const [title, setTitle] = useState("Year");

  function Type() {
    return (
      <Typeahead
        id="searchbar"
        onChange={(input) => {
          setSearch(input);
          setYear("");
          //reset search value if theres nothing in search, else it will return with [] instead of "" and logic won't work
          if (search.length !== 0) {
            setSearch("");
          }
        }}
        options={countries}
        placeholder="Search by Country Name"
        selected={search}
      />
    );
  }

  const columns = [
    { headerName: "Rank", field: "rank", filter: "agNumberColumnFilter" },
    { headerName: "Country", field: "country", filter: true },
    { headerName: "Score", field: "score", filter: "agNumberColumnFilter" },
  ];

  const { error, loading, rowData } = useRanking(search, year);
  if (error) {
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

  const state = {
    labels: [
      rowData[0].year,
      rowData[1].year,
      rowData[2].year,
      rowData[3].year,
      rowData[4].year,
      rowData[5].year,
    ],
    datasets: [
      {
        label: `${rowData[0].country} Ranking 2015-2020`,
        fill: false,
        backgroundColor: "orange",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [
          rowData[0].rank,
          rowData[1].rank,
          rowData[2].rank,
          rowData[3].rank,
          rowData[4].rank,
          rowData[5].rank,
        ],
      },
    ],
  };

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
          <SignupButton />
        </li>
        <li>
          <LoginButton />
        </li>
      </ul>
      <div id="main">
        <h1>World Happiness Ranking</h1>
        <br></br>
        <Type />
        <br></br>

        {/* implement logic to see if a search value exists */}
        {search ? (
          <div id="graph">
            <Line
              data={state}
              options={{
                title: {
                  display: true,
                  text: "Ranking(2015-2020)",
                  responsive: false,
                  fontSize: 10,
                  width: "20",
                  height: "20",
                },
                legend: {
                  display: false,
                  position: "left",
                },
              }}
            />
            <br></br>
          </div>
        ) : (
          <div>
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
          </div>
        )}

        <div
          className="ag-theme-balham"
          style={{
            height: "350px",
            width: "605px",
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
