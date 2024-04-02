import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { getIncomingInvitations } from "./invitationSlice";
import InvitationProjectCard from "./InvitationProjectCard";
import LoadingScreen from "../../components/LoadingScreen";
import { debounce } from "lodash";

function IncomingInvitations() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const {
    currentPageProjects,
    projectsById,
    totalProjects,
    totalPages,
    isLoading,
  } = useSelector((state) => state.invitation);

  const projects = currentPageProjects.map(
    (projectId) => projectsById[projectId]
  );

  const dispatch = useDispatch();

  const debounceGetIncomingInvitations = useCallback(
    debounce((nextValue) => dispatch(getIncomingInvitations(nextValue)), 1000),
    []
  );

  useEffect(() => {
    if (search) {
      debounceGetIncomingInvitations({ search, page });
    } else {
      dispatch(getIncomingInvitations({ search, page }));
    }
  }, [search, page, dispatch, debounceGetIncomingInvitations]);

  const handleSubmit = (searchQuery) => {
    setSearch(searchQuery);
  };
  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Incoming Project Invitations
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2} alignItems="center">
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: 1 }}
          >
            <SearchInput handleSubmit={handleSubmit} isLoading={isLoading} />

            <Box sx={{ flexGrow: 1 }} />
            {isLoading ? (
              <Box
                sx={{
                  width: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingScreen />
              </Box>
            ) : (
              <Typography
                variant="subtitle"
                sx={{ color: "text.primary", ml: 1 }}
              >
                {totalProjects > 1
                  ? `${totalProjects} invitations found`
                  : totalProjects === 1
                  ? `${totalProjects} invitation found`
                  : "No invitation found"}
              </Typography>
            )}

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>
        {isLoading ? (
          <Box
            sx={{
              height: 300,
              width: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingScreen />
          </Box>
        ) : (
          <Grid container spacing={3} my={1}>
            {projects.map((project) => (
              <Grid key={project._id} item xs={12} md={6} lg={4}>
                <InvitationProjectCard project={project} />
              </Grid>
            ))}
          </Grid>
        )}
      </Card>
    </Container>
  );
}

export default IncomingInvitations;
