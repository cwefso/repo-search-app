import React from 'react';
import Paper from '@material-ui/core/Paper';

const DetailsView = (props) => {
  const { repo } = props;
  return (
    <Paper>
      <p>Name: {repo.name}</p>
      <p>Description: {repo.description}</p>
      <p>Stars: {repo.stargazers_count}</p>
      <p>Language: {repo.language}</p>
      <p>Owner: {repo.owner.login}</p>
    </Paper>
  );
}

export default (DetailsView);