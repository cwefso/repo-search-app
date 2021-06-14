import React, {useState} from "react";
import { FormControlLabel, TextField, Button, Checkbox } from "@material-ui/core";
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    backgroundColor: 'white',
    width: "100%"
  },
  search: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    width: "30%",
    minWidth: '250px'
  },
  button: {
    backgroundColor: '#92BFB1',
    width: "30%",
    color: 'white',
    marginTop: 10,
    minWidth: '200px'
  }
}));

const SearchBar = (props) => {
  const classes = useStyles()
  const { setRepos, setRepoDisplay, setLoading } = props;
  const [searchTerm, setSearchTerm] = useState("")
  
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
        if(result.data.items.length === 0){
          alert("No repos found")
        } else {
          setRepos(result.data.items);
          setRepoDisplay(result.data.items);
          setLoading(false);
        }
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
    setSort(false);
    setSearchTerm("");
  };

  return (
    <form className={classes.form}>
      <div className={classes.search}>
      <TextField
        className={classes.input}
        id="search-field"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        className={classes.button}
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
      </div>
      <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={sort}
            onChange={() => setSort(!sort)}
            name="sort"
            color="primary"
          />
        }
        label="Sort by most stars?"
      />
      </div>
    </form>
  );
};

export default SearchBar;
