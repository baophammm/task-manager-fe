import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { useContext } from "react";
import { ProjectPageContext } from "../../pages/ProjectPage";

export const ProjectsSearch = ({ sx }) => {
  const { filters, handleFilterSelection } = useContext(ProjectPageContext);

  return (
    <Card sx={{ width: 1, p: 1 }}>
      <OutlinedInput
        fullWidth
        placeholder="Search project"
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
};
