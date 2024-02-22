import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {IconButton, ListItemIcon, ListItemText, Menu, MenuItem,Button,Typography} from "@mui/material";
import {MoreHorizOutlined} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Div from '@jumbo/shared/Div';
import ActiveNotes from 'app/pages/apps/chat/components/ActiveConversation/ActiveNotes';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const JumboDdMenu = ({icon, menuItems, onClickCallback}) => {
    const [menuEl, setMenuEl] = React.useState(null);
    const openMenu = Boolean(menuEl);
    const [openDialog,setOpenDialog] = useState(false);
    const [openAddDialogA, setOpenAddDialogA] = React.useState(false);
    const [text, setText] = React.useState("");

    const handleMenuItemClick = (option) => {
      const {title,slug} = option;
    
      if(title !=="Close"){
        setText(slug)
        setOpenAddDialogA(true);
      }
      if(title === "Close"){
        setOpenDialog(true)
      }
        setMenuEl(null);
        if (typeof onClickCallback === "function")
            onClickCallback(option);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false)

    }
    const DialogComponent = () => {
        return (
          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <Div sx={{ width: 500 }}>
              <Div sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                <Typography fontSize={16} fontWeight={700}>
                  {"Why Are You Closing"}{" "}
                </Typography>
           
              </Div>
              <DialogContent>
                <Div sx={{ display: "flex", gap: 0.5 }}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    size="small"
                    label=""
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                
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
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleCloseDialog}
                >
                  Close
                </Button>
                
              </DialogActions>
            </Div>
          </Dialog>
        );
      };
    return (
        <>
    <ActiveNotes openAddDialogA={openAddDialogA} setOpenAddDialogA={setOpenAddDialogA} text={text}/>  
        <DialogComponent/>
            <IconButton
                sx={{
                    color: 'inherit'
                }}
                onClick={(e) => {
                    setMenuEl(e.currentTarget);
                    e.stopPropagation();
                }} >
                {
                    icon ? icon : <MoreHorizOutlined/>
                }
            </IconButton>
            <Menu open={openMenu}
                  anchorEl={menuEl}
                  onClose={() => setMenuEl(null)}

            >
                {menuItems.map((option, index) => (
                    <MenuItem key={index} 
                              onClick={(e) => {
                                  handleMenuItemClick(option);
                                  e.stopPropagation();
                              }}
                    >
                        {
                            option.icon &&
                            <ListItemIcon>{option.icon}</ListItemIcon>
                        }

                        <ListItemText>{option.title}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </>

    );
};

JumboDdMenu.propTypes = {
    icon: PropTypes.node,
    menuItems: PropTypes.array,
    onClickCallback: PropTypes.func,
};

export default React.memo(JumboDdMenu);
