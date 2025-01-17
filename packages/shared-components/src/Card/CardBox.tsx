import {
  CardActions,
  CardContent,
  CardMedia,
  Card as MuiCard,
} from "@mui/material";
interface CardBoxProps {
  children: React.ReactNode;
  actions?: any;
}

export const CardBox = ({ children, actions }: CardBoxProps) => {
  return (
    <>
      <MuiCard sx={{ width: 275 }}>
        <CardMedia
          sx={{ height: 250 }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnVUuDGCgHGu6v6_B3FgQKiVdoxxK2TqWSgQ&s"
          title="green iguana"
        />
        <CardContent>{children}</CardContent>
        <CardActions>{actions}</CardActions>
      </MuiCard>
    </>
  );
};
