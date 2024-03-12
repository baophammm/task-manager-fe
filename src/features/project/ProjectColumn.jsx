import { Box, ImageList, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Project from "./Project";

const StyledProjectList = styled(Box)(({ theme }) => ({
  padding: "8px",
}));

function ProjectColumn(props) {
  return (
    <Box
      sx={{
        borderLeft: "3px solid",
        borderRight: "3px solid",
        borderColor: props.backgroundColor,
        borderRadius: "8px",
        color: props.backgroundColor,
        height: {
          xs: "calc(100vh - 210px)",
          md: "calc(100vh - 184px)",
        },

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">{props.column.title}</Typography>
      <ImageList
        cols={1}
        sx={{
          width: 1,
          height: {
            xs: "calc(100vh - 170px)",
            md: "calc(100vh - 190px)",
          },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StyledProjectList>
          {props.projects.map((project, index) => (
            <Project
              key={project._id}
              project={project}
              filters={props.filters}
            />
          ))}
        </StyledProjectList>
      </ImageList>
    </Box>
  );
}

export default ProjectColumn;
