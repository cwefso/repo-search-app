import React from 'react';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './RepoTable.css'


const styles = () => ({
  root: {
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


const RepoTable = (props) => {
  const { classes, repos, setSelectedRepo } = props;
  let history = useHistory();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Stars</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos.map(repo => (
            <TableRow key={repo.id} onClick={()=>{
              setSelectedRepo(repo)
              history.push(`/details/${repo.name}`)
              }}>
              <TableCell>{repo.name}</TableCell>
              <TableCell>{repo.owner.login}</TableCell>
              <TableCell>{repo.stargazers_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(RepoTable);