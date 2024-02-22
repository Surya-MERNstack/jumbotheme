import React, { useRef } from "react";
import { useMutation } from "react-query";
import Div from "@jumbo/shared/Div";
import {
  IconButton,
  Badge,
  Popover,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  Typography,
  ListItemButton
} from "@mui/material";
import useChatApp from "../../hooks/useChatApp";
import { chatService } from "../../../../../services/chat-services";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InputEmoji from "react-input-emoji";
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import QuickreplyIcon from '@mui/icons-material/Quickreply';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
const ActiveConversationFooter = () => {
  const {
    activeConversation,
    activeConversationRef,
    favoriteConversationsListRef,
    recentConversationsListRef,
    contactConversationsListRef,
  } = useChatApp();
  const [message, setMessage] = React.useState("");
  const [emojiText, setEmojiText] = React.useState("");
  const handleClickEmoji = (event) => {
    // setEmojiText(event.emoji);
  };
  const addMessageMutation = useMutation(chatService.addConversationMessage, {
    onSuccess: () => {
      activeConversationRef?.current?.refresh();
      favoriteConversationsListRef?.current?.refresh();
      recentConversationsListRef?.current?.refresh();
      contactConversationsListRef?.current?.refresh();
    },
  });
  const onSendMessage = (event) => {
    const message = event.target.value.trim();
    if (event.key === "Enter" && message) {
      addMessageMutation.mutate({
        conversationID: activeConversation.id,
        message: message,
      });
      setMessage("");
    }
  };
  const fileInputRef = useRef(null);

  const handleIconButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    // Handle the selected file here
    const selectedFile = event.target.files[0];
    console.log("Selected File:", selectedFile);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

const sendQuickReplayDialog = {
    
}  
  return (
    <Div
      sx={{
        display: "flex",
        alignItems: "center",
        p: (theme) => theme.spacing(2, 2),
        borderTop: 1,
        borderTopColor: "divider",
        bgcolor: (theme) => theme.palette.action.hover,
      }}
    >
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        sx={{
          "& .MuiPaper-root": {
            border: 1,
            borderColor: "divider",
          },
        }}
      >
        <Div sx={{ p: 2, pb: 2, minWidth: 276 }}>
          <Div
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Div >
             
              <Typography variant={"body1"} color={"text.secondary"}>
                Perform chat actions
              </Typography>
            </Div>
          </Div>
          <List disablePadding>
         
            <Divider component="li" />
            <ListItemButton disablePadding sx={{p:0}} onClick={handleIconButtonClick}>

            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <SendToMobileIcon sx={{color:"#9417ee"}} />
              </ListItemIcon>
              <ListItemText>
                <Typography variant={"h5"} fontSize={14} color={"text.primary"} mb={0}>
                  Send Files
                </Typography>
              </ListItemText>
            </ListItem>
            </ListItemButton>

            <Divider component="li" />
            <ListItemButton disablePadding sx={{p:0}}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <QuickreplyIcon sx={{color:"#9417ee"}}/>
              </ListItemIcon>
              <ListItemText>
                <Typography variant={"h5"} fontSize={14} color={"text.primary"} mb={0}>
                  Send Quick Replay
                </Typography>
              </ListItemText>
            </ListItem>
            </ListItemButton>
            <Divider component="li" />
            <ListItemButton disablePadding sx={{p:0}}>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <AttachEmailIcon sx={{color:"#9417ee"}}/>
              </ListItemIcon>
              <ListItemText>
                <Typography variant={"h5"} fontSize={14} color={"text.primary"} mb={0}>
                  Send BIC Template
                </Typography>
              </ListItemText>
            </ListItem>
            </ListItemButton>
            <Divider component="li" />
          </List>
        </Div>
      </Popover>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
      <IconButton onClick={handleClick}  aria-describedby={id}>
        <AttachFileIcon color="secondary" sx={{ width: 32, height: 32 }} />
      </IconButton>

      <InputEmoji
        style={{ padding: 0, bottom: 10 }}
        value={emojiText}
        onChange={setEmojiText}
        cleanOnEnter
        onEnter={handleClickEmoji}
        placeholder="Type a message"
      />

      <IconButton onClick={onSendMessage}>
        <SendIcon color="success" sx={{ width: 32, height: 32 }} />
      </IconButton>
    </Div>
  );
};

export default ActiveConversationFooter;
