import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RepoTable from "./RepoTable";
import DetailsView from "./Details";
import SearchBar from "./Searchbar";
import LanguageFilter from "./LanguageFilter";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    alignItems: "center",
    backgroundColor: "#DAD6D6",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflowY: "scroll",
    minWidth: 400,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  details: {
    alignItems: "center",
    backgroundColor: "#DAD6D6",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    overflowY: "scroll",
  },
}));

const App = () => {
  const classes = useStyles();

  //setting repos to display
  const [repos, setRepos] = useState([]);
  const [repoDisplay, setRepoDisplay] = useState([]);
  const [loading, setLoading] = useState(true);

  // setting selected repo
  const [selectedRepo, setSelectedRepo] = useState({});

  return (
    <Router>
      {/* Main page */}
      <Switch>
        <Route path="/" exact>
          <section
            className={classes.root}
            style={
              repoDisplay.length > 0
                ? { justifyContent: "start" }
                : { justifyContent: "center" }
            }
          >
            <SearchBar
              setRepos={setRepos}
              setRepoDisplay={setRepoDisplay}
              setLoading={setLoading}
            />
            {/* Filter languages */}
            {repoDisplay.length >= 1 && (
              <article className={classes.table}>
                <LanguageFilter
                  repos={repos}
                  repoDisplay={repoDisplay}
                  setRepoDisplay={setRepoDisplay}
                  loading={loading}
                />
                <RepoTable
                  repoDisplay={repoDisplay}
                  setSelectedRepo={setSelectedRepo}
                  setRepoDisplay={setRepoDisplay}
                />
              </article>
            )}
          </section>
        </Route>
      </Switch>
      {/* Details page */}
      <Switch>
        <Route path="/details">
          <section className={classes.details}>
            <DetailsView repo={selectedRepo} />
          </section>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
