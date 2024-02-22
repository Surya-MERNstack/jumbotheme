import React, { useEffect, useState } from "react";
import { recentActivities } from "./data";
import RecentActivityItem from "./RecentActivityItem";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import InputEmoji from "react-input-emoji";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from "react-toastify";

const RecentActivitiesList = ({
  buttonValue,
  setButtonValue,
  modelOpen,
  setModalOpen,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 2,
  };
  const getAuthCookie = localStorage.getItem("authCookie");
  const [authCookie, setAuthCookie] = useState(getAuthCookie.toString());
  const [getChannelsData, setChannelsData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = useState({
    client: "",
    number: "",
    subject: "",
  });
  const [channelsDetails, setChannelsDetails] = useState({
    id: "",
    imValue: "whatsapp",
    isvValue: "1",
    client: "51",
    number: "",
    apiKey: "",
    flowWise: "",
    EDNASubject: "",
    EDNAFooter: "",
    description: "",
  });
  const [value, setValue] = React.useState("1");
  const [imValue, setIMValue] = React.useState("whatsapp");
  const [clientValue, setClientValue] = useState("51");
  const [checkedAway, setCheckedAway] = React.useState(true);

  const handleChangeSwitch = (event) => {
    setCheckedAway(event.target.checked);
  };

  const handleChange = (event, value) => {
    if (value === "ISV") {
      setChannelsDetails((prev) => {
        return { ...prev, isvValue: event.target.value };
      });
    } else if (value === "IM") {
      setChannelsDetails((prev) => {
        return { ...prev, imValue: event.target.value };
      });
    } else {
      setChannelsDetails((prev) => {
        return { ...prev, client: event.target.value };
      });
    }
  };
  const handleClose = () => setModalOpen(false);

  const getChannels = async () => {
    await axios
      .get("https://devserver.ath.cx/admin/channels.jsp", {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${authCookie}`,
        },
      })
      .then((response) => {
        const data = response.data;
        const table = data.table;
        const result = table.results;

        setChannelsData(result);
        console.log("getChannels: " + JSON.stringify(response));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const postChannels = async () => {
    const postChannelDetails = {
      action: "ae",
      check: true,
      client: channelsDetails.client,
      number: channelsDetails.number,
      isv: channelsDetails.isvValue,
      "im type": channelsDetails.imValue,
      "api key": channelsDetails.apiKey,
      "flowiseai flow-id": channelsDetails.flowWise,
      "edna subject/gupshup app": channelsDetails.EDNASubject,
      "edna footer": channelsDetails.EDNAFooter,
      description: channelsDetails.description,
    };
    const upDateChannelDetails = {
      action: "ae",
      check: true,
      rk: channelsDetails.id,
      client: channelsDetails.client,
      number: channelsDetails.number,
      isv: channelsDetails.isvValue,
      "im type": channelsDetails.imValue,
      "api key": channelsDetails.apiKey,
      "flowiseai flow-id": channelsDetails.flowWise,
      "edna subject/gupshup app": channelsDetails.EDNASubject,
      "edna footer": channelsDetails.EDNAFooter,
      description: channelsDetails.description,
    };
    const deleteChannels = {
      action: "del",
      rk: channelsDetails.id,
    };
    const postDelete =
      buttonValue == "Add"
        ? postChannelDetails
        : buttonValue == "Edit"
        ? upDateChannelDetails
        : deleteChannels;
    await axios
      .post("https://devserver.ath.cx/admin/channels.jsp", postDelete, {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Authorization: `Bearer ${authCookie}`,
        },
      })
      .then((response) => {
        console.log("postChannels: " + JSON.stringify(response));
        if (response.data.success) {
          toast.success(response.data.success, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        handleClose();
        getChannels();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleIdData = (dataId) => {
    setChannelsDetails((prev) => {
      return { ...prev, id: dataId };
    });
  };
  const [emojiText, setEmojiText] = useState("");
  const [copyText,setCopyText] = useState('')
  const handleClickEmoji = (event) => {
    // setEmojiText(event.emoji);
  };
  useEffect(() => {
    getChannels();
  }, []);

  useEffect(() => {}, [buttonValue]);
  return (
    <React.Fragment>
      <ToastContainer />
      <Modal
        open={modelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {buttonValue === "Search" && (
            <Box p={1}>
              <Stack direction={"row"} spacing={2}>
                <TextField
                  fullWidth
                  value={searchValue.client}
                  size="small"
                  variant="outlined"
                  name="client"
                  label="Client"
                  onChange={(e) =>
                    setSearchValue((prev) => {
                      return { ...prev, client: e.target.value };
                    })
                  }
                />{" "}
                <TextField
                  fullWidth
                  value={searchValue.number}
                  size="small"
                  variant="outlined"
                  name="number"
                  label="Number"
                  onChange={(e) =>
                    setSearchValue((prev) => {
                      return { ...prev, number: e.target.value };
                    })
                  }
                />{" "}
                <TextField
                  fullWidth
                  value={searchValue.subject}
                  size="small"
                  variant="outlined"
                  name="subject"
                  label="Subject"
                  onChange={(e) =>
                    setSearchValue((prev) => {
                      return { ...prev, subject: e.target.value };
                    })
                  }
                />
              </Stack>
              <Box mt={2} display="flex" gap={2} justifyContent={"end"}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => setModalOpen(false)}
                >
                  Close
                </Button>
                <Button variant="contained" color="success" size="small">
                  Search
                </Button>
              </Box>
            </Box>
          )}
          {(buttonValue === "Add" || buttonValue === "Edit") && (
            <JumboScrollbar
              autoHeight
              autoHeightMin={456}
              autoHide
              autoHideDuration={200}
              autoHideTimeout={500}
            >
              <Box
                sx={{
                  p: 0,
                  width: { md: 700, xs: "100%" },
                  maxWidth: "100%",
                }}
              >
                <Typography variant="h4" fontSize={16} fontWeight={600}>
                  {buttonValue} Channel
                </Typography>

                <CardContent>
                  <Stack direction={{ md: "row", xs: "column" }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Client
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={channelsDetails.client}
                        label="Client"
                        size="small"
                        onChange={(e) => handleChange(e, "CLIENT")}
                      >
                        <MenuItem value={"51"}>Kolwaba</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      fullWidth
                      value={channelsDetails.number}
                      size="small"
                      variant="outlined"
                      name="number"
                      label="Number"
                      onChange={(e) =>
                        setChannelsDetails((prev) => {
                          return { ...prev, number: e.target.value };
                        })
                      }
                    />
                  </Stack>
                  <Stack
                    direction={{ md: "row", xs: "column" }}
                    spacing={2}
                    sx={{ mt: 2 }}
                  >
                    <FormControl fullWidth>
                      <FormLabel id="demo-controlled-radio-buttons-group">
                        ISV
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={channelsDetails.isvValue}
                        onChange={(e) => handleChange(e, "ISV")}
                      >
                        <FormControlLabel
                          value="0"
                          control={<Radio />}
                          label="EDNA"
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio />}
                          label="GPSHUP"
                        />
                        <FormControlLabel
                          value="2"
                          control={<Radio />}
                          label="KARIX"
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormControl fullWidth>
                      <FormLabel id="demo-controlled-radio-buttons-group">
                        IM Type
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={channelsDetails.imValue}
                        onChange={(e) => handleChange(e, "IM")}
                      >
                        <FormControlLabel
                          value="whatsapp"
                          control={<Radio />}
                          label="Whatsapp"
                        />
                        <FormControlLabel
                          value="viber"
                          control={<Radio />}
                          label="Viber"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                  <Stack
                    sx={{ mt: 2 }}
                    direction={{ md: "row", xs: "column" }}
                    spacing={2}
                  >
                    <TextField
                      fullWidth
                      value={channelsDetails.apiKey}
                      size="small"
                      variant="outlined"
                      name="apiKey"
                      label="Api Key"
                      onChange={(e) =>
                        setChannelsDetails((prev) => {
                          return { ...prev, apiKey: e.target.value };
                        })
                      }
                    />
                    <TextField
                      fullWidth
                      value={channelsDetails.flowWise}
                      size="small"
                      variant="outlined"
                      name="flowwiseai"
                      label="FlowiseAI Flow-Id"
                      onChange={(e) =>
                        setChannelsDetails((prev) => {
                          return { ...prev, flowWise: e.target.value };
                        })
                      }
                    />
                  </Stack>
                  <Stack
                    sx={{ mt: 2 }}
                    direction={{ md: "row", xs: "column" }}
                    spacing={2}
                  >
                    <TextField
                      fullWidth
                      value={channelsDetails.EDNASubject}
                      size="small"
                      variant="outlined"
                      name="EDNASubject"
                      label="EDNA Subject/GUPSHUP APP"
                      onChange={(e) =>
                        setChannelsDetails((prev) => {
                          return { ...prev, EDNASubject: e.target.value };
                        })
                      }
                    />
                    <TextField
                      fullWidth
                      value={channelsDetails.EDNAFooter}
                      size="small"
                      variant="outlined"
                      name="EDNAFooter"
                      label="EDNA Footer"
                      onChange={(e) =>
                        setChannelsDetails((prev) => {
                          return { ...prev, EDNAFooter: e.target.value };
                        })
                      }
                    />
                  </Stack>
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    value={channelsDetails.description}
                    size="small"
                    multiline
                    rows={3}
                    variant="outlined"
                    name="description"
                    label="Description"
                    onChange={(e) =>
                      setChannelsDetails((prev) => {
                        return { ...prev, description: e.target.value };
                      })
                    }
                  />
                  <Box mt={2} display={"flex"} justifyContent={"end"}>
                    <Stack direction={"row"} spacing={2}>
                      <Button
                        size="medium"
                        variant="contained"
                        color="error"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                      <Button
                        size="medium"
                        variant="contained"
                        color="success"
                        onClick={postChannels}
                      >
                        {buttonValue === "Add" ? "Add" : "Update"}
                      </Button>
                    </Stack>
                  </Box>
                </CardContent>
              </Box>
            </JumboScrollbar>
          )}
          {buttonValue === "Delete" && (
            <Box p={1}>
              <Typography fontSize={16}>
                Are you sure you want to delete this?{" "}
              </Typography>
              <Box mt={2} display={"flex"} justifyContent={"end"} gap={2}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={postChannels}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          )}

          {buttonValue === "Callback"&&(
            <Box p={1} width={400}>
                <Typography variant="h4" fontWeight={500}>Callback Url</Typography>

                <TextField size="small" fullWidth value={copyText} onChange={(e)=> setCopyText(e.target.value)}/>
                <Box mt={2}>

            
                <CopyToClipboard text={copyText}
          // onCopy={() => this.setState({copied: true})}
          >
            <Box margin={"auto"} width={"100%"} display={"flex"} justifyContent={"center"}>

        
          <Button variant="contained" color="success" size="small">Copy to clipboard </Button>
          </Box>
        </CopyToClipboard>
        </Box>
            </Box>
          )}

          {(buttonValue === "Away" || buttonValue === "Greeting") && (
            <Box sx={{ width: 400, p: 1 }}>
              <Typography variant="h4" fontWeight={600}>
                Channels
              </Typography>

              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={checkedAway}
                      onChange={handleChangeSwitch}
                      color={checkedAway === true ? "success" : "warning"}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Enable"
                />
                <Typography variant="h6" fontWeight={500} mt={2}>
                 {buttonValue === "Away" ? "Away" : "Greetings"}  Message
                </Typography>
                <InputEmoji
                  value={emojiText}
                  onChange={setEmojiText}
                  cleanOnEnter
                  onEnter={handleClickEmoji}
                  placeholder="Type a message"
                />

                <Box
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"end"}
                  gap={2}
                  mt={2}
                >
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => setModalOpen(false)}
                  >
                    Close
                  </Button>
                  <Button size="small" variant="contained" color="success">
                    Save
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
      {getChannelsData?.map((item, index) => (
        <RecentActivityItem
          recentItem={item}
          key={index}
          setButtonValue={setButtonValue}
          onDataId={handleIdData}
          setModalOpen={setModalOpen}
          setChannelsDetails={setChannelsDetails}
        />
      ))}
    </React.Fragment>
  );
};

export default RecentActivitiesList;
