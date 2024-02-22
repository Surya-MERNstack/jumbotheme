import React from "react";
import useJumboTheme from "@jumbo/hooks/useJumboTheme";
import {
  IconButton,
  Typography,
  useMediaQuery,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Popover,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "@mui/material/Avatar";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import Badge from "@mui/material/Badge";
import JumboDdMenu from "@jumbo/components/JumboDdMenu/JumboDdMenu";
import useChatApp from "../../hooks/useChatApp";
import { useNavigate } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ActiveNotes from "./ActiveNotes";

const ActiveConversationHeader = () => {
  const { activeConversation } = useChatApp();
  const navigate = useNavigate();
  const { theme } = useJumboTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const handleCloseConversation = () => {
    navigate(`/app/chats`);
  };
  const handleChange = (e) => {
    setSupervisor(e.target.value);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const TransitionSlideDown = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [supervisor, setSupervisor] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const AddClientDialoge = () => {
    return (
      <Dialog
        open={openAddDialog}
        TransitionComponent={TransitionSlideDown}
        keepMounted
        onClose={() => setOpenAddDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <Div sx={{ width: 500 }}>
          <Div sx={{ p: 2 }}>
            <Typography fontSize={16} fontWeight={700}>
              {"Add Client"}{" "}
            </Typography>
            <Div
              sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}
            >
              <Avatar sizes="lg" sx={{ width: 50, height: 50 }} />
              <FormControlLabel
                control={<Switch defaultChecked color="success" />}
                label="Active"
              />
            </Div>
          </Div>
          <DialogContent>
            <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                name="bio"
                multiline
                rows={2}
                id="bio"
                size="small"
                label="Bio"
                variant="outlined"
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  Supervisor
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={supervisor}
                  label="Supervisor"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Kolwaba-narasiman</MenuItem>
                  <MenuItem value={20}>kolwaba-nba</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Stack direction={"row"} spacing={2} sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="userName"
                name="userName"
                size="small"
                label="User Name"
                variant="outlined"
              />
              <TextField
                fullWidth
                name="password"
                id="password"
                size="small"
                label="Password"
                variant="outlined"
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
              onClick={() => setOpenAddDialog(false)}
            >
              Close
            </Button>
          </DialogActions>
        </Div>
      </Dialog>
    );
  };

  // const DialogComponent = () => {
  //   return (
  //     <Dialog
  //       open={openDialog}
  //       TransitionComponent={Transition}
  //       keepMounted
  //       onClose={handleCloseDialog}
  //       aria-describedby="alert-dialog-slide-description"
  //     >
  //       <AddClientDialoge />
  //       <Div sx={{ width: 500 }}>
  //         <Div sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
  //           <Typography fontSize={16} fontWeight={700}>
  //             {"Agents"}{" "}
  //           </Typography>
  //           <Div sx={{ display: "flex", direction: "row", gap: 1 }}>
  //             <Button
  //               size="small"
  //               variant="contained"
  //               startIcon={<RefreshIcon />}
  //               onClick={handleClickOpenDialog}
  //               sx={{ fontSize: 5, textTransform: "capitalize" }}
  //             >
  //               Refresh
  //             </Button>
  //             <Button
  //               size="small"
  //               variant="contained"
  //               startIcon={<AddCircleOutlineIcon />}
  //               onClick={() => setOpenAddDialog(true)}
  //               sx={{ fontSize: 5, textTransform: "capitalize" }}
  //             >
  //               Add Client
  //             </Button>
  //           </Div>
  //         </Div>
  //         <DialogContent>
  //           <Div sx={{ display: "flex", gap: 0.5 }}>
  //             <TextField
  //               fullWidth
  //               id="outlined-basic"
  //               size="small"
  //               label="User Name"
  //               variant="outlined"
  //             />
  //             <IconButton>
  //               <SearchIcon />
  //             </IconButton>
  //           </Div>
  //         </DialogContent>
  //         <DialogActions>
  //           <Button
  //             size="small"
  //             variant="contained"
  //             color="error"
  //             onClick={handleCloseDialog}
  //           >
  //             Close
  //           </Button>
  //         </DialogActions>
  //       </Div>
  //     </Dialog>
  //   );
  // };
  if (!activeConversation) return null;
  return (
    <Div>
      <AddClientDialoge />
      <Div
        sx={{
          display: "flex",
          minWidth: 0,
          alignItems: "center",
          borderBottom: 1,
          borderBottomColor: "divider",
          p: (theme) => theme.spacing(2, 3),
        }}
      >
        {md && (
          <IconButton
            aria-label="Previous"
            sx={{ mr: 2 }}
            onClick={handleCloseConversation}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Div
          sx={{
            display: "flex",
            minWidth: 0,
            flex: 1,
            mr: 2,
          }}
        >
          <Badge
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={
              <React.Fragment>
                <ArrowDropDownIcon
                  sx={{ color: "inherit", fontSize: "1.25rem" }}
                  aria-describedby={id}
                  onClick={handleClick}
                />
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "center",
                    horizontal: "right",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      border: 1,
                      borderColor: "divider",
                    },
                  }}
                >
                  <Div sx={{ width: 500 }}>
                    <Div
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        p: 2,
                      }}
                    >
                      <Typography fontSize={16} fontWeight={700}>
                        {"Agents"}{" "}
                      </Typography>
                      <Div sx={{ display: "flex", direction: "row", gap: 1 }}>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<RefreshIcon />}
                          onClick={handleClickOpenDialog}
                          sx={{ fontSize: 5, textTransform: "capitalize" }}
                        >
                          Refresh
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<AddCircleOutlineIcon />}
                          onClick={() => setOpenAddDialog(true)}
                          sx={{ fontSize: 5, textTransform: "capitalize" }}
                        >
                          Add Client
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
                        onClick={handleCloseDialog}
                      >
                        Close
                      </Button>
                    </DialogActions>
                  </Div>
                </Popover>
              </React.Fragment>
            }
            sx={{
              mr: 2,
              "& .MuiBadge-badge": {
                height: 16,
                width: 16,
                minWidth: 16,
                overflow: "hidden",
                border: 1,
                borderColor: "common.white",
                color: "common.white",
                bgcolor: "#8dcd03",
                cursor: "pointer",
                right: 9,
                bottom: 9,
              },
            }}
          >
            <Avatar
              alt={activeConversation?.contact?.name}
              src={activeConversation?.contact?.profile_pic}
              sx={{ mr: 1,width: 50, height: 50 }}
            />{" "}
          </Badge>
         
          <Div>
            <Typography variant={"h5"} mb={0.5}>
              {activeConversation?.contact?.name}
              <StarOutlinedIcon
                sx={{
                  color: (theme) => theme.palette.primary.main,
                  verticalAlign: "middle",
                  fontSize: 20,
                  ml: 1,
                  mt: "-4px",
                }}
              />
            </Typography>
            <Typography
              variant={"body1"}
              color={"text.secondary"}
              sx={{ textTransform: "capitalize" }}
            >
              {/* <Badge
                overlap="circular"
                variant="dot"
                sx={{
                  m: (theme) => theme.spacing(-0.25, 2, 0, 1),

                  "& .MuiBadge-badge": {
                    height: 10,
                    width: 10,
                    borderRadius: "50%",
                    backgroundColor:
                      activeConversation?.contact?.status === "offline"
                        ? "#afa8a8"
                        : activeConversation?.contact?.status === "online"
                        ? "#72d63a"
                        : "#F7BB07",
                  },
                }}
              /> */}
              {"Paul"}
              {/* {activeConversation?.contact?.status} */}
            </Typography>
           
          </Div>
        </Div>
        <FormControlLabel
          control={<Switch defaultChecked color="success" />}
          label="Bot"
        />

        <JumboDdMenu
          menuItems={[
            {title: "Edit", slug: "edit"},
            {title: "Add Label", slug: "addLabel"},
            {title: "Add Notes", slug: "addNotes"},
            { title: "Close", slug: "close" },
          ]}
        />

      </Div>
    </Div>
  );
};

export default ActiveConversationHeader;
