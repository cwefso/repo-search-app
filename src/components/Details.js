import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  details: {
    width: "40%",
    height: "60%",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    minWidth: 400,
  },
  h4: {
    borderTop: "1px solid black",
  },
  info: {
    width: "50%",
  },
  p: {
    fontSize: "2em",
    marginBottom: -10,
  },
}));

const DetailsView = (props) => {
  const classes = useStyles();
  const { repo } = props;

  return (
    <Paper className={classes.details}>
      <div className={classes.info}>
        <p className={classes.p}>{repo.name}</p>
        <h4 className={classes.h4}>Name</h4>
      </div>
      <div className={classes.info}>
        <p>{repo.description}</p>
        <h4 className={classes.h4}>Description</h4>
      </div>
      <div className={classes.info}>
        <p>{repo.stargazers_count}</p>
        <h4 className={classes.h4}>Stars</h4>
      </div>
      <div className={classes.info}>
        <p>{repo.language}</p>
        <h4 className={classes.h4}>Language</h4>
      </div>
      <div className={classes.info}>
        <p>{repo.owner?.login}</p>
        <h4 className={classes.h4}>Owner</h4>
      </div>
    </Paper>
  );
};

export default DetailsView;
