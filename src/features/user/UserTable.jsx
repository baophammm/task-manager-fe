import React from "react";

import useAuth from "../../hooks/useAuth";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import _ from "lodash";
import InvitationStatus from "../invitation/InvitationStatus";
import ActionButton from "../invitation/ActionButton";

function UserTable({ users, projectId }) {
  const { user } = useAuth();
  const currentUserId = user._id;

  const getActionAndStatus = (targetUser) => {
    const props = {
      currentUserId: currentUserId,
      targetUserId: targetUser._id,
      invitation: targetUser.invitation,
      projectId,
    };
    return {
      status: <InvitationStatus {...props} />,
      action: <ActionButton {...props} />,
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
                }}
              >
                Email
              </TableCell>
              <TableCell
                sx={{
                  display: { xs: "none", md: "table-cell" },
                  width: "20%",
                }}
              >
                Status
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const { status, action } = getActionAndStatus(user);
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
                    {status}
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

export default UserTable;
