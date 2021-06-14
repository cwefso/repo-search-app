import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core/";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  language: {
    width: "40%",
    marginTop: 30,
    maxWidth: 300
  }
}));

const LanguageFilter = (props) => {
  const classes = useStyles()
  const { repos, repoDisplay, setRepoDisplay, loading } = props;

  //when repos load, generate a list of language options from the returned repos.
  const [languageOptions, setLanguageOptions] = useState([])
  
  useEffect(() => {
    const languages = [];
    repoDisplay.map((repo) => {
      if (!languages.includes(repo.language)) {
        languages.push(repo.language);
      }
    });
    setLanguageOptions(languages);
  }, [loading]);

  //When a language is selected, filter the shown results
  const handleFilter = (language) => {
    if(language){
      setRepoDisplay(repos);
      const filtered = repos.filter((repo) => repo.language === language);
      setRepoDisplay(filtered);
    } else {
      setRepoDisplay(repos);
    }
  };

  return (
    <FormControl className={classes.language}>
      <Select
        labelId="language-filter"
        id="select language filter"
        onChange={(e) => handleFilter(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">
          <em>Any</em>
        </MenuItem>
        {languageOptions.map((option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Filter by Language</FormHelperText>
    </FormControl>
  );
};

export default LanguageFilter;
