import  config from "../../Constants/config";
import {
  CircularProgress,
  Box,
  Grid,
  TextField,
  InputAdornment
} from "@mui/material";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import axios from "axios";
import VideoCard from "../UI/VideoCard";
import Header from "../Header/Header";
import GenreList from "../GenreList/Genre";
import ContentRatingList from "../ContentRating/ContentRating";
import "./LandingPage.css";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const allGenres = [
  { label: "All Genre", value: "All" },
  { label: "Education", value: "Education" },
  { label: "Sports", value: "Sports" },
  { label: "Comedy", value: "Comedy" },
  { label: "Lifestyle", value: "Lifestyle" },
];

const allContentRatings = [
  { label: "Any Age Group", value: "Anyone" },
  { label: "7+", value: "7%2B" },
  { label: "12+", value: "12%2B" },
  { label: "16+", value: "16%2B" },
  { label: "18+", value: "18%2B" },
];

const LandingPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [timerId, setTimerId] = useState(null);
  const [videos, setVideos] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const [genres, setGenres] = useState(["All"]);
  const [selectedContentRatings, setSelectedContentRatings] =
    useState("Anyone");

  const performAPICall = async (URL) => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      console.log(response.data);
      setVideos(response.data.videos);
      setLoading(false);
    } catch (e) {
      if (e.response && e.response.data.message) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
      setLoading(false);
    }
  };

  const performSearch = async (value, genres, selectedContentRatings) => {
    let URL = `${config.endpoint}/videos?`;
    if (value.length) {
      URL += `title=${value}`;
    }
    if (genres.length) {
      if (genres.length && !genres.includes("All")) {
        const param = genres.join(",");
        URL[URL.length - 1] === "?"
          ? (URL += `genres=${param}`)
          : (URL += `&genres=${param}`);
      }
    }
    if (selectedContentRatings.length && selectedContentRatings !== "Anyone") {
      URL[URL.length - 1] === "?"
        ? (URL += `contentRating=${selectedContentRatings}`)
        : (URL += `&contentRating=${selectedContentRatings}`);
    }
    //console.log(URL);
    performAPICall(URL);
  };

  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;
    if (timerId) {
      clearTimeout(timerId);
    }
    const debounceTimeoutId = setTimeout(
      () => performSearch(value, genres, selectedContentRatings),
      debounceTimeout
    );
    setTimerId(debounceTimeoutId);
  };

  const toggleValueInList = (array, value) => {
    if (array.includes(value)) {
      //If true, remove the value and update the state
      const newArray = array.filter((e) => e !== value);
      return newArray;
    } else {
      //Else Add the selected value and update the state
      const newArray = [...array, value];
      return newArray;
    }
  };

  const handleGenreChange = (genre) => {
    const all = "All";
    const newGenreValue = genre.value;

    if (newGenreValue === all) {
      setGenres([all]);
    } else {
      //return us the array of genres without "All" in it
      const genreWithoutAll = genres.filter((item) => item !== all);

      const nextGenres = toggleValueInList(genreWithoutAll, newGenreValue);
      setGenres(nextGenres);

      if (nextGenres.length === 0) {
        setGenres([all]);
      }
    }
  };

  const handleContentRatingChange = (contentRating) => {
    setSelectedContentRatings(contentRating.value);
  };


  useEffect(() => {
    const URL = `${config.endpoint}/videos`;
    performAPICall(URL);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    performSearch("", genres, selectedContentRatings);
    // eslint-disable-next-line
  }, [genres, selectedContentRatings]);

  return (
    <>
      <Box className="header-box" sx={{ height: "10vh", bgcolor: "#202020" }}>
        <Header
          fetchVideos={performAPICall}
          genres={allGenres}
          contentRatings={allContentRatings}
        >
          {/* Search view for desktop */}
          <TextField
            className="search-desktop"
            size="small"
            inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
            InputProps={{
              className: "search",
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
            placeholder="Search"
            name="search"
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
            onChange={(event) => debounceSearch(event, 500)}
          />
        </Header>
      </Box>
      <TextField
        className="search-mobile"
        size="small"
        fullWidth
        inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        onChange={(event) => debounceSearch(event, 500)}
        placeholder="Search"
        name="search"
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
      />
      <GenreList
        allGenres={allGenres}
        selectedGenres={genres}
        handleGenreChange={handleGenreChange}
        setVideos={setVideos}
      />
      <ContentRatingList
        allContentRatings={allContentRatings}
        selectedContentRatings={selectedContentRatings}
        handleContentRatingChange={handleContentRatingChange}
      />
      <Grid
        container
        paddingY="1rem"
        marginTop="0.6rem"
        paddingX="2rem"
        spacing={3}
      >
        {!isLoading && videos.length ? (
          videos.map((video) => (
            <Grid item xs={12} sm={6} md={3} key={video._id}>
              <Link
                to={`/video/${video._id}`}
                className="video-tile-link"
                style={{ textDecoration: "none", color: "white" }}
              >
                <VideoCard video={video} />
              </Link>
            </Grid>
          ))
        ) : !isLoading && !videos.length ? (
          <Box className="loading">
            <SentimentDissatisfied />
            <p>No videos found</p>
          </Box>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "75vh", width: "100%" }}
          >
            <Box>
              <CircularProgress />
              {/* <p>Loading Videos..</p>  */}
            </Box>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default LandingPage;