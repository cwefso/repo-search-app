import React from 'react';
import { useHistory } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  table: {
    width: '90vw',
    marginTop: 10,
    marginBottom: 50,
    overflowX: 'auto',
    minWidth: 400,
  }
}));

const RepoTable = (props) => {
  const classes = useStyles()
  const { setSelectedRepo, repoDisplay } = props;
  let history = useHistory();

  return (
    <Paper className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Stars</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repoDisplay.map(repo => (
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

export default RepoTable;