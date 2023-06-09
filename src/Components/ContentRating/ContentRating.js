import React from "react";

// MUI-Components
import { Box } from "@mui/material";

// styles
import "./ContentRating.css";

const ContentRatingList = ({
  allContentRatings,
  selectedContentRatings,
  handleContentRatingChange,
}) => {
  return (
    <div className="tool-bar" id="tool-barHeight">
      {allContentRatings.map((contentRating) => (
        <Box
          key={contentRating.value}
          className={
            selectedContentRatings.includes(contentRating.value)
              ? "content-rating-btn active-toolbar-button"
              : "content-rating-btn"
          }
          onClick={() => handleContentRatingChange(contentRating)}
        >
          {contentRating.label}
        </Box>
      ))}
    </div>
  );
};

export default ContentRatingList;
