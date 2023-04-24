import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import moment from "moment";

const VideoCard = ({ video }) => {
  return (
    <>
      <Box className="video-tile" display="flex" flexDirection="column">
        <img src={video.previewImage} alt="thumbnail" class="video-img" />
        <Box marginTop="0.4rem" className="video-tile-text">
          <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight:"700" }}>
            {video.title}
          </Typography>
          <Typography gutterBottom variant="subtitle2" sx={{ color:"#D1D5DA", fontWeight:"400" }}>
            {moment(video.releaseDate).fromNow()}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default VideoCard;