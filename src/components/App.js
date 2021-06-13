import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useRepos from "../hooks/useRepos";
import axios from "axios";

const App = () => {
  const { repos, loading, error } = useRepos("tetris");

  console.log("foundRepos,", repos, loading, error);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/details">Details</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/details">{/* <Users /> */}</Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
