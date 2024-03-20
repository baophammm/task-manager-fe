import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Box, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useContext } from "react";
import { TaskPageContext } from "../../pages/TaskPage";

export const TasksSearch = ({ inputColor }) => {
  const color =
    inputColor === "text.primary"
      ? "#4D5761"
      : inputColor === "text.secondary"
      ? "#F3F4F6"
      : inputColor;

  const { filters, handleFilterSelection, isLoading } =
    useContext(TaskPageContext);
  return (
    <Box sx={{ width: 1 }}>
      <OutlinedInput
        fullWidth
        placeholder="Search task"
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
        inputProps={{
          style: { color: color || "inherit" },
        }}
      />
    </Box>
  );
};
