import { Stack } from "@mui/material";
import React from "react";
import { Button } from "./common/Button";

interface PaginationProps {
  pageNumber: number;
  setPageNumber: (page: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageNumber,
  setPageNumber,
  totalPages,
}) => {
  const handleNext = () => setPageNumber(pageNumber + 4);
  const handlePrev = () => {
    if (pageNumber > 0) setPageNumber(pageNumber - 4);
  };

  return (
    <>
      <Stack direction={"row"} sx={{ justifyContent: "end" }}>
        <Button
          label="Prev"
          variant="contained"
          onClick={handlePrev}
          disabled={pageNumber === 0}
          sx={{
            textTransform: "capitalize",
            background: "#000",
            color: "white",
          }}
        />
        <Button label={`${pageNumber / 4 + 1}`} variant="inherit" />
        <Button
          label="Next"
          variant="contained"
          onClick={handleNext}
          sx={{
            textTransform: "capitalize",
            background: "#000",
            color: "white",
          }}
        />
      </Stack>
    </>
  );
};
