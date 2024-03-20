import React, { useContext } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { ProjectDetailPageContext } from "../../pages/ProjectDetailPage";
function ProjectDetailTasksSearch({ sx }) {
  const { filters, handleFilterSelection } = useContext(
    ProjectDetailPageContext
  );

  return (
    <Card sx={{ width: 1, p: 1 }}>
      <OutlinedInput
        fullWidth
        placeholder="Search task"
        value={filters.search}
        onChange={(e) => handleFilterSelection("search", e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        size="small"
      />
    </Card>
  );
}

export default ProjectDetailTasksSearch;
