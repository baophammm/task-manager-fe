import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteSingleTag, updateSingleTag } from "./tagSlice";
import {
  Box,
  Button,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useSelector } from "react-redux";
import TagColorSelectionTable from "./TagColorSelectionTable";
import { LoadingButton } from "@mui/lab";
import { getSingleTask } from "../task/taskSlice";

function EditTagForm({ tag, handleCloseEditTagMenu, isLoading, taskId, sx }) {
  const tagId = tag._id;

  const [tagLabel, setTagLabel] = useState(tag.tagLabel);

  const [selectedColor, setSelectedColor] = useState(tag.color);
  const [selectedColorShade, setSelectedColorShade] = useState(tag.colorShade);

  const { selectedTag } = useSelector((state) => state.tag);

  const dispatch = useDispatch();

  const handleEditTag = (e) => {
    e.preventDefault();
    if (tagLabel && selectedColor && selectedColorShade) {
      dispatch(
        updateSingleTag({
          tagId,
          tagLabel,
          color: selectedColor,
          colorShade: selectedColorShade,
        })
      );
      dispatch(getSingleTask(taskId));
      handleCloseEditTagMenu();
    } else {
      // Handle error case
    }
  };

  const deleteTag = () => {
    const result = window.confirm(
      "Are you sure you want to delete this tag? This will remove the tag from all tasks"
    );
    if (result) {
      dispatch(deleteSingleTag(tagId)).then(() =>
        dispatch(getSingleTask(taskId))
      );
    }
  };

  return (
    <Box sx={{ px: 1, height: 1, ...sx }}>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 5,
          }}
        >
          <IconButton onClick={handleCloseEditTagMenu}>
            <SvgIcon fontSize="small">
              <ArrowBackIosNewIcon />
            </SvgIcon>
          </IconButton>
        </Box>

        <Typography variant="h6">Edit Tag</Typography>
      </Box>
      <form onSubmit={handleEditTag}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <label htmlFor="tagLabel">Tag Label</label>
          <input
            type="text"
            id="tagLabel"
            name="tagLabel"
            placeholder="Tag Label"
            value={tagLabel}
            onChange={(e) => setTagLabel(e.target.value)}
            style={{
              lineHeight: "2",
              fontSize: "16px",
              padding: "2px 12px",
              zIndex: 2,
            }}
          />

          <label>Tag Color</label>

          <TagColorSelectionTable
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedColorShade={selectedColorShade}
            setSelectedColorShade={setSelectedColorShade}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isLoading}
              size="small"
              sx={{ borderRadius: "4px" }}
            >
              Save
            </LoadingButton>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={deleteTag}
              sx={{ borderRadius: "4px" }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default EditTagForm;
