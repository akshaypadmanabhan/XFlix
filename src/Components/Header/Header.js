import {
  // Avatar,
  // Button,
  // Stack,
  // Grid,
  Button,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
// import { Search } from "@mui/icons-material";
// import { Link, useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import React, { Fragment, useState } from "react";
import "./Header.css"
// import { Link } from "react-router-dom";

// import UploadForm from "./UploadForm";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

const Header = ({ children, fetchVideos, genres, contentRatings }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Fragment>
      <Dialog
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
      >
        <Grid container className="dialog">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <h3 className="form-header">Upload Video</h3>

            <IconButton
              aria-label="close"
              className={"close-button"}
              onClick={handleClose}
            >
              <CloseIcon style={{ color: "#FFFFFF" }} />
            </IconButton>
          </Box>
          <Grid item xs={12}>
           
            Upload Component 
          </Grid>
        </Grid>
      </Dialog>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        sx={{ paddingX: "1rem" }}
      >
        <Box className="header-title" marginTop="1rem">
          <a style={{ textDecoration: "none" }} href="/"><h3>
            <span style={{color:"red"}}>X</span>Flix</h3>
          </a>
        </Box>

        {/* /**Search Box */}
        <Box className="search-box" marginTop="1rem">
          {children}
          
        </Box>

        <Box className="header-action" marginTop="1rem">
          <Button
            id="upload-btn"
            startIcon={<UploadIcon />}
            variant="contained"
            onClick={handleOpen}
          >
            Upload
          </Button>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Header;
