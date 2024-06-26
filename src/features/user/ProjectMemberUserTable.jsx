import React, { useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ProjectRole from "../project/ProjectRole";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProject } from "../project/projectSlice";
import ProjectMemberActionButton from "../project/ProjectMemberActionButton";

function ProjectMemberUserTable({ users, projectId }) {
  const { selectedProject } = useSelector((state) => state.project);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProject(projectId));
  }, [projectId, dispatch]);

  const getActionAndProjectRole = (targetUser) => {
    const props = {
      project: selectedProject,
      targetUserId: targetUser._id,
    };
    return {
      projectRole: <ProjectRole {...props} />,
      action: <ProjectMemberActionButton {...props} />,
    };
  };

  return (
    <Box sx={{ width: 1, overflow: "auto" }}>
      <TableContainer sx={{ width: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: { xs: "20%", sm: "25%" } }}>
                Name
              </TableCell>

              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: { xs: "20%", sm: "25%" },
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                Project Role
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const { projectRole, action } = getActionAndProjectRole(user);
              return (
                <TableRow key={user._id} hover>
                  <TableCell
                    align="left"
                    sx={{
                      display: "table-cell",
                    }}
                  >
                    {`${user.firstName} ${user.lastName}`}
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {user.email}
                  </TableCell>

                  <TableCell
                    align="left"
                    sx={{ display: { xs: "none", md: "table-cell" } }}
                  >
                    {projectRole}
                  </TableCell>
                  <TableCell align="left">{action}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProjectMemberUserTable;
