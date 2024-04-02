import React, { useContext, useState } from "react";
import { Box, Button, Chip, Stack, SvgIcon, Typography } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { TaskDetailModalContext } from "./TaskDetailModal";

function SingleTaskDescriptionSection() {
  const { selectedTask } = useContext(TaskDetailModalContext);

  const [seeMore, setSeeMore] = useState(false);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          gap: 1,
        }}
      >
        <SvgIcon fontSize="medium">
          <NotesIcon />
        </SvgIcon>
        <Typography variant="h5">Description</Typography>
      </Box>
      {selectedTask?.description && (
        <Box
          sx={{
            display: "flex",

            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          {/* //Make a see more section here if the description is too long */}
          {selectedTask.description.length < 100 ? (
            <Typography
              sx={{
                p: "4px",
                width: "100%",
                minHeight: "50px",
              }}
            >
              {selectedTask.description}
            </Typography>
          ) : seeMore ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  p: "4px",
                  width: "100%",
                  minHeight: "50px",
                }}
              >
                {selectedTask.description}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <KeyboardArrowUpIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => setSeeMore(false)}
                >
                  See Less
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                gap: 1,
              }}
            >
              <Box
                sx={{
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  overflow: "hidden",
                  WebkitBoxShadow:
                    "inset 0px -70px 20px -20px rgba(169,169,169,1)",
                  boxShadow: "inset 0px -70px 20px -20px rgba(169,169,169,1)",
                }}
              >
                <Typography
                  sx={{
                    p: "4px",
                    width: "100%",
                  }}
                >
                  {selectedTask.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 1,
                  position: "absolute",

                  bottom: 5,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <KeyboardArrowDownIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  color="info"
                  size="small"
                  onClick={() => setSeeMore(true)}
                >
                  See More
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default SingleTaskDescriptionSection;
