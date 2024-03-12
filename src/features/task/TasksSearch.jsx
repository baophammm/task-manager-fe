import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
  Box,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from "@mui/material";
import { useContext } from "react";
import { TaskPageContext } from "../../pages/TaskPage";

export const TasksSearch = () => {
  const { filters, handleFilterSelection } = useContext(TaskPageContext);

  return (
    <Box sx={{ width: 1 }}>
      <OutlinedInput
        fullWidth
        placeholder="Search task"
        placeholderTextColor="white"
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
        inputProps={{
          style: { color: "white" },
        }}
      />
    </Box>
  );
};
