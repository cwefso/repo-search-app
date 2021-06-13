import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RepoTable from "./RepoTable";
import DetailsView from "./Details";
import SearchBar from "./Searchbar";
import LanguageFilter from "./LanguageFilter";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    backgroundColor: '#DAD6D6',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflowY: 'scroll'
  },
}));

const App = () => {
  const classes = useStyles()

  //setting repos to display
  const [repos, setRepos] = useState([]);
  const [repoDisplay, setRepoDisplay] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // setting selected repo
  const [selectedRepo, setSelectedRepo] = useState({});


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <section className={classes.root} style={repoDisplay.length > 0 ? {justifyContent: 'start'} : {justifyContent: 'center'}}>
            <SearchBar setRepos={setRepos} setRepoDisplay={setRepoDisplay} setLoading={setLoading} setError={setError}/>
            {/* Filter languages */}
            {repoDisplay.length >= 1 && (
              <article>
                <LanguageFilter repos={repos} repoDisplay={repoDisplay} setRepoDisplay={setRepoDisplay} loading={loading}/>
                <RepoTable
                  repos={repoDisplay}
                  setSelectedRepo={setSelectedRepo}
                />
              </article>
            )}
          </section>
        </Route>
      </Switch>
      <Switch>
        <Route path="/details">
          <DetailsView repo={selectedRepo} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
