import { DialogActions, Dialog as MuiDialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface DialogProps {
  title?: string;
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  showClose?: boolean;
  actions?: any;
}

export const Dialog = ({
  title,
  open,
  handleClose,
  children,
  showClose = true,
  actions,
}: DialogProps) => {
  return (
    <MuiDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ minWidth: "450px", m: 0, p: 2,}}
        id="customized-dialog-title"
      >
        {title}
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

      <DialogContent>{children}</DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </MuiDialog>
  );
};
