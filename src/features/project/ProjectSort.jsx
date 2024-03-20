import React, { useContext } from "react";
import { ProjectPageContext } from "../../pages/ProjectPage";
import { FSelect } from "../../components/form";

const PROJECT_SORT_BY_OPTIONS = [
  { value: "created_at_desc", label: "Created At Newest-Oldest" },
  { value: "created_at_asc", label: "Created At Oldest-Newest" },
  { value: "title_desc", label: "Title Z-A" },
  { value: "title_asc", label: "Title A-Z" },
];
function ProjectSort() {
  const { filters, setFilters, handleFilterSelection } =
    useContext(ProjectPageContext);

  return (
    <FSelect
      name="sortBy"
      label="Sort By"
      size="small"
      sx={{
        width: 1,
      }}
      value={filters.sortBy}
      onChange={(e) => handleFilterSelection("sortBy", e.target.value)}
    >
      {PROJECT_SORT_BY_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </FSelect>
  );
}

export default ProjectSort;
