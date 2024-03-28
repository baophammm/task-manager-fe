import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteSingleChecklistItem,
  updateSingleChecklistItemIsChecked,
} from "./checklistSlice";

import { Box, Checkbox, IconButton, SvgIcon, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function ChecklistItemCard({ checklistItem }) {
  const dispatch = useDispatch();

  const handleUpdateChecklistItemIsChecked = () => {
    dispatch(
      updateSingleChecklistItemIsChecked({
        checklistItemId: checklistItem._id,
        isChecked: !checklistItem.isChecked,
      })
    );
  };

  const handleDeleteChecklistItem = () => {
    dispatch(deleteSingleChecklistItem(checklistItem._id));
  };

  return (
    <Box
      sx={{
        borderRadius: "4px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "&:hover": {
          backgroundColor: "action.hover",
        },
        "&:hover .iconButton": {
          visibility: "visible",
        },
      }}
    >
      <Box
        onClick={handleUpdateChecklistItemIsChecked}
        sx={{
          height: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          gap: 1,
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <Checkbox checked={checklistItem.isChecked} sx={{ color: "gray" }} />
        <Typography>{checklistItem.itemTitle}</Typography>
      </Box>
      <Box>
        <IconButton
          className="iconButton"
          onClick={handleDeleteChecklistItem}
          sx={{ visibility: "hidden" }}
        >
          <SvgIcon fontSize="small">
            <ClearIcon />
          </SvgIcon>
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChecklistItemCard;
