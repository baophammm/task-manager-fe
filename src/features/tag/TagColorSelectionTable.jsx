import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

function TagColorSelectionTable({
  setSelectedColor,
  setSelectedColorShade,
  selectedColor,
  selectedColorShade,
}) {
  return (
    <Table>
      <TableBody>
        {["red", "yellow", "orange", "blue", "green", "purple"].map((color) => (
          <TableRow key={color}>
            {["dark", "main", "light"].map((shade) => (
              <TableCell key={shade} sx={{ p: 0.4, px: 0.8 }}>
                <Box
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedColorShade(shade);
                  }}
                  sx={{
                    border: "3px solid",
                    borderColor:
                      selectedColor === color && selectedColorShade === shade
                        ? "background.secondary"
                        : "transparent",
                    borderRadius: "4px",
                    backgroundColor: `tag.${color}.${shade}`,
                    width: "100%",
                    height: 36,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TagColorSelectionTable;
