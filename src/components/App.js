import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";
import RepoTable from "./RepoTable";
import "./App.css";

const App = () => {
  //setting the search term
  const [searchTerm, setSearchTerm] = useState("");

  //setting repos to display
  const [repos, setRepos] = useState([])
  const [repoDisplay, setRepoDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // setting selected repo
  const [selectedRepo, setSelectedRepo] = useState({});

  // see if they want to sort by stars
  const [sort, setSort] = useState(false);

  //set language to filter
  const [languageFilter, setLanguageFilter] = useState("");
  const [languageOptions, setLanguageOptions] = useState([]);

  const handleSearch = (phrase, sortTerm) => {
    axios
      .get("https://api.github.com/search/repositories", {
        params: {
          q: `${phrase}`,
          sort: sortTerm ? `${sortTerm}` : null,
        },
      })
      .then((result) => {
        setRepos(result.data.items)
        setRepoDisplay(result.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setError(true);
      });
    setSort(false);
    setSearchTerm("");
  };

  //when repos load, generate a list of language options from the returned repos.
  useEffect(() => {
    const languages = [];
    repoDisplay.map((repo) => {
      if (!languages.includes(repo.language)) {
        languages.push(repo.language);
      }
    });
    setLanguageOptions(languages);
    console.log("language options,", languages);
  }, [loading]);
  

  const handleFilter = (language) => {
    setRepoDisplay(repos)
    const filtered = repos.filter(
      (repo) => repo.language === language
    );
    setRepoDisplay(filtered);
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
              if (sort) {
                handleSearch(searchTerm, "stars");
              } else {
                handleSearch(searchTerm);
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
        {repoDisplay.length >= 1 && (
          <section>
            <FormControl>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={languageFilter}
                onChange={(e) => handleFilter(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Any</em>
                </MenuItem>
                {languageOptions.map((option) => (
                  <MenuItem value={option}>{option}</MenuItem>
                ))}
              </Select>
              <FormHelperText>Filter by Language</FormHelperText>
            </FormControl>
            <RepoTable repos={repoDisplay} />
          </section>
        )}
      </section>
      <Switch>
        <Route path="/details">{/* <Details /> */}</Route>
      </Switch>
    </Router>
  );
};

export default App;
