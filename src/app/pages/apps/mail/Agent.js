import React, { Suspense, useEffect, useState } from "react";
import {
  Avatar,
  Badge,
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GetAppIcon from "@mui/icons-material/GetApp";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import Slide from "@mui/material/Slide";
import Div from "@jumbo/shared/Div";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styled from "@emotion/styled";
import Span from "@jumbo/shared/Span";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import AgentFullDetails from "./AgentFullDetails";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PersonAdd } from "@mui/icons-material";
import * as XLSX from "xlsx";
import "./Agent.css";
import profile from "../../../../assets/images/img/photo3.jpg"
// Styled component for Span
const Item = styled(Span)(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));

// Style for the modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 2,
};

// Function for rendering custom tab panels
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

// Function for providing accessibility props to tabs
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Main functional component 'Agent'
const Agent = () => {
  // Retrieving authentication cookie from local storage
  const getAuthCookie = localStorage.getItem("authCookie");

  // State hooks for managing component state
  const [value, setValue] = React.useState(0);
  const [authCookie, setAuthCookie] = useState(
    getAuthCookie ? getAuthCookie.toString() : ""
  );

  console.log(setAuthCookie);

  // Event handler for changing tabs
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  //Status Dropdown
  const [status, setStatus] = React.useState(" ");

  const [getAgentDetails, setAgentsDetails] = useState({});
  const handleChangeStatus = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "status") {
      setStatus(value);
    }
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
    description: "",
    email: "",
    phone: "",
    alternativePhone: "",
    address: "",
    url: "",
    overDraft: "",
    minimumBalance: 0,
    agent: 0,
    supervisor: 0,
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
  const [apiKey, setApiKey] = useState("");
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
  const [AgentDetails, setAgentDetails] = React.useState({
    header: [],
    agent: [],
  });

  const handleChange = () => {
    // setChecked((prev) => !prev);
    setChecked((prev) => !prev);
  };

  const userList = async () => {
    await axios
      .get("https://devserver.ath.cx/admin/agents.jsp ", {
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
        const AgentLists = table.results;
        setAgentDetails((prev) => {
          return { ...prev, header: header, agent: AgentLists };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Function to handle user actions such as add, edit, or delete
  const postUser = async () => {
    const AddUser = {
      action: "ae",
      check: true,
      avatar: "avatar5.png",
      description: postUserDetails.description,
      username: postUserDetails.userName,
      password: postUserDetails.password,
      active: postUserDetails.active === true ? "1" : "0",
      names: postUserDetails.name,
      email: postUserDetails.email,
      "cell phone": postUserDetails.phone,
      address: postUserDetails.address,
      url: postUserDetails.url,
    };
    const EditUser = {
      action: "ae",
      rk: postUserDetails.id,
      check: true,
      avatar: "avatar5.png",
      description: postUserDetails.description,
      username: postUserDetails.userName,
      password: postUserDetails.password,
      active: postUserDetails.active === true ? "1" : "0",
      names: postUserDetails.name,
      email: postUserDetails.email,
      "cell phone": postUserDetails.phone,
      address: postUserDetails.address,

      url: postUserDetails.url,
    };
    const deleteUserDetails = { action: "del", rk: postUserDetails.id };
    const postData =
      type === "Add" ? AddUser : type === "Edit" ? EditUser : deleteUserDetails;

    console.log("postData: ", JSON.stringify(postData));

    // Sending the request to the server
    await axios
      .post("https://devserver.ath.cx/admin/agents.jsp ", postData, {
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

          toast.success(response.data.success, {
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

  // State variable for search
  const [search, setSearch] = useState(false);

  const handleExport = (option) => {
    if (option === "pdf") {
      exportToPDF();
    } else if (option === "csv") {
      exportToCSV(); // Changed function name to exportToCSV
    } else if (option === "xls") {
      exportToXLS();
    } else {
      console.warn("Unsupported export option");
    }
  };

  const data = {
    // Worksheet named animals
    Client: [
      {
        Active: "active",
        Username: "Tomi",
        Email: "ah@smthing.co.com",
        Plan: "month",
        Address: "",
        Description: "testing...",
      },
      {
        Active: "Inactive",
        Username: "Labes",
        Email: "rl@smthing.co.com",
        Plan: "year",
        Address: "",
        Description: "testing...",
      },
      {
        Active: "active",
        Username: "Yezzi",
        Email: "ymin@cocococo.com",
        Plan: "year",
        Address: "",
        Description: "testing...",
      },
    ],
    // Worksheet named pokemons
    Agent: [
      { Active: "active", name: "Tom", category: "pokemon" },
      { Active: "Inactive", name: "Chan", category: "pokemon" },
      { Active: "active", name: "charlie", category: "pokemon" },
    ],
  };

  // Define csvData
  const csvData = [
    [
      "Active",
      "username",
      "Names",
      "Email",
      "Overdraft",
      "Plan",
      "Address",
      "Description",
    ],
    ["active", "Ahmed", "Tomi", "ah@smthing.co.com", "year", "", "testing...."],
    [
      "Inactive",
      "Raed",
      "Labes",
      "rl@smthing.co.com",
      "month",
      "",
      "testing....",
    ],
    [
      "active",
      "Yezzi",
      "Min l3b",
      "ymin@cocococo.com",
      "year",
      "",
      "testing....",
    ],
  ];

  // export csv format
  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "export.csv");
    document.body.appendChild(link);
    link.click();
  };

  // export pdf format
  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Agent Details", 14, 15);

    const columns = [
      "Active",
      "Username",
      "Email",
      "Plan",
      "Names",
      "Overdraft",
      "Address",
      "Description",
    ];

    const rows = AgentDetails.agent?.map((data) => [
      data.active,
      data.Username,
      data.email,
      data.agents,
      data.plan,
      data.names,
      data.overdraft,
      data.address,
      data.description,
    ]);

    pdf.autoTable({
      head: [columns],
      body: [rows],
      startY: 30,
    });

    pdf.save("agent_data_export.pdf");
  };

  // Export format XLs
  const exportToXLS = () => {
    const wb = XLSX.utils.book_new();

    for (const sheetName in data) {
      if (data.hasOwnProperty(sheetName)) {
        const ws = XLSX.utils.json_to_sheet(data[sheetName]);
        XLSX.utils.book_append_sheet(wb, ws, sheetName);
      }
    }

    XLSX.writeFile(wb, "export.xlsx");
  };
  const [activeButton, setActiveButton] = useState(null);
  const [searchButton, setSearchActiveButton] = useState(null);
  const [download, setDownload] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
    console.log("buttons names", buttonName);
  };

  const handleSearchButtonClick = (buttonName) => {
    console.log(alert(buttonName));
    setSearchActiveButton(buttonName === searchButton ? null : buttonName);
  };

  const handlechangeCSVdownload = () => {
    setDownload(true);
  };

  return (
    <React.Fragment>
      <ToastContainer />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            width:
              viewMode === "Pay"
                ? { xs: "90vw", md: "85vw" }
                : viewMode === "AgentDetails"
                ? { xs: "90vw", md: "30vw" }
                : 400,
            minHeight: viewMode === "Pay" ? "40vh" : "auto",
          }}
        >
          {viewMode === "AgentDetails" && (
            <AgentFullDetails AgentDetails={getAgentDetails} />
          )}

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
                  backgroundImage: "url(whatsup)",
                },
              }}
            >
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                sx={{ transform: "all 1s ease-in-out" }}
              >
                <Typography
                  padding={2}
                  variant="h6"
                  fontSize={16}
                  color="#00bf63"
                  fontWeight={500}
                  letterSpacing={"0.3rem"}
                >
                  AGENT
                </Typography>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    indicatorColor="lightcoral"
                    textColor="inherit"
                    aria-label="basic tabs example"
                  >
                    <Tab
                      label="Info"
                      {...a11yProps(0)}
                      sx={{
                        "&.Mui-selected": {
                          borderBottom: "2px solid #00bf63",
                          color: "#00bf63",
                        },
                      }}
                    />
                    <Tab
                      label="Personal "
                      {...a11yProps(1)}
                      sx={{
                        "&.Mui-selected": {
                          borderBottom: "2px solid #00bf63",
                          color: "#00bf63",
                        },
                      }}
                    />
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
                        src={postUserDetails.avatar ?  postUserDetails.avatar : profile}
                        sx={{
                          width: 60,
                          height: 60,
                          margin: "0 70px 14px",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                  </Box>

                  <FormControlLabel
                    sx={{ width: "200px", cursor: "pointer" }}
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

                <Stack direction={"row"} spacing={5}>
                  <TextField
                    fullWidth
                    size="small"
                    value={postUserDetails.userName}
                    variant="outlined"
                    name="userName"
                    label="User Name"
                    style={{ width: "20rem", cursor: "pointer" }}
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, userName: e.target.value };
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    value={postUserDetails.password}
                    size="small"
                    variant="outlined"
                    name="password"
                    label="Password"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, password: e.target.value };
                      })
                    }
                  />
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <TextField
                    fullWidth
                    value={postUserDetails.url}
                    size="small"
                    variant="outlined"
                    name="url"
                    label="URL"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, url: e.target.value };
                      })
                    }
                  />
                </Stack>
                <TextField
                  fullWidth
                  value={postUserDetails.description}
                  multiline
                  rows={3}
                  size="small"
                  variant="outlined"
                  name="description"
                  label="Description"
                  InputLabelProps={{
                    style: {
                      color: "#00bf63",
                      cursor: "pointer",
                    },
                  }}
                  InputProps={{
                    sx: {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00bf63",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00bf63",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00bf63",
                      },
                    },
                  }}
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, description: e.target.value };
                    })
                  }
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    value={postUserDetails.name}
                    size="small"
                    variant="outlined"
                    name="names"
                    label="Names"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, name: e.target.value };
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    value={postUserDetails.email}
                    size="small"
                    variant="outlined"
                    name="email"
                    label="Email"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, email: e.target.value };
                      })
                    }
                  />
                </Stack>

                <Stack direction={"row"} spacing={3}>
                  <TextField
                    fullWidth
                    value={postUserDetails.phone}
                    size="small"
                    variant="outlined"
                    name="mobile"
                    label="Mobile"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, phone: e.target.value };
                      })
                    }
                  />

                  {/* Mobile 2 */}
                  <TextField
                    fullWidth
                    value={postUserDetails.phone}
                    size="small"
                    variant="outlined"
                    name="mobile2"
                    label="Mobile 2"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, phone: e.target.value };
                      })
                    }
                  />
                </Stack>

             
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
              <Stack direction={"row"} spacing={3} marginTop={"-2rem"}>
                  <TextField
                    fullWidth
                    value={postUserDetails.address}
                    multiline
                    rows={3}
                    size="small"
                    variant="outlined"
                    name="address"
                    label="Address"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                        cursor: "pointer",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, address: e.target.value };
                      })
                    }
                  />
                </Stack>
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
                  sx={{ mb: 3, cursor: "pointer" }}
                >
                  Save
                </LoadingButton>
                <LoadingButton
                  color="error"
                  type="submit"
                  variant="contained"
                  size="medium"
                  sx={{ mb: 3, cursor: "pointer" }}
                  onClick={handleClose}
                >
                  Close
                </LoadingButton>
              </Div>
            </Div>
          )}
        </Box>
      </Modal>

      <Div
        sx={{
          textAlign: "center",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem",
          borderRadius: "5%",
        }}
      >
        <Typography
          variant={"h2"}
          mb={2}
          sx={{
            color: "#00bf63",
            fontWeight: "600",
            letterSpacing: "0.2rem",
            textDecoration: "underline",
            // marginLeft: " auto",
            width: "50%",
            background: "transparent",
            padding: "0.5rem",
            borderRadius: "15px",
            // boxShadow:
            //   "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
          }}
        >
          AGENT
        </Typography>
      </Div>

      <Grid container columnGap={2} overflow={"hidden"}>
        <Grid xs={12} lg={2}>
          <Card
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
              pt: 2,
              pb: 2,
              overflowX: { xs: "scroll", sm: "hidden" },
              background: "#ffffff36",

              // boxShadow:
              //   "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
            }}
          >
            <Stack
              direction={{ xs: "row", lg: "column" }}
              spacing={{ lg: 4, xs: 2 }}
            >
              <Tooltip
                title="Refresh"
                placement="top-start"
                arrow
                sx={{
                  width: "100px",
                  borderRadius: "5px",
                  background: "#00bf63",
                  color: "white",
                  "&:hover": {
                    background: "green",
                  },
                }}
              >
                <Fab
                  size="small"
                  color={activeButton === "Refresh" ? "success" : "info"}
                  aria-label="refresh"
                  onClick={() => handleButtonClick("Refresh")}
                >
                  <div
                    onClick={() => window.location.reload()}
                    style={{ display: "flex" }}
                  >
                    <RefreshIcon
                      sx={{
                        fontSize: "20px",
                        fontWeight: "bolder",
                      }}
                    />
                    <Typography sx={{ marginLeft: "0.7rem" }}>
                      {" "}
                      R
                      <span style={{ textTransform: "lowercase" }}>efresh</span>
                    </Typography>
                  </div>
                </Fab>
              </Tooltip>
              <Tooltip
                title="Search"
                placement="top-start"
                arrow
                sx={{
                  borderRadius: "5px",
                  background: "#00bf63",
                  color: "white",
                  "&:hover": {
                    background: "green",
                  },
                  width: "100px",
                }}
              >
                <Fab
                  size="small"
                  aria-label="search"
                  onClick={() => handleButtonClick("Search")}
                >
                  <div onClick={handleChange} style={{ display: "flex" }}>
                    <SearchIcon
                      sx={{ fontSize: "20px", fontWeight: "bolder" }}
                    />{" "}
                    <Typography sx={{ marginLeft: "0.7rem" }}>
                      S<span style={{ textTransform: "lowercase" }}>earch</span>
                    </Typography>
                  </div>
                </Fab>
              </Tooltip>
              <Tooltip
                title="Add Agent"
                placement="top-start"
                arrow
                sx={{
                  width: "100px",
                  borderRadius: "5px",
                  background: "#00bf63",
                  color: "white",
                  "&:hover": {
                    background: "green",
                  },
                }}
              >
                <Fab
                  size="small"
                  color={activeButton === "Add" ? "secondary" : "primary"}
                  aria-label="add"
                  onClick={() => handleButtonClick("Add")}
                  style={{ display: "flex" }}
                >
                  <div style={{ display: "flex" }}>
                    <PersonAdd
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bolder",
                        marginTop: "-0.1rem",
                      }}
                      onClick={() => handleOpen("Add")}
                    />{" "}
                    <Typography
                      sx={{ marginLeft: "0.2rem", fontSize: "0.8rem" }}
                      onClick={() => handleOpen("Add")}
                    >
                      A<span style={{ textTransform: "lowercase" }}>dd</span> A
                      <span style={{ textTransform: "lowercase" }}>gent</span>
                    </Typography>
                  </div>
                </Fab>
              </Tooltip>
              <Tooltip
                title="Export"
                placement="top-start"
                arrow
                sx={{
                  width: "100px",
                  borderRadius: "5px",
                  background: "#00bf63",
                  color: "white",
                  "&:hover": {
                    background: "green",
                  },
                }}
              >
                <Fab
                  size="small"
                  color={activeButton === "Export" ? "secondary" : "primary"}
                  aria-controls={openExport ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openExport ? "true" : undefined}
                  onClick={() => handleButtonClick("Export")}
                >
                  <div style={{ display: "flex" }} onClick={handleClickExport}>
                    <ArrowDropDownIcon
                      sx={{ fontSize: "20px", fontWeight: "bolder" }}
                    />
                    <Typography sx={{ marginLeft: "0.7rem" }}>
                      E<span style={{ textTransform: "lowercase" }}>xport</span>
                    </Typography>
                  </div>
                </Fab>
              </Tooltip>
            </Stack>
          </Card>
        </Grid>
        <Grid lg={9.7} xs={12}>
          <Slide
            direction="left"
            timeout={800}
            in={checked}
            mountOnEnter
            unmountOnExit
          >
            <Card sx={{ p: 3, mb: 2, background: "#ffffffa3" }}>
              <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
                <Stack direction={"row"} spacing={3} mb={2}>
                  <TextField
                    fullWidth
                    size="small"
                    // variant="outlined"
                    name="client"
                    label="Client"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="username"
                    label="User Name"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                  />
                  <FormControl fullWidth>
                    <InputLabel
                      id="status"
                      sx={{
                        color: "#00bf63",
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                          color: "#00bf63",
                        },
                      }}
                    >
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      size="small"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                          color: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                          color: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                          color: "#00bf63",
                        },
                      }}
                      name="status"
                      value={status}
                      label="Status"
                      onChange={handleChangeStatus}
                    >
                      <MenuItem value={" "} sx={{ color: "#00bf63" }}>
                        All
                      </MenuItem>
                      <MenuItem value={"ACTIVE"} sx={{ color: "#00bf63" }}>
                        Active
                      </MenuItem>
                      <MenuItem value={"INACTIVE"} sx={{ color: "#00bf63" }}>
                        In Active
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Slide>

              <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
                <Stack direction={"row"} spacing={3} mb={2}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="email"
                    label="Email"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="names"
                    label="Names"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="Supervisor"
                    label="Supervisor"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                  />
                </Stack>
              </Slide>
              <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
                <Stack direction={"row"} spacing={3} mb={2}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="Moblie "
                    label="Moblie "
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    name="Moblie 2"
                    label="Moblie 2"
                    InputLabelProps={{
                      style: {
                        color: "#00bf63",
                      },
                    }}
                    InputProps={{
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#00bf63",
                        },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    sx={{
                      width: "100%",
                      borderRadius: "5px",
                      background: "#00bf63",
                      color: "white",
                      marginLeft: "auto",
                      "&:hover": {
                        background: "green",
                      },
                    }}
                    onClick={handleSearchButtonClick}
                  >
                    Search
                  </Button>
                </Stack>
              </Slide>
            </Card>
          </Slide>
          <Box
            height={"65vh"}
            overflow={"auto"}
            bgcolor={"#ffffff7a"}
            boxShadow={" rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
            borderRadius={"15px"}
            padding={"3rem"}
            // boxShadow={
            //   "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;"
            // }
          >
            <Suspense fallback={<div>Loading...</div>}>
              {AgentDetails.agent?.map((agent, index) => (
                <Box key={index}>
                  <Card sx={{ mb: 1 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      sx={{ p: (theme) => theme.spacing(2, 1) }}
                    >
                      <Item
                        onClick={() => [
                          handleOpen("AgentDetails"),
                          setAgentsDetails((prev) => {
                            return {
                              ...prev,
                              id: agent.id,
                              avatar:
                                "https://devserver.ath.cx/media/avatar/" +
                                agent.Avatar,
                              active: agent.Active === "ACTIVE" ? true : false,
                              userName: agent.Username,
                              name: agent.Client,
                              description: agent.Description,
                              email: agent.Email,
                              phone: agent.Mobile,
                              address: agent.Address,
                              supervisor: agent.Supervisor,
                              date: agent["Created Time"],
                            };
                          }),
                        ]}
                        sx={{
                          flex: { xs: 1, md: "0 1 45%", lg: "0 1 35%" },
                          cursor: "pointer",
                        }}
                      >
                        <Stack direction={"row"} alignItems={"center"}>
                          <Item sx={{ ml: -1 }}>
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
                                  bgcolor: agent.Active
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
                                src={
                                  " https://devserver.ath.cx/media/avatar/" +
                                  agent.Avatar
                                }
                              />
                            </Badge>
                          </Item>
                          <Item>
                            <Typography variant={"h6"} mb={0.5}>
                              {`${agent.Username}`}
                            </Typography>
                            <Typography
                              variant={"body1"}
                              color="text.secondary"
                            >
                              {agent.Email}
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
                          {agent["Created Time"]}
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
                              {agent.Mobile}
                            </Typography>
                          </Item>
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
                          color={
                            agent.Active === "ACTIVE" ? "success" : "error"
                          }
                        >
                          {agent.Active}
                        </Button>
                      </Item>
                      <Item sx={{ ml: { xs: "auto", sm: 0 } }}>
                        <IconButton
                          aria-label="settings"
                          id="basic-button"
                          onClick={(e) => [
                            handleClick(e),
                            setPostUserDetails((prev) => {
                              return {
                                ...prev,
                                id: agent.id,
                                avatar:
                                  "https://devserver.ath.cx/media/avatar/" +
                                  agent.Avatar,
                                active:
                                  agent.Active === "ACTIVE" ? true : false,
                                userName: agent.Username,
                                name: agent.Names,
                                description: agent.Description,
                                email: agent.Email,
                                phone: agent.Mobile,
                                address: agent.Address,
                                agent: agent.Client,
                                supervisor: agent.Supervisors,
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
            <MenuItem
              onClick={() => handleOpen("Edit", "Menu")}
              sx={{ "&:hover": { background: "#2bf62b4a" } }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => handleOpen("Delete", "Menu")}
              sx={{ "&:hover": { background: "#eb46468f" } }}
            >
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
            <MenuItem
              onClick={() => handleExport("csv")}
              sx={{ "&:hover": { background: "#2bf62b4a" } }}
            >
              .csv
            </MenuItem>
            <MenuItem
              onClick={() => handleExport("xls")}
              sx={{ "&:hover": { background: "#2bf62b4a" } }}
            >
              .xls
            </MenuItem>
            <MenuItem
              onClick={() => handleExport("pdf")}
              sx={{ "&:hover": { background: "#2bf62b4a" } }}
            >
              .pdf
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Agent;
