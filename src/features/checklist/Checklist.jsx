import React, { useEffect, useState } from "react";

import { Box, Button, IconButton, Typography } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import ClearIcon from "@mui/icons-material/Clear";
import ChecklistItemsList from "./ChecklistItemsList";
import AddChecklistItem from "./AddChecklistItem";
import ChecklistControl from "./ChecklistControl";
import { useDispatch } from "react-redux";
import { updateSingleChecklist } from "./checklistSlice";

function Checklist({ checklist }) {
  const [updatingChecklistTitle, setUpdatingChecklistTitle] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState(
    checklist.checklistTitle
  );

  useEffect(() => {
    setChecklistTitle(checklist.checklistTitle);
  }, [checklist.checklistTitle]);
  const dispatch = useDispatch();

  const handleUpdateChecklistTitle = (e) => {
    e.preventDefault();
    if (checklistTitle) {
      dispatch(
        updateSingleChecklist({
          checklistId: checklist._id,
          checklistTitle,
        })
      ).then(() => setUpdatingChecklistTitle(false));
    } else {
      setUpdatingChecklistTitle(false);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
          mt: 1,
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
          <SvgIcon fontSize="normal">
            <LibraryAddCheckIcon />
          </SvgIcon>
          {updatingChecklistTitle ? (
            <>
              <div
                onClick={() => setUpdatingChecklistTitle(false)}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100vw",
                  height: "100vh",
                  zIndex: 0,
                }}
              />
              <form onSubmit={handleUpdateChecklistTitle}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 1,
                    zIndex: 2,
                  }}
                >
                  <input
                    type="text"
                    placeholder="New Checklist Title"
                    value={checklistTitle}
                    onChange={(e) => setChecklistTitle(e.target.value)}
                    style={{
                      lineHeight: "2",
                      fontSize: "16px",
                      padding: "2px 12px",
                    }}
                    autoFocus
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: "4px" }}
                    >
                      Save
                    </Button>
                    <IconButton
                      onClick={() => setUpdatingChecklistTitle(false)}
                    >
                      <SvgIcon fontSize="small">
                        <ClearIcon />
                      </SvgIcon>
                    </IconButton>
                  </Box>
                </Box>
              </form>
            </>
          ) : (
            <div onClick={() => setUpdatingChecklistTitle(true)}>
              <Typography variant="h6">{checklist.checklistTitle}</Typography>
            </div>
          )}
        </Box>
        <ChecklistControl checklist={checklist} />
      </Box>
      <Box
        sx={{
          px: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChecklistItemsList checklist={checklist} />
        <AddChecklistItem checklistId={checklist._id} />
      </Box>
    </Box>
  );
}

export default Checklist;
