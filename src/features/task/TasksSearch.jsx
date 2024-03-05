import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import { useContext } from "react";
import { TaskPageContext } from "../../pages/TaskPage";

export const TasksSearch = () => {
  const { filters, handleFilterSelection } = useContext(TaskPageContext);
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        // defaultValue=""
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
        sx={{ maxWidth: 1 }}
      />
    </Card>
  );
};
