import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import axios from "axios";
import RepoTable from "./RepoTable";
import "./App.css";

const App = () => {
  //setting the search term
  const [searchTerm, setSearchTerm] = useState("");

  //setting repos to display
  const [repoDisplay, setRepoDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // setting selected repo
  const [selectedRepo, setSelectedRepo] = useState({});

  // see if they want to sort by stars
  const [sort, setSort] = useState(false);

  const handleSearch = (phrase, sortTerm) => {
    axios
      .get("https://api.github.com/search/repositories", {
        params: {
          q: `${phrase}`,
          sort: sortTerm ? `${sortTerm}` : null,
        },
      })
      .then((result) => {
        setRepoDisplay(result.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(true);
      });
      setSort(false)
      setSearchTerm("")
  };


  return (
    <Router>
      <section>
        <form>
          <TextField
            id="search-field"
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            color="primary"
            onClick={() => {
              if(sort){
                handleSearch(searchTerm, "stars")
              } else {
                handleSearch(searchTerm)
              }
            }}
          >
            Search
          </Button>
          <FormControlLabel
            control={
              <Checkbox
                checked={sort}
                onChange={() => setSort(!sort)}
                name="sort"
                color="primary"
              />
            }
            label="Sort by Stars?"
          />
        </form>
        {repoDisplay && <RepoTable repos={repoDisplay} />}
      </section>
      <Switch>
        <Route path="/details">{/* <Details /> */}</Route>
      </Switch>
    </Router>
  );
};

export default App;
