import { Tag } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TagList from "./TagList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTagsByProject } from "./tagSlice";
import NewTagForm from "./NewTagForm";

function TagForm({
  task,
  isCreatingNewTag,
  setIsCreatingNewTag,
  tagSearchText,
  setTagSearchText,
  newTagError,
  setNewTagError,
  sx,
}) {
  const projectId = task.project ? task.project._id : null;

  const { tagsById, tagsByProject, isloading, selectedTag } = useSelector(
    (state) => state.tag
  );

  const tagIds = tagsByProject[projectId] || [];
  const tags = tagIds.map((tagId) => tagsById[tagId]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTagsByProject({ projectId, search: tagSearchText }));
  }, [dispatch, projectId, tagSearchText]);

  return (
    <Box
      sx={{
        px: 1,
        ...sx,
      }}
    >
      <NewTagForm
        sx={{
          width: 1,
          display: isCreatingNewTag ? "flex" : "none",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 1,
        }}
        projectId={projectId}
        taskId={task._id}
        isloading={isloading}
        selectedTag={selectedTag}
        setIsCreatingNewTag={setIsCreatingNewTag}
        newTagError={newTagError}
        setNewTagError={setNewTagError}
      />

      <Box
        className="full-width-children"
        sx={{
          display: isCreatingNewTag ? "none" : "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          textAlign="center"
          className="full-width-children"
        >
          Tags
        </Typography>
        <form className="full-width-children">
          <input
            type="text"
            placeholder="Search tags ..."
            value={tagSearchText}
            onChange={(e) => setTagSearchText(e.target.value)}
            style={{
              width: "100%",
              lineHeight: "2",
              fontSize: "16px",
              padding: "2px 12px",
            }}
          />
        </form>

        <TagList task={task} tags={tags} />
        <Box
          className="full-width-children"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button variant="contained" onClick={() => setIsCreatingNewTag(true)}>
            Create New Tag
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TagForm;
