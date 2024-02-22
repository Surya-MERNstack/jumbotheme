import React from "react";
import {
  IconButton,
  Stack,
  Typography,
  Box,
  Avatar,
  Button,
  useMediaQuery,
  TextField,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
const TransitionSlideDown = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const TransitionSlideUp = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ActiveNotes({openAddDialogA,setOpenAddDialogA,text}) {
  // const [openAddDialogA, setOpenAddDialogA] = React.useState(false);
  const [openAddLabel, setOpenAddLabel] = React.useState(false);

  const [supervisor, setSupervisor] = React.useState("");
  // const [text, setText] = React.useState("");
  const handleChange = (e) => {
    setSupervisor(e.target.value);
  };
  const AddLabelDialog = () => {
    return (
      <Dialog
        open={openAddLabel}
        TransitionComponent={TransitionSlideUp}
        keepMounted
        onClose={() => setOpenAddLabel(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <Div sx={{ width: 500 }}>
          <Div sx={{ p: 2 }}>
            <Typography fontSize={16} fontWeight={700}>
              {"Add Label"}{" "}
            </Typography>
          </Div>
          <DialogContent>
            <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                name="name"
                id="name"
                size="small"
                label="Name"
                variant="outlined"
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label" size="small">
                  Client
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={supervisor}
                  label="Supervisor"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Kolwaba</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ mb: 0 }}>
              <TextField
                fullWidth
                id="description"
                name="description"
                size="small"
                label="Names"
                variant="outlined"
                multiline
                rows={3}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button size="small" variant="contained" color="success">
              Add Label
            </Button>
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => setOpenAddLabel(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Div>
      </Dialog>
    );
  };
  const EditClient = () => {
    return (
      <Dialog
        open={openAddDialogA}
        TransitionComponent={TransitionSlideDown}
        keepMounted
        onClose={() => setOpenAddDialogA(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <AddLabelDialog />
        {text === "edit" && (
          <Div sx={{ width: 500 }}>
            <Div sx={{ p: 2 }}>
              <Typography fontSize={16} fontWeight={700}>
                {"Edit Client"}{" "}
              </Typography>
              <Div
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Avatar sizes="lg" sx={{ width: 50, height: 50 }} />
              </Div>
            </Div>
            <DialogContent>
              <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  id="names"
                  name="names"
                  size="small"
                  label="Names"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  name="email"
                  id="email"
                  size="small"
                  label="Email"
                  variant="outlined"
                />
              </Stack>
              <Stack direction={"row"} spacing={2} sx={{ mb: 0 }}>
                <TextField
                  fullWidth
                  name="alternativeMobile"
                  id="alternativeMobile"
                  size="small"
                  label="Alternative Mobile"
                  variant="outlined"
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="demo-simple-select-label" size="small">
                    Add To Group
                  </InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={supervisor}
                    label="Supervisor"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>None</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button size="small" variant="contained" color="success">
                Save
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => setOpenAddDialogA(false)}
              >
                Close
              </Button>
            </DialogActions>
          </Div>
        )}
        {text === "addLabel" && (
          <Div sx={{ width: 500, p: 2 }}>
            <Div sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontSize={16} fontWeight={700}>
                {"Add Label"}{" "}
              </Typography>
              <Div sx={{ display: "flex", direction: "row", gap: 1 }}>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  sx={{ fontSize: 5, textTransform: "capitalize" }}
                >
                  Refresh
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  onClick={() => setOpenAddLabel(true)}
                  sx={{ fontSize: 5, textTransform: "capitalize" }}
                >
                  Add Label
                </Button>
              </Div>
            </Div>
            <DialogContent>
              <Div sx={{ display: "flex", gap: 0.5 }}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  label="User Name"
                  variant="outlined"
                />
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Div>
            </DialogContent>
            <DialogActions>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={() => setOpenAddDialogA(false)}
              >
                Close
              </Button>
            </DialogActions>
          </Div>
        )}

        {text === "addNotes" && ( <Div sx={{ p:2,minHeight:300,minWidth:400 }}>
          <Typography fontSize={16} fontWeight={700}>
                {"Add Notes"}{" "}
              </Typography>
        <Div sx={{ position: "relative", p: 2 }}>
          <Div
            sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
          >
            <TextField size="small" fullWidth />
            <Fab
          size="small"
          color="primary"
          variant="extended"
        >
          <NoteAddIcon sx={{fontSize:16, mr: 0,}} />
        </Fab>
          </Div>
        </Div>
      </Div>)}
      </Dialog>
    );
  };
  return (
    <Div sx={{ p: 2, maxHeight: "100%" }}>
      <EditClient />
      {/* <Box display="flex" justifyContent={"space-between"} mt={2}>
        <Avatar />
        <Fab
          size="small"
          onClick={() => [setOpenAddDialog(true), setText("Edit")]}
          color="primary"
          variant="extended"
        >
          <EditIcon sx={{ mr: 1, fontSize: 14 }} />
          <span style={{ fontSize: 10, textTransform: "capitalize" }}>
            Edit
          </span>
        </Fab>
      </Box>
      <Box display="flex" justifyContent={"space-between"} mt={4}>
        <Typography fontSize={14} >Label</Typography>
        <Fab
          size="small"
          onClick={() => [setOpenAddDialog(true), setText("Add")]}
          color="primary"
          variant="extended"
        >
          <AddCircleOutlineIcon sx={{ mr: 1, fontSize: 15 }} />
          <span style={{ fontSize: 10, textTransform: "capitalize" }}>Add</span>
        </Fab>
      </Box>

      <Div sx={{ position: "absolute", bottom: "10px" }}>
        <Div sx={{ position: "relative", p: 2 }}>
          <Div
            sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}
          >
            <TextField size="small" fullWidth />
            <Fab
          size="small"
          color="primary"
          variant="extended"
        >
          <NoteAddIcon sx={{fontSize:16, mr: 0,}} />
        </Fab>
          </Div>
        </Div>
      </Div> */}
    </Div>
  );
}
