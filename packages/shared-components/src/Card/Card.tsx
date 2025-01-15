import { CardContent, Card as MuiCard } from "@mui/material";

type CardProps = {
  cardBody: string;
};
export const Card = ({ cardBody }: CardProps) => {
  return (
    <>
      <MuiCard
        sx={{
          width: "100%",
          background: "#f3f3f3",
          color: "#A9ADB8",
          boxShadow: "inherit",
          borderLeft: "6px solid #3ba4e8",
          "&:hover": {
            color: "#0d161e",
            borderColor: "#0d161e",
            transition: ".3s",
            marginLeft: "20px",
            cursor: "pointer",
            borderLeft: "6px solid #0d161e",
          },
        }}
      >
        <CardContent>{cardBody}</CardContent>
      </MuiCard>
    </>
  );
};
