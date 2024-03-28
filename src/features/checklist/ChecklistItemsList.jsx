import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import ChecklistItemCard from "./ChecklistItemCard";
import { ChecklistContext } from "./Checklist";

function ChecklistItemsList({ checklist }) {
  return (
    <Stack spacing={1.5}>
      {!checklist.totalChecklistItems && (
        <Typography variant="subtitle">No items in the checklist</Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {checklist.checklistItems.map((checklistItem) => (
          <ChecklistItemCard
            key={checklistItem._id}
            checklistItem={checklistItem}
          />
        ))}
      </Box>
    </Stack>
  );
}

export default ChecklistItemsList;
