import React, { useState } from "react";



// MUI-components
import { Box, Stack } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import { useSnackbar } from "notistack";

import axios from "axios";

import config from "../../Constants/config";



function GenreList({
  allGenres,
  selectedGenres,
  handleGenreChange,
  setVideos,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const sort = {
    sortBy: "releaseDate",
  };
  const [option, setOption] = useState(sort);

  const handleInput = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setOption({ ...option, [name]: value });
    // console.log(value)

    let url = `${config.endpoint}/videos?sortBy=${value}`;
    if (value === "releaseDate") {
      url = `${config.endpoint}/videos`;
    }
    console.log(`Fetch called with ${value}:`, url);
    try {
      const response = await axios.get(url);
      const data = response.data.videos;
      console.log(data);
      setVideos(data);
    } catch (e) {
      if (e.response && e.response.data) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  return (
    <div className="tool-bar">
      {allGenres.map((genre) => (
        <Box
          key={genre.value}
          className={
            selectedGenres.includes(genre.value)
              ? "genre-btn active-toolbar-button"
              : "genre-btn"
          }
          onClick={() => handleGenreChange(genre, selectedGenres)}
        >
          {genre.label}
        </Box>
      ))}

      <Box className="sort-by active-toolbar-button">
        <Stack direction="row" spacing={1}>
          <ImportExportIcon />
          <select
            className="sort-select"
            name="sortBy"
            value={option.sortBy}
            onChange={handleInput}
          >
            <option
              className="select-option"
              id="release-date-option"
              value="releaseDate"
            >
              Release Date
            </option>
            <option
              className="select-option"
              id="view-count-option"
              value="viewCount"
            >
              View Count
            </option>
          </select>
        </Stack>
      </Box>
    </div>
  );
}

export default GenreList;
