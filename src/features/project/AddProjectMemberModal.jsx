import React, { createContext, useContext, useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  TablePagination,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getProjectAddNewMembers } from "../user/userSlice";
import UsersSearch from "../user/UsersSearch";
import UserTable from "../user/UserTable";

const ModalWrapperBox = styled(Box)(({ theme }) => ({
  // border: "1px solid red",
  // background: alpha(theme.palette.background.paper, 0.36),
  background: theme.palette.action.disabled,

  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100vh",

  WebkitOverflowScrolling: "touch",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows,
  borderRadius: 24,

  minHeight: "80vh",
  width: "80%",
  maxWidth: "800px",
  padding: 12,

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

function AddProjectMemberModal() {
  const modalRef = useRef();
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId;

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const dispatch = useDispatch();

  const handleSubmit = (searchQuery) => {
    setSearch(searchQuery);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const { currentPageUsers, usersById, totalUsers, totalPages, isLoading } =
    useSelector((state) => state.user);

  let users = currentPageUsers.map((userId) => usersById[userId]);

  useEffect(() => {
    dispatch(
      getProjectAddNewMembers({
        projectId,
        page: page + 1,
        limit: rowsPerPage,
        search,
      })
    );
  }, [projectId, page, rowsPerPage, search, dispatch]);

  return (
    <ModalWrapperBox
      ref={modalRef}
      onClick={() => navigate(`/projects/${projectId}`)}
    >
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Container
          component="main"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
          }}
        >
          <CssBaseline />

          <Typography
            variant="h3"
            sx={{
              mb: "12px",
            }}
          >
            Add New Member to Project
          </Typography>
          <UsersSearch handleSubmit={handleSubmit} />
          <Typography variant="subtitle" sx={{ color: "text.secondary" }}>
            {totalUsers > 1
              ? `${totalUsers} users found`
              : totalUsers === 1
              ? `${totalUsers} user found`
              : "No user found"}
          </Typography>
          <Box>
            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, .MuiTablePagination-select, .MuiTablePagination-selectIcon":
                  {
                    display: { xs: "none", md: "block" },
                  },
              }}
              component="div"
              count={totalUsers ? totalUsers : 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
          <UserTable users={users} projectId={projectId} />
        </Container>
      </ModalBox>
    </ModalWrapperBox>
  );
}

export default AddProjectMemberModal;
