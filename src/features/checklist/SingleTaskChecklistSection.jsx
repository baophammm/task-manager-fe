import { Box, Button, Stack, SvgIcon, Typography } from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

import React, { useState } from "react";

import ChecklistDisplay from "./ChecklistDisplay";
import AddChecklistForm from "./AddChecklistForm";

function SingleTaskChecklistSection({ taskId, disableUpdateTask }) {
  const [addingChecklist, setAddingChecklist] = useState(false);

  return (
    <Box sx={{ width: 1, gap: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SvgIcon fontSize="medium">
            <ChecklistIcon />
          </SvgIcon>
          <Typography variant="h5">Checklist</Typography>
        </Box>

        {!disableUpdateTask && (
          <Button
            startIcon={
              <SvgIcon fontSize="small">
                <PlusIcon />
              </SvgIcon>
            }
            variant="contained"
            onClick={() => setAddingChecklist(true)}
          >
            Checklist
          </Button>
        )}
      </Box>
      <AddChecklistForm
        taskId={taskId}
        addingChecklist={addingChecklist}
        setAddingChecklist={setAddingChecklist}
      />
      <ChecklistDisplay taskId={taskId} />
    </Box>
  );
}

export default SingleTaskChecklistSection;
