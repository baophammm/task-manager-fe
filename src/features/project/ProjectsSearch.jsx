import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Box,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext } from "react";
import { ProjectPageContext } from "../../pages/ProjectPage";

export const ProjectsSearch = () => {
  const { filters, handleFilterSelection, isLoading } =
    useContext(ProjectPageContext);

  return (
    <Box sx={{ width: 1 }}>
      <OutlinedInput
        fullWidth
        placeholder="Search project"
        value={filters.search}
        onChange={(e) => handleFilterSelection("search", e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              {isLoading ? <MoreHorizIcon /> : <MagnifyingGlassIcon />}
            </SvgIcon>
          </InputAdornment>
        }
        size="small"
      />
    </Box>
  );
};
