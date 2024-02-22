import React, { Suspense, useEffect, useState } from "react";
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
import Badge from "@mui/material/Badge";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ClientFullDetails from "./clientFullDetails";
import axios from "axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
// import * as XLSX from "xlsx";
// import { parse } from "json2cs
import jsPDF from "jspdf";
import "jspdf-autotable";

const Item = styled(Span)(({ theme }) => ({
  padding: theme.spacing(0, 1),
}));
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

const Clients = () => {
  const getAuthCookie = localStorage.getItem("authCookie");
  const [value, setValue] = React.useState(0);

  // const [authCookie, setAuthCookie] = useState(getAuthCookie.toString());

  const [authCookie, setAuthCookie] = useState(
    getAuthCookie ? getAuthCookie.toString() : ""
  );

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  //Status Dropdown
  const [status, setStatus] = React.useState(" ");
  const [billing, setBilling] = React.useState(" ");
  const [payment, setPayment] = React.useState({
    amount: 0,
    type: 0,
    memo: "",
  });
  const [paymentType, setPaymentType] = React.useState("PREPAID");
  const [balance, setBalance] = React.useState(" ");
  const [getClientDetails, setClientDetails] = useState({});
  const [amountType, setAmountType] = React.useState(">=");
  const handleChangeStatus = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    if (name === "status") {
      setStatus(value);
    } else if (name === "billingPlan") {
      setBilling(value);
    } else if (name === "paymentType") {
      setPaymentType(value);
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
  const [clientDetails, setClientsDetails] = React.useState({
    header: [],
    clients: [],
  });
  const [paymentDetails, setPaymentDetails] = React.useState({
    header: [],
    payment: [],
  });
  const [billingPlan, setBillingPlan] = React.useState({
    header: [],
    billingPlans: [],
  });

  const handleChange = () => {
    setChecked((prev) => !prev);
  };
  const getPillingPlans = async () => {
    await axios
      .get("https://devserver.ath.cx/admin/billingplans.jsp ", {
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
        const billingPlan = table.results;

        billingPlan?.map((plan, i) => {
          var id = plan.id;
          if (i == 0) {
            setBilling(id);
          }
        });
        setBillingPlan((prev) => {
          return { ...prev, header: header, billingPlans: billingPlan };
        });
        console.log(JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const userList = async () => {
    await axios
      .get("https://devserver.ath.cx/admin/clients.jsp ", {
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
        const clientLists = table.results;
        setClientsDetails((prev) => {
          return { ...prev, header: header, clients: clientLists };
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
      description: postUserDetails.description,
      username: postUserDetails.userName,
      password: postUserDetails.password,
      active: postUserDetails.active === true ? "1" : "0",
      names: postUserDetails.name,
      email: postUserDetails.email,
      "cell phone": postUserDetails.phone,
      address: postUserDetails.address,
      "agent limit (0 - unlimited)": postUserDetails.agent,
      "supervisor limit (0 - unlimited)": postUserDetails.supervisor,
      overdraft: postUserDetails.overDraft,
      "minimum balance": postUserDetails.minimumBalance,
      url: postUserDetails.url,
      "billing plan": billing,
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
      "agent limit (0 - unlimited)": postUserDetails.agent,
      "supervisor limit (0 - unlimited)": postUserDetails.supervisor,
      overdraft: postUserDetails.overDraft,
      "minimum balance": postUserDetails.minimumBalance,
      url: postUserDetails.url,
      "billing plan": billing,
    };
    const deleteUserDetails = { action: "del", rk: postUserDetails.id };
    const postData =
      type === "Add" ? AddUser : type === "Edit" ? EditUser : deleteUserDetails;

    console.log("postData: ", JSON.stringify(postData));
    await axios
      .post("https://devserver.ath.cx/admin/clients.jsp", postData, {
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

  const getPayment = async () => {
    const postPaymentDetails = {
      py: postUserDetails.id,
    };

    await axios
      .post("https://devserver.ath.cx/admin/pay.jsp", postPaymentDetails, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${authCookie}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const tablex = data.tablex;
        const table = tablex.table;
        const dataResults = table.results;
        setPaymentDetails((prev) => {
          return { ...prev, payment: dataResults };
        });
        console.log("getPayment: " + JSON.stringify(table));
      })
      .catch((error) => {
        console.log(error);
      });
  };



  const handleExport = (option) => {
    if (option === "pdf") {
      exportToPDF();
    } else {
      console.warn("Unsupported export option");
    }
  };


  const exportToPDF = () => {
    const pdf = new jsPDF();
    pdf.text("Client Details", 14, 15);

    const columns = [
      "Active",
      "username",
      "Email",
      "Plan",
      "Names",
      "Overdraft",
      "Address",
      "Description",
    ];

    // const rows = clientDetails.clients?.map((data) => [
    //   data.active.toLowerCase(),
    //   data.username,
    //   data.email,
    //   data.agents,
    //   data.plan,
    //   data.names,
    //   data.overdraft,
    //   data.address,
    //   data.description,
    // ]);

    pdf.autoTable({
      head: [columns],
      body: [],
      startY: 30,
    });

    pdf.save("client_data_export.pdf");
  };


  

  useEffect(() => {
    userList();
    getPillingPlans();
    // getPayment();
  }, []);

  useEffect(() => {
    if (postUserDetails.id) {
      // getApiKey();
      getPayment();
    }
  }, [postUserDetails]);

  const [search, setSearch] = useState(false);
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
                : viewMode === "ClientDetails"
                ? { xs: "90vw", md: "30vw" }
                : 400,
            minHeight: viewMode === "Pay" ? "40vh" : "auto",
          }}
        >
          {viewMode === "ClientDetails" && (
            <ClientFullDetails clientDetails={getClientDetails} />
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
                  Clients
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Info" {...a11yProps(0)} />
                    <Tab label="Personal" {...a11yProps(1)} />
                    <Tab label="Limits" {...a11yProps(2)} />
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

                <Stack direction={"row"} spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    value={postUserDetails.userName}
                    variant="outlined"
                    name="userName"
                    label="User Name"
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
                    onChange={(e) =>
                      setPostUserDetails((prev) => {
                        return { ...prev, password: e.target.value };
                      })
                    }
                  />
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel id="billingPlan-label">Billing Plan</InputLabel>
                    <Select
                      labelId="billingPlan-label"
                      size="small"
                      id="billingPlan"
                      name="billingPlan"
                      value={billing}
                      label="Billing Plan"
                      onChange={handleChangeStatus}
                    >
                      {billingPlan.billingPlans.map((billing, i) => (
                        <MenuItem value={billing.id} key={i}>
                          {billing.Name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    value={postUserDetails.url}
                    size="small"
                    variant="outlined"
                    name="url"
                    label="URL"
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
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, description: e.target.value };
                    })
                  }
                />
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <TextField
                  fullWidth
                  value={postUserDetails.name}
                  size="small"
                  variant="outlined"
                  name="names"
                  label="Names"
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
              <CustomTabPanel value={value} index={2}>
                <TextField
                  fullWidth
                  value={postUserDetails.overDraft}
                  size="small"
                  variant="outlined"
                  name="overDraft"
                  label="Over Draft"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, overDraft: e.target.value };
                    })
                  }
                />
                <TextField
                  fullWidth
                  value={postUserDetails.minimumBalance}
                  size="small"
                  variant="outlined"
                  name="minBalance"
                  label="Minimum Balance"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, minimumBalance: e.target.value };
                    })
                  }
                />
                <TextField
                  fullWidth
                  value={postUserDetails.agent}
                  size="small"
                  variant="outlined"
                  name="agent"
                  label="Agent Limit (0 - Unlimited)"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, agent: e.target.value };
                    })
                  }
                />

                <TextField
                  fullWidth
                  value={postUserDetails.supervisor}
                  size="small"
                  variant="outlined"
                  name="supervisor"
                  label="Supervisor Limit (0 - Unlimited)"
                  onChange={(e) =>
                    setPostUserDetails((prev) => {
                      return { ...prev, supervisor: e.target.value };
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

          {viewMode === "Pay" && (
            <Box p={2}>
              <Grid container columnGap={2}>
                <Grid sm={12} lg={5.5}>
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight={"bold"}
                      color={"black"}
                    >
                      Payment
                    </Typography>

                    <Stack direction={"row"} spacing={2}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        name="amount"
                        label="Amount "
                        onChange={(e) =>
                          setPayment((prev) => {
                            return { ...prev, amount: e.target.value };
                          })
                        }
                      />
                      <FormControl fullWidth sx={{ mt: 3 }}>
                        <InputLabel id="demo-simple-select-label">
                          Payment Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          size="small"
                          id="paymentType"
                          name="paymentType"
                          value={payment.type}
                          label="Payment Type"
                          onChange={(e) =>
                            setPayment((prev) => {
                              return { ...prev, type: e.target.value };
                            })
                          }
                        >
                          <MenuItem value={0}>Prepaid</MenuItem>
                          <MenuItem value={1}>Return</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>

                    <TextField
                      sx={{ mt: 3 }}
                      fullWidth
                      variant="outlined"
                      multiline
                      rows={4}
                      label="Memo"
                      name="memo"
                      value={payment.memo}
                      onChange={(e) =>
                        setPayment((prev) => {
                          return { ...prev, memo: e.target.value };
                        })
                      }
                    />

                    <LoadingButton
                      sx={{ mt: 2, float: "right" }}
                      // onClick={postPayment}
                      type="submit"
                      variant="contained"
                      color="success"
                    >
                      Pay
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid lg={6.2} xs={12}>
                  {search && (
                    <Stack spacing={2} direction={"row"} sx={{ mb: 2 }}>
                      <TextField
                        fullWidth
                        size="small"
                        type="date"
                        label="Pay Date"
                      />
                      <FormControl fullWidth>
                        <InputLabel size="small" id="demo-simple-select-label">
                          Amount
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          size="small"
                          id="amount"
                          name="amount"
                          value={amountType}
                          label="Amount"
                          onChange={(e) => setAmountType(e.target.value)}
                        >
                          <MenuItem value={">="}> {">="} </MenuItem>
                          <MenuItem value={"="}> =</MenuItem>
                          <MenuItem value={"<="}>{"<="}</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel size="small" id="demo-simple-select-label">
                          Payment Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          size="small"
                          id="paymentType"
                          name="paymentType"
                          value={amountType}
                          label="Payment Type"
                          onChange={(e) => setAmountType(e.target.value)}
                        >
                          <MenuItem value={"PREPAID"}>Prepaid </MenuItem>
                          <MenuItem value={"RETURN"}>Return</MenuItem>
                        </Select>
                      </FormControl>
                      <Div sx={{ display: "flex", gap: 1, width: "100%" }}>
                        <TextField
                          fullWidth
                          size="small"
                          type="text"
                          label="Memo"
                        />
                        <IconButton size="small">
                          <SearchIcon sx={{ fontSize: "18px" }} />
                        </IconButton>
                      </Div>
                    </Stack>
                  )}
                  <Box display={"flex"} justifyContent={"end"} mb={2}>
                    <Stack
                      direction={"row"}
                      spacing={2}
                      sx={{ float: "right" }}
                    >
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<RefreshIcon />}
                        onClick={postUser}
                        sx={{ fontSize: 10 }}
                      >
                        Refresh
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={() => setSearch(!search)}
                        sx={{ fontSize: 10 }}
                      >
                        Search
                      </Button>
                      <Button
                        size="small"
                        aria-label="settings"
                        id="basic-button"
                        aria-controls={openExport ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openExport ? "true" : undefined}
                        onClick={handleClickExport}
                        variant="contained"
                        endIcon={<ArrowDropDownIcon />}
                        startIcon={<GetAppIcon />}
                        sx={{ fontSize: 10 }}
                      >
                        Export
                      </Button>
                    </Stack>
                  </Box>
                  <Box height={400} overflow={"auto"}>
                    {paymentDetails.payment.length > 0 ? (
                      paymentDetails.payment?.map((payment, i) => (
                        <Card sx={{ p: 3, mb: 1 }} key={i}>
                          <Stack direction={"row"} spacing={2}>
                            <Typography>{payment["Pay Time"]}</Typography>
                            <Typography>{payment["Amount"]}</Typography>
                            <Typography>{payment["Pay Type"]}</Typography>
                            <Typography>{payment["Balance"]}</Typography>
                            <Typography>{payment["Memo"]}</Typography>
                          </Stack>
                        </Card>
                      ))
                    ) : (
                      <Typography textAlign={"center"} fontSize={"17px"}>
                        No Result Found
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {viewMode === "Api" && (
            <Box>
              <Typography variant="h6" fontWeight={"bold"} color={"black"}>
                Api Key
              </Typography>
              <TextField fullWidth value={apiKey} />
              <Box pt={3} display={"flex"} justifyContent={"end"}>
                <CopyToClipboard
                  text={apiKey}
                  onCopy={() => [
                    toast.success("Api Key Copied Successfully", {
                      position: toast.POSITION.TOP_RIGHT,
                    }),
                  ]}
                >
                  <Box
                    margin={"auto"}
                    width={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ fontSize: "12px", textTransform: "capitalize" }}
                    >
                      Copy to clipboard{" "}
                    </Button>
                  </Box>
                </CopyToClipboard>

                <Box display={"flex"} flexDirection={"row"} gap={2}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "12px", textTransform: "capitalize" }}
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    sx={{ fontSize: "12px", textTransform: "capitalize" }}
                    // onClick={getApiKey}
                  >
                    Regenerate
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
      <Typography variant={"h2"} mb={3}>
        Clients
      </Typography>
      <Grid container columnGap={1}>
        <Grid xs={12} lg={0.7}>
          <Card
            sx={{
              mb: 3,
              display: "flex",
              justifyContent: "center",
              pt: 2,
              pb: 2,
            }}
          >
            <Stack
              direction={{ xs: "row", lg: "column" }}
              spacing={{ lg: 4, xs: 2 }}
            >
              <Tooltip title="Refresh" placement="top-start" arrow>
                <Fab size="small" color="primary" aria-label="refresh">
                  <RefreshIcon sx={{ fontSize: "16px" }} />
                </Fab>
              </Tooltip>
              <Tooltip title="Search" placement="top-start" arrow>
                <Fab
                  size="small"
                  onClick={handleChange}
                  color="primary"
                  aria-label="search"
                >
                  <SearchIcon sx={{ fontSize: "16px" }} />
                </Fab>
              </Tooltip>
              <Tooltip title="Add Client" placement="top-start" arrow>
                <Fab
                  size="small"
                  onClick={() => handleOpen("Add")}
                  color="primary"
                  aria-label="add"
                >
                  <AddIcon sx={{ fontSize: "16px" }} />
                </Fab>
              </Tooltip>
              <Tooltip title="Export" placement="top-start" arrow>
                <Fab
                  size="small"
                  aria-controls={openExport ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openExport ? "true" : undefined}
                  onClick={handleClickExport}
                  color="primary"
                  aria-label="add"
                >
                  <ArrowDropDownIcon sx={{ fontSize: "16px" }} />
                </Fab>
              </Tooltip>
            </Stack>
          </Card>
        </Grid>

        <Grid lg={11} xs={12}>
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
                    id="status"
                    name="status"
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Balance</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    size="small"
                    id="demo-simple-select"
                    value={balance}
                    label="Status"
                    onChange={(e) => setBalance(e.target.value)}
                  >
                    <MenuItem value={""}> {JSON.stringify(">=")}</MenuItem>
                    <MenuItem value={"="}>==</MenuItem>
                    <MenuItem value={"<="}> {"<="} </MenuItem>
                  </Select>
                </FormControl>
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
                  name="address"
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
              {clientDetails.clients?.map((client, index) => (
                <Box key={index}>
                  <Card sx={{ mb: 1 }}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      sx={{ p: (theme) => theme.spacing(2, 1) }}
                    >
                      <Item
                        onClick={() => [
                          handleOpen("ClientDetails"),
                          setClientDetails((prev) => {
                            return {
                              ...prev,
                              id: client.id,
                              avatar:
                                "https://devserver.ath.cx/media/avatar/" +
                                client.avatar,
                              active: client.active === "ACTIVE" ? true : false,
                              userName: client.username,
                              password: client.Password,
                              name: client.names,
                              description: client.description,
                              email: client.email,
                              phone: client.mobile,
                              address: client.address,
                              agent: client.agents,
                              supervisor: client.supervisors,
                              overDraft: client.overdraft,
                              plan: client.plan,
                              balance: client.balance,
                              date: client["created_time"],
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
                                  bgcolor: client.active
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
                                  client.avatar
                                }
                              />
                            </Badge>
                          </Item>
                          <Item>
                            <Typography
                              variant={"h6"}
                              mb={0.5}
                            >{`${client.username}`}</Typography>
                            <Typography
                              variant={"body1"}
                              color="text.secondary"
                            >
                              {client.email}
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
                          {client["created_time"]}
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
                              {client.mobile}
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
                          color={
                            client.active === "ACTIVE" ? "success" : "error"
                          }
                        >
                          {client.active}
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
                                id: client.id,
                                avatar:
                                  "https://devserver.ath.cx/media/avatar/" +
                                  client.avatar,
                                active:
                                  client.active === "ACTIVE" ? true : false,
                                userName: client.username,
                                password: client.Password,
                                name: client.names,
                                description: client.description,
                                email: client.email,
                                phone: client.mobile,
                                address: client.address,
                                agent: client.agents,
                                supervisor: client.supervisors,
                                overDraft: client.overdraft,
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
            <MenuItem onClick={() => handleOpen("Pay", "Menu")}>
              Payment
            </MenuItem>
            <MenuItem onClick={() => handleOpen("Api", "Menu")}>
              Api Key
            </MenuItem>
            <MenuItem onClick={() => handleOpen("Billing", "Menu")}>
              Billing
            </MenuItem>
            <MenuItem onClick={() => handleOpen("Delete", "Menu")}>
              {" "}
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
            {/* <MenuItem onClick={() => handleExport("csv")}>.csv</MenuItem> */}
            {/* <MenuItem onClick={() => handleExport("xls")}>.xls</MenuItem> */}
            <MenuItem   onClick={() => handleExport("pdf")}>.pdf</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Clients;
