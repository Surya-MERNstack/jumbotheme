import React from "react";
import {
  alpha,
  Avatar,
  AvatarGroup,
  ListItemAvatar,
  ListItemText,
  Typography,
  Stack,
  Grid,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
// import moment from "moment";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HandshakeIcon from "@mui/icons-material/Handshake";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const RecentActivityItem = ({
  recentItem,
  onDataId,
  setButtonValue,
  setModalOpen,
  setChannelsDetails,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const openMenu = Boolean(anchorEl);

  const handleOpen = (event) => {
    setButtonValue(event);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <React.Fragment>
      <List
        sx={{
          p: (theme) => theme.spacing(0, 0, 1),
        }}
      >
        {
          <ListItemButton
            component={"li"}
            alignItems={"flex-start"}
            disableRipple
            sx={{
              px: 3,
              transition: "all 0.2s",

              "&:hover": {
                boxShadow: `0 3px 10px 0 ${alpha("#000", 0.2)}`,
                transform: "translateY(-4px)",
              },
            }}
          >
            <Grid container>
              <Grid xs={12} md={4} display={"flex"}>
                <ListItemAvatar sx={{ pr: 2 }}>
                  <Avatar
                    alt={recentItem.header}
                    src={
                      "https://devserver.ath.cx/media/avatar/" + recentItem.icon
                    }
                    sx={{ width: "50px", height: "50px" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      fontWeight={"bold"}
                      fontSize={16}
                      color={"#1782e9"}
                    >
                      {recentItem.number}
                    </Typography>
                  }
                  secondary={
                    <Stack direction={"column"} spacing={0.5}>
                      <Typography fontWeight={600}>
                        {recentItem.header}
                      </Typography>
                      <Typography>{recentItem.subject}</Typography>
                      {/* <AvatarGroup variant={"rounded"} spacing={0} max={3} sx={{pt: 1}}>
                                                {
                                                    item?.mediaList.map((media, index) => (
                                                        <Avatar
                                                            sx={{
                                                                mr: .5,
                                                                borderRadius: '6px'
                                                            }}
                                                            key={index}
                                                            src={media.mediaUrl}
                                                        />
                                                    ))
                                                }
                                            </AvatarGroup> */}
                    </Stack>
                  }
                />
              </Grid>
              <Grid xs={12} md={8}>
                <Stack direction={"row"} >
                  <ListItemAvatar sx={{ pr: 0, }} >
                    <AccessTimeIcon sx={{ color: "#3ff0b8" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction={"column"} spacing={0}>
                        <Typography
                          
                          fontWeight={400}
                          fontSize={13}
                          color={"black"}
                        >
                          Availability
                        </Typography>
                      
                          <Typography
                          fontWeight={400}
                          fontSize={10}
                          color={"#009c4f"}
                        >
                          Change
                          </Typography>
                   
                      </Stack>
                    }
                    secondary={
                      <Stack direction={"column"} spacing={0.5}>
                        <Typography fontWeight={600}>Closed</Typography>
                      </Stack>
                    }
                  />
                  <ListItemAvatar sx={{ pr: 0 }}>
                    <HandshakeIcon sx={{ color: "#050ea3" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction={"column"} spacing={0}>
                        <Typography
                          fontWeight={400}
                          fontSize={13}
                          color={"black"}
                        >
                          Greeting Message
                        </Typography>
                        <Typography
                          fontWeight={400}
                          fontSize={10}
                          color={"#009c4f"}
                          onClick={()=> [setModalOpen(true), setButtonValue("Greeting")]}
                        >
                          Change
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Stack direction={"column"} spacing={0.5}>
                        <Typography fontWeight={600}>Closed</Typography>
                      </Stack>
                    }
                  />{" "}
                  <ListItemAvatar sx={{ pr: 0 }}>
                    <DoNotTouchIcon sx={{ color: "#c503e8" }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Stack direction={"column"} spacing={0}>
                        <Typography
                          fontWeight={400}
                          fontSize={13}
                          color={"black"}
                        >
                          Away Message
                        </Typography>
                        <Typography
                          fontWeight={400}
                          fontSize={10}
                          color={"#009c4f"}
                          onClick={()=> [setModalOpen(true), setButtonValue("Away")]}

                        >
                          Change
                        </Typography>
                      </Stack>
                    }
                    secondary={
                      <Stack direction={"column"} spacing={0.5}>
                        <Typography fontWeight={600}>Closed</Typography>
                      </Stack>
                    }
                  />
                </Stack>
              </Grid>
            </Grid>
            <IconButton onClick={(e) => handleClick(e)}>
              <MoreHorizIcon />
            </IconButton>
          </ListItemButton>
        }
      </List>
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
          onClick={() => [
            handleOpen("Edit", "Menu"),
            onDataId(recentItem.id),
            setModalOpen(true),
            setChannelsDetails((prev) => {
              return { ...prev,id:recentItem.id,number:recentItem.number,
                EDNASubject:recentItem.subject, 
               };
            }),
          ]}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={() => [handleOpen("Callback", "Menu"), setModalOpen(true),]}>
          Callback URL
        </MenuItem>

        <MenuItem
          onClick={() => [
            handleOpen("Delete", "Menu"),
            onDataId(recentItem.id),
            setModalOpen(true),
          ]}
        >
          {" "}
          Delete
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};
/* Todo :- recent activity item props */
export default RecentActivityItem;
