import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Button, TextField } from "@material-ui/core"
import axios from 'axios'
import RepoTable from './RepoTable'
import './App.css'

const App = () => {
  
  //setting the search term
  const [searchTerm, setSearchTerm] = useState("")

  //setting repos to display
  const [repoDisplay, setRepoDisplay] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // setting selected repo
  const [selectedRepo, setSelectedRepo] = useState({})

  const handleSearch = (phrase) => {
        axios.get('https://api.github.com/search/repositories', {
          params: {
            q: `${phrase}`
          }
        })
        .then((result) => {
          setRepoDisplay(result.data.items)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err.message)
          setLoading(false)
          setError(true)
        })
      setSearchTerm("")
  }

  return (
    <Router>
      <section>
        <form>
          <TextField id="search-field" label="Search" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <Button color="primary" onClick={()=>handleSearch(searchTerm)}>Search</Button>
        </form>
        {repoDisplay &&
          <RepoTable repos={repoDisplay}/>
        }
      </section>
      <Switch>
          <Route path="/details">{/* <Details /> */}</Route>
      </Switch>
    </Router>
  );
};

export default App;
