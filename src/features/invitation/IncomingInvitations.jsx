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
import ProjectCard from "../project/ProjectCard";
import InvitationProjectCard from "./InvitationProjectCard";

function IncomingInvitations() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { currentPageProjects, projectsById, totalProjects, totalPages } =
    useSelector((state) => state.invitation);

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
      <Typography variant="h4" sx={{ mb: 3 }}>
        Incoming Project Invitations
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Box sx={{ flexGrow: 1 }} />

            <Typography
              variant="subtitle"
              sx={{ color: "text.secondary", ml: 1 }}
            >
              {totalProjects > 1
                ? `${totalProjects} requests founds`
                : totalProjects === 1
                ? `${totalProjects} request found`
                : "No project invitation found"}
            </Typography>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>
        <Grid container spacing={3} my={1}>
          {projects.map((project) => (
            <Grid key={project._id} item xs={12} md={6} lg={4}>
              <InvitationProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default IncomingInvitations;
