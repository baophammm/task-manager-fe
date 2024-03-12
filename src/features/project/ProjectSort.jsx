import React, { useContext } from "react";
import { ProjectPageContext } from "../../pages/ProjectPage";
import { FSelect } from "../../components/form";

const PROJECT_SORT_BY_OPTIONS = [
  { value: "created_at_desc", label: "Created At Descending" },
  { value: "created_at_asc", label: "Created At Ascending" },
  { value: "title_desc", label: "Title Descending" },
  { value: "title_asc", label: "Title Ascending" },
];
function ProjectSort() {
  const { filters, setFilters, handleFilterSelection } =
    useContext(ProjectPageContext);

  return (
    <FSelect
      name="sortBy"
      label="Sort By"
      size="small"
      // labelColor="text.primary"
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
