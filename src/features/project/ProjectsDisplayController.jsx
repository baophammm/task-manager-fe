import { Box, Pagination, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import { FormProvider } from "../../components/form";
import ProjectSort from "./ProjectSort";
import { ProjectPageContext } from "../../pages/ProjectPage";

function ProjectsDisplayController() {
  const { methods, totalProjects, totalPages, page, setPage } =
    useContext(ProjectPageContext);
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "50%", md: "33%" },
          }}
        >
          <FormProvider methods={methods}>
            <ProjectSort />
          </FormProvider>
        </Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={1}
          justifyContent={{ xs: "center", md: "flex-end" }}
          alignItems="center"
          sx={{
            mx: 2,
            width: { xs: "50%", md: "auto" },
          }}
        >
          <Typography variant="subtitle" sx={{ color: "text.primary" }}>
            {totalProjects > 1
              ? `${totalProjects} projects found`
              : totalProjects === 1
              ? `${totalProjects} project found`
              : "No project found"}
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, page) => setPage(page)}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default ProjectsDisplayController;
