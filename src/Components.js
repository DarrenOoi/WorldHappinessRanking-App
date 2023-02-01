import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
//set up server and update API
export const API_URL = "http://localhost:3001";

//Fetch requests function Template from Prac 4: React Part 2 - Weather API version, referenced

export function getRankings(country, year) {
  const url = `${API_URL}/rankings?year=${year}&country=${country}`;

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) =>
      data.map((ranking) => {
        return {
          rank: ranking.rank,
          country: ranking.country,
          score: ranking.score,
          year: ranking.year,
        };
      })
    );
}
export function useRanking(search, year) {
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRankings(search, year)
      .then((rowData) => {
        setRowData(rowData);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, year]);
  return {
    error,
    loading,
    rowData,
  };
}

export function getFactors(country, year, token, limit) {
  if (limit === "") {
    var url = `${API_URL}/factors/${year}?country=${country}`;
  } else url = `${API_URL}/factors/${year}?limit=10&country=${country}`;

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw new Error(res.message);
      }

      return res.map((factor) => {
        return {
          rank: factor.rank,
          country: factor.country,
          score: factor.score,
          economy: factor.economy,
          family: factor.family,
          health: factor.health,
          freedom: factor.freedom,
          generosity: factor.generosity,
          trust: factor.trust,
        };
      });
    });
}

export function useFactor(search, year, token, limit) {
  const [error, setError] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFactors(search, year, token, limit)
      .then((rowData) => {
        setRowData(rowData);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, year, token, limit]);

  return {
    error,
    loading,
    rowData,
  };
}

//Countries List copied from /countries
export const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Angola",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Costa Rica",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Estonia",
  "Ethiopia",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guinea",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Cyprus",
  "North Macedonia",
  "Northern Cyprus",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestinian Territories",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "Somaliland Region",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export function FactorButton() {
  const history = useHistory();

  function handleFactor() {
    history.push("/factor");
  }

  return (
    <Button color="link" onClick={handleFactor}>
      Factors
    </Button>
  );
}

export function LoginButton() {
  const history = useHistory();

  function handleLogin() {
    history.push("/login");
  }

  return (
    <Button color="link" onClick={handleLogin}>
      Log In
    </Button>
  );
}

export function SignupButton() {
  const history = useHistory();

  function handleSignup() {
    history.push("/signup");
  }

  return (
    <Button color="link" onClick={handleSignup}>
      Sign Up
    </Button>
  );
}
export function RankingButton() {
  const history = useHistory();

  function handleRanking() {
    history.push("/ranking");
  }

  return (
    <Button color="link" onClick={handleRanking}>
      Rankings
    </Button>
  );
}
export function LogoutButton() {
  const history = useHistory();

  function handleLogin() {
    history.push("/login");
  }

  return (
    <Button color="link" onClick={handleLogin}>
      Log Out
    </Button>
  );
}
export function HomeButton() {
  const history = useHistory();

  function handleHome() {
    history.push("/");
  }

  return (
    <Button color="link" onClick={handleHome}>
      Home
    </Button>
  );
}
