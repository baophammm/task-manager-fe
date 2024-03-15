import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { useDispatch, useSelector } from "react-redux";
import { getIncomingInvitations } from "./invitationSlice";
import InvitationProjectCard from "./InvitationProjectCard";
import LoadingScreen from "../../components/LoadingScreen";

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

  useEffect(() => {
    dispatch(getIncomingInvitations({ search, page }));
  }, [search, page, dispatch]);

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
            <SearchInput handleSubmit={handleSubmit} />

            <Box sx={{ flexGrow: 1 }} />
            {isLoading ? (
              <LoadingScreen />
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
          <LoadingScreen />
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
