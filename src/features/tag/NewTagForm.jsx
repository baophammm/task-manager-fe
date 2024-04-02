import {
  Box,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createProjectTag } from "./tagSlice";
import { addTagToTask, getSingleTask } from "../task/taskSlice";
import { FSelect, FTextField, FormProvider } from "../../components/form";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import TagColorSelectionTable from "./TagColorSelectionTable";
import { set } from "lodash";

function NewTagForm({
  taskId,
  projectId,
  isLoading,
  // selectedTag,
  setIsCreatingNewTag,
  handleCloseAddTagFormMenu,
  newTagError,
  setNewTagError,
  sx,
}) {
  const [newlyCreatedTag, setNewlyCreatedTag] = useState(false);

  const [tagLabel, setTagLabel] = useState("");
  // const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState("blue");
  const [selectedColorShade, setSelectedColorShade] = useState("main");

  const { selectedTag } = useSelector((state) => state.tag);

  const dispatch = useDispatch();

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagLabel && selectedColor && selectedColorShade) {
      dispatch(
        createProjectTag({
          tagLabel,
          color: selectedColor,
          colorShade: selectedColorShade,
          projectId,
        })
      ).then(() => {
        setNewlyCreatedTag(true);
      });
      setIsCreatingNewTag(false);
    } else {
      setNewTagError("** Tag Label and Color are required");
      setNewlyCreatedTag(false);
    }
  };

  useEffect(() => {
    if (newlyCreatedTag === true) {
      setNewlyCreatedTag(false);
      dispatch(addTagToTask({ taskId, tagId: selectedTag?._id }));
    }
  }, [newlyCreatedTag, selectedTag, dispatch, taskId]);
  return (
    <Box sx={{ height: 1, ...sx }}>
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
          <IconButton
            onClick={() => {
              setIsCreatingNewTag(false);
              setNewTagError("");
            }}
          >
            <SvgIcon fontSize="small">
              <ArrowBackIosNewIcon />
            </SvgIcon>
          </IconButton>
        </Box>

        <Typography variant="h6">Create New Tag</Typography>
      </Box>
      <form onSubmit={handleAddTag}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <label htmlFor="tagLabel">Tag Label</label>
          {newTagError && <Typography color="error">{newTagError}</Typography>}
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

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isLoading}
            size="small"
            sx={{ borderRadius: "4px" }}
          >
            Add Tag
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}

export default NewTagForm;
