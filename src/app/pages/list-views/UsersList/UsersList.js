import React, { Suspense, useEffect, useState } from "react";
import { users } from "./data";
import UserItem from "./UserItem";
import {
  Avatar,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GetAppIcon from "@mui/icons-material/GetApp";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Form, Formik } from "formik";
import LoadingButton from "@mui/lab/LoadingButton";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import JumboAvatarField from "@jumbo/components/JumboFormik/JumboAvatarField";
import Slide from "@mui/material/Slide";
import Div from "@jumbo/shared/Div";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Badge from "@mui/material/Badge";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import JumboBookmark from "@jumbo/components/JumboBookmark";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CircularProgress } from "@mui/material";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Item = styled(Span)(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 2,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UsersList = () => {
  const getAuthCookie = localStorage.getItem("authCookie");
  const [value, setValue] = React.useState(0);
  const [authCookie, setAuthCookie] = useState(getAuthCookie.toString());

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  //Status Dropdown
  const [status, setStatus] = React.useState(" ");
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  //Edit Delete Dropdown Open Close
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [postUserDetails, setPostUserDetails] = React.useState({
    id: "",
    avatar: "",
    active: true,
    userName: "",
    password: "",
    name: "",
    bio: "",
    email: "",
    phone: "",
    alternativePhone: "",
    address: "",
  });
  const [type, setType] = React.useState("");
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  //Export  Dropdown Open Close
  const [exportEl, setExportEl] = React.useState(false);
  const openExport = Boolean(exportEl);

  const handleClickExport = (event) => {
    setExportEl(event.currentTarget);
  };
  const handleCloseExport = () => {
    setExportEl(null);
  };

  //Popup Open Close
  const [open, setOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState("");
  const handleOpen = (mode, type) => {
    setType(mode);
    if (mode === "Add") {
      setPostUserDetails((prev) => {
        return {
          ...prev,
          userName: "",
          password: "",
          name: "",
          bio: "",
          email: "",
          phone: "",
          alternativePhone: "",
          address: "",
        };
      });
    }
    if (type) {
      setAnchorEl(null);
    }
    setOpen(true);
    setViewMode(mode);
  };
  const handleClose = () => setOpen(false);

  const [checked, setChecked] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    header: [],
    users: [],
  });

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const userList = async () => {
    await axios
      .get("https://devserver.ath.cx/admin/admins.jsp", {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${authCookie}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const table = data.table;
        const header = table.header;
        const userList = table.results;
        setUserDetails((prev) => {
          return { ...prev, header: header, users: userList };
        });
        console.log(JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postUser = async () => {
    const AddUser = {
      action: "ae",
      check: true,
      avatar: "avatar5.png",
      bio: postUserDetails.bio,
      username: postUserDetails.userName,
      password: postUserDetails.password,
      active: postUserDetails.active === true ? "1" : "0",
      names: postUserDetails.name,
      email: postUserDetails.email,
      "cell phone": postUserDetails.phone,
      "cell phone 2": postUserDetails.alternativePhone,
      address: postUserDetails.address,
    };
    const EditUser = {
      action: "ae",
      rk: postUserDetails.id,
      check: true,
      avatar: postUserDetails.avatar,
      bio: postUserDetails.bio,
      username: postUserDetails.userName,
      password: postUserDetails.password,
      active: postUserDetails.active === true ? "1" : "0",
      names: postUserDetails.name,
      email: postUserDetails.email,
      "cell phone": postUserDetails.phone,
      "cell phone 2": postUserDetails.alternativePhone,
      address: postUserDetails.address,
    };
    const deleteUserDetails = { action: "del", rk: postUserDetails.id };
    const postData =
      type === "Add" ? AddUser : type === "Edit" ? EditUser : deleteUserDetails;

    console.log("postData: ", JSON.stringify(postData));
    await axios
      .post("https://devserver.ath.cx/admin/admins.jsp", postData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${authCookie}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (viewMode === "Delete" && response.status === 200) {
          setOpen(false);
          toast.success("User Deleted Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            userList();
          }, 700);
        }
        if (response.data.success) {
          setPostUserDetails((prev) => {
            return {
              ...prev,
              userName: "",
              password: "",
              name: "",
              bio: "",
              email: "",
              phone: "",
              alternativePhone: "",
              address: "",
            };
          });
          setOpen(false);

          toast.success("User Added Successfully" + response.data.success, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            userList();
          }, 700);
          console.log("Success:", response.data.success);
          // Handle success here
        } else {
          toast.error(response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
          console.log("Failure:", response.data.error);
          // Handle failure here
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setPostUserDetails((prev) => {
          return { ...prev, avatar: reader.result };
        });
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    userList();
  }, []);
  return (
    <React.Fragment>
      <ToastContainer />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {viewMode === "Delete" && (
            <Box height={"100%"} display={"flex"} alignItems={"center"}>
              <Box>
                <Typography variant="body1" mb={2}>
                  Are you sure you want to delete this user?
                </Typography>
                <Box display={"flex"} justifyContent={"end"} width={"100%"}>
                  <Box display={"flex"} gap={2} flexDirection={"row"}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={postUser}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      No
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {(viewMode === "Edit" || viewMode === "Add") && (
            <Div
              sx={{
                "& .MuiTextField-root": {
                  mb: 3,
                },
              }}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  padding={2}
                  variant="h6"
                  fontSize={16}
                  fontWeight={"bold"}
                >
                  Admin
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Info" {...a11yProps(0)} />
                    <Tab label="Contacts" {...a11yProps(1)} />
                  </Tabs>
                </Box>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="avatar-upload"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="avatar-upload">
                      <Avatar
                        name={"profile_pic"}
                        alt={"user profile pic"}
                        src={postUserDetails.avatar}
                        sx={{ width: 60, height: 60, margin: "0 70px 14px" }}
                      />
                    </label>
                  </Box>
                  <FormControlLabel
                    sx={{ width: "200px" }}
                    control={
                      <Switch
                        color="success"
                        checked={postUserDetails.active}
                        onChange={(e) =>
                          setPostUserDetails((prev) => {
                            return { ...prev, active: e.target.checked };
                          })
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label={
                      postUserDetails.active === true ? "Active" : "In Active"
                    }
                  />
                </Box>

                <TextField
                  fullWidth
                  size="small"
                  value={postUserDetails.userName}
                  variant="outlined"
                  name="name"
                  label="User Name"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, userName: e.target.value };
                    })
                  }
                />

                {/* <JumboTextField fullWidthZ size="small" variant="outlined" name="company" label="Company"/> */}
                <TextField
                  fullWidth
                  value={postUserDetails.password}
                  size="small"
                  variant="outlined"
                  name="password"
                  label="Password"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                />
                <TextField
                  fullWidth
                  value={postUserDetails.name}
                  size="small"
                  variant="outlined"
                  name="designation"
                  label="Name"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, name: e.target.value };
                    })
                  }
                />
                <TextField
                  fullWidth
                  value={postUserDetails.bio}
                  multiline
                  rows={2}
                  size="small"
                  variant="outlined"
                  name="Bio"
                  label="Bio"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, bio: e.target.value };
                    })
                  }
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <TextField
                  fullWidth
                  value={postUserDetails.email}
                  size="small"
                  variant="outlined"
                  name="email"
                  label="Email"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                />
                <TextField
                  fullWidth
                  value={postUserDetails.phone}
                  size="small"
                  variant="outlined"
                  name="phone"
                  label="Phone Number"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, phone: e.target.value };
                    })
                  }
                />
                <TextField
                  fullWidth
                  value={postUserDetails.alternativePhone}
                  size="small"
                  variant="outlined"
                  name="phone"
                  label="Alternative Phone Number"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, alternativePhone: e.target.value };
                    })
                  }
                />
                <TextField
                  fullWidth
                  value={postUserDetails.address}
                  multiline
                  rows={4}
                  size="small"
                  variant="outlined"
                  name="address"
                  label="Address"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, address: e.target.value };
                    })
                  }
                />
              </CustomTabPanel>
              <Div
                sx={{
                  pl: 2,
                  pr: 2,
                  display: "flex",
                  flexDirection: "row",
                  gap: 3,
                  justifyContent: "end",
                }}
              >
                <LoadingButton
                  color="success"
                  onClick={postUser}
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{ mb: 3 }}
                >
                  Save
                </LoadingButton>
                <LoadingButton
                  color="error"
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{ mb: 3 }}
                  onClick={handleClose}
                >
                  Close
                </LoadingButton>
              </Div>
            </Div>
          )}
        </Box>
      </Modal>
      <Typography variant={"h2"} mb={3}>
        Users
      </Typography>
      <Grid container columnGap={2}>
        <Grid xs={12} lg={2}>
          <Card sx={{ mb: 3, p: 2 }}>
            <Stack direction={{lg:"column",xs:"row"}} spacing={{lg:4,xs:2}}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={postUser}
              >
                  <Typography display={{xs:"none", md:"block"}} fontSize={{xs:"4px",md:"8px",lg:"15px"}}>

                Refresh

                </Typography>
              </Button>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={handleChange}
              >
                  <Typography display={{xs:"none", md:"block"}} fontSize={{xs:"4px",md:"8px",lg:"15px"}}>

                Search
                </Typography>
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpen("Add")}
              >
                  <Typography display={{xs:"none", md:"block"}} fontSize={{xs:"4px",md:"8px",lg:"15px"}}>

                Add Users
                </Typography>
              </Button>
              <Button
                aria-label="settings"
                id="basic-button"
                aria-controls={openExport ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openExport ? "true" : undefined}
                onClick={handleClickExport}
                variant="contained"
                endIcon={<ArrowDropDownIcon />}
                startIcon={<GetAppIcon />}
              >
                  <Typography display={{xs:"none", md:"block"}} fontSize={{xs:"4px",md:"8px",lg:"15px"}}>

                Export
                </Typography>
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid lg={9} xs={12}>
          <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
            <Card sx={{ p: 3, mb: 2 }}>
              <Stack direction={"row"} spacing={2} mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="name"
                  label="User Name"
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    size="small"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={handleChangeStatus}
                  >
                    <MenuItem value={" "}>All</MenuItem>
                    <MenuItem value={"ACTIVE"}>Active</MenuItem>
                    <MenuItem value={"INACTIVE"}>In Active</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="email"
                  label="Email"
                />
                {/* <JumboTextField fullWidthZ size="small" variant="outlined" name="company" label="Company"/> */}
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="phone"
                  label="Names"
                />
              </Stack>
              <Stack direction={"row"} spacing={2} mb={2}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="designation"
                  label="Mobile Number"
                />
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="phone"
                  label="Mobile Number2"
                />
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="phone"
                  label="Address"
                />
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  name="phone"
                  label="Bio"
                />
              </Stack>
              <Box display={"flex"} justifyContent={"end"}>
                <Button variant="contained" startIcon={<SearchIcon />}>
                  Search
                </Button>
              </Box>
            </Card>
          </Slide>
         
            <Box height={"65vh"} overflow={"auto"} bgcolor={"white"}>
            <Suspense fallback={<div>Loading...</div>}>
              {userDetails.users?.map((user, index) => (
                  <Box key={index}>
                  <Card sx={{ mb: 1 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      sx={{ p: (theme) => theme.spacing(2, 1) }}
                    >
                      <Item
                        sx={{
                          flex: { xs: 1, md: "0 1 45%", lg: "0 1 35%" },
                        }}
                      >
                        <Stack direction={"row"} alignItems={"center"}>
                          <Item sx={{ ml: -1 }}>
                            {/* <JumboBookmark value={user.isFavorite} sx={{verticalAlign: 'middle'}}/> */}
                          </Item>
                          <Item>
                            <Badge
                              overlap="circular"
                              variant="dot"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              sx={{
                                ".MuiBadge-badge": {
                                  border: "2px solid #FFF",
                                  height: "14px",
                                  width: "14px",
                                  borderRadius: "50%",
                                  bgcolor: user.Active
                                    ? "success.main"
                                    : "#757575",
                                },
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: 56,
                                  height: 56,
                                }}
                                //    alt={`${user.firstName}
                                //    ${user.lastName}`}
                                src={
                                  " https://devserver.ath.cx/media/avatar/" +
                                  user.Avatar
                                }
                              />
                            </Badge>
                          </Item>
                          <Item>
                            <Typography
                              variant={"h6"}
                              mb={0.5}
                            >{`${user.Username}`}</Typography>
                            <Typography
                              variant={"body1"}
                              color="text.secondary"
                            >
                              {user.Email}
                            </Typography>
                          </Item>
                        </Stack>
                      </Item>
                      <Item
                        sx={{
                          alignSelf: "flex-start",
                          flexBasis: { md: "28%", lg: "18%" },
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <Typography variant={"h6"} mt={2} lineHeight={1.25}>
                          {user["Created Time"]}
                        </Typography>
                      </Item>

                      <Item
                        sx={{
                          flexBasis: "30%",
                          display: { xs: "none", lg: "block" },
                        }}
                      >
                        <Stack
                          spacing={2}
                          direction={"row"}
                          alignItems={"center"}
                          sx={{ textAlign: "center" }}
                        >
                          <Item>
                            <Typography variant={"h6"} mb={0.5}>
                              {user.Mobile}
                            </Typography>
                            {/* <Typography variant={"body1"} color="text.secondary">Views</Typography> */}
                          </Item>
                          {/* <Item>
                       <Typography variant={"h6"} mb={.5}>{user.summary.projects}</Typography>
                       <Typography variant={"body1"} color="text.secondary">Project</Typography>
                   </Item>
                   <Item>
                       <Typography variant={"h6"} mb={.5}>{user.summary.followers}</Typography>
                       <Typography variant={"body1"} color="text.secondary">Followers</Typography>
                   </Item> */}
                        </Stack>
                      </Item>
                      <Item
                        sx={{
                          ml: "auto",
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        <Button
                          sx={{ minWidth: 92 }}
                          disableElevation
                          variant={"contained"}
                          size={"small"}
                          color={user.Active === "ACTIVE" ? "success" : "error"}
                        >
                          {user.Active}
                        </Button>
                      </Item>
                      <Item sx={{ ml: { xs: "auto", sm: 0 } }}>
                        <IconButton
                          aria-label="settings"
                          id="basic-button"
                          aria-controls={openMenu ? "basic-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={openMenu ? "true" : undefined}
                          onClick={(e) => [
                            handleClick(e),
                            setPostUserDetails((prev) => {
                              return {
                                ...prev,
                                id: user.id,
                                avatar:
                                  "https://devserver.ath.cx/media/avatar/" +
                                  user.Avatar,
                                active: user.Active === "ACTIVE" ? true : false,
                                userName: user.Username,
                                password: user.password,
                                name: user.Names,
                                bio: user.Description,
                                email: user.Email,
                                phone: user.Mobile,
                                alternativePhone: user.Mobile2,
                                address: user.Address,
                              };
                            }),
                          ]}
                        >
                          <MoreHorizIcon />
                        </IconButton>
                      </Item>
                    </Stack>
                  </Card>
                </Box>
              
              ))}
  </Suspense>
            </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => handleOpen("Edit", "Menu")}>Edit</MenuItem>
            <MenuItem onClick={() => handleOpen("Delete", "Menu")}>
              Delete
            </MenuItem>
          </Menu>
          <Menu
            id="basic-menu"
            anchorEl={exportEl}
            open={openExport}
            onClose={handleCloseExport}
            MenuListProps={{
              "aria-labelledby": "basic-button",
              style: { width: 100, textAlign: "center" },
            }}
          >
            <MenuItem onClick={handleCloseExport}>.csv</MenuItem>
            <MenuItem onClick={handleCloseExport}>.xls</MenuItem>
            <MenuItem onClick={handleCloseExport}>.pdf</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default UsersList;
