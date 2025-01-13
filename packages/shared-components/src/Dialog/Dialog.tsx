import { Dialog as MuiDialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  title: string;
  open: boolean;
  handleClose: () => void;
  body: () => JSX.Element;
  showClose?: boolean;  // Optional prop to control the close button visibility
}

export const Dialog = ({ title, open, handleClose, body, showClose = true }: DialogProps) => {
  return (
    <MuiDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {title || "Modal Title"}
      </DialogTitle>

      {showClose && (
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      )}

      <DialogContent>{body()}</DialogContent>
    </MuiDialog>
  );
};
