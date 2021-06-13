import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core/";

const LanguageFilter = (props) => {
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
    setRepoDisplay(repos);
    const filtered = repos.filter((repo) => repo.language === language);
    setRepoDisplay(filtered);
  };

  return (
    <FormControl>
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
