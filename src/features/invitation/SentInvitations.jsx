import {
  Box,
  Card,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchInput from "../../components/SearchInput";
import InvitationProjectCard from "./InvitationProjectCard";

function SentInvitations() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const invitations = [];

  const handleSubmit = (searchQuery) => {
    setSearch(searchQuery);
  };
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Sent Project Invitations
      </Typography>
      <Card sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", md: "row" }} alignItems="center">
            <SearchInput handleSubmit={handleSubmit} />

            <Box sx={{ flexGrow: 1 }} />

            <Typography variant="subtitle" sx={{ ml: 1 }}>
              10 Invitations found
              {/* {totalUsers > 1
                ? `${totalUsers} requests founds`
                : totalUsers === 1
                ? `${totalUsers} request found`
                : 'No request found'} */}
            </Typography>

            <Pagination
              count={3}
              page={page}
              onChange={(e, page) => setPage(page)}
            />
          </Stack>
        </Stack>
        <Grid container spacing={3} my={1}>
          {invitations.map((invitation) => (
            <Grid key={invitation._id} item xs={12} md={4}>
              <InvitationProjectCard invitation={invitation} />
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

export default SentInvitations;
