import React, { useState } from 'react';
import Div from "@jumbo/shared/Div";
import Badge from "@mui/material/Badge";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {Link, ListItem, ListItemIcon, ListItemText, Popover, Typography,IconButton,Button,Stack} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Divider from "@mui/material/Divider";
import FlagIcon from "@mui/icons-material/Flag";
import DialpadIcon from "@mui/icons-material/Dialpad";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import {ASSET_AVATARS} from "../../../../../utils/constants/paths";
import {getAssetPath} from "../../../../../utils/appHelpers";
import ReplayIcon from '@mui/icons-material/Replay';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import CampaignIcon from '@mui/icons-material/Campaign';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const AuthUserSummary = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'user-popover' : undefined;
    const [openDialog, setOpenDialog] = React.useState(false);
    const [text,setText] = useState('')
    const handleClickOpenDialog = (value) => {
        setText(value)
        setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const DialogComponent = () =>{
    const [dateValue, setDateValue] = React.useState(dayjs('2022-04-17'));
        return  <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <Div  sx={{display:"flex", justifyContent:"space-between"}}>
            <Div>
        <DialogTitle>{text === "Add" ? "Search Chat Users" : "Info"}</DialogTitle>
        </Div>
        {text === "Info" && (
        <Div sx={{p:1.5}}>
        <Button
                size="small"
                variant="contained"
                startIcon={<RefreshIcon />}
                // onClick={handleClickOpenDialog}
                sx={{ fontSize: 5, textTransform: "capitalize" }}
              >
                Refresh
              </Button>
              </Div>
               )}
        </Div>
        
        <DialogContent>
            {text === "Add" && (
                <Div>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DatePicker', 'DatePicker']} >
      <DatePicker
        
          label="Last Chat From"
          value={dateValue}
          onChange={(newValue) => setDateValue(newValue)}
          renderInput={(params) => <TextField {...params} size="small" />}
        />        <DatePicker
          label="To"
          value={dateValue}
          onChange={(newValue) => setDateValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
        <FormControlLabel control={<Switch defaultChecked />} label="Unread Only" />
        </Div>

    )}
    {text === "Info" && (
          <Div sx={{ display: "flex", gap: 0.5,width:500 }}>
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
    )}

        </DialogContent>
        <DialogActions>
          <Button size="small" variant='contained' color='error' onClick={handleCloseDialog}>Close</Button>
          {text === "Add" && (
          <Button size="small" variant='contained' color='success' onClick={handleCloseDialog}>Search</Button>
          )}
        </DialogActions>
      </Dialog>
    }
  
    return (
        <React.Fragment>
            <DialogComponent/>
            <Div
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                }}
            >
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    badgeContent={
                        <React.Fragment>
                            <ArrowDropDownIcon
                                sx={{color: 'inherit', fontSize: '1.25rem'}}
                                aria-describedby={id}
                                onClick={handleClick}
                            />
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'right',
                                }}
                                sx={{
                                    '& .MuiPaper-root': {
                                        border: 1,
                                        borderColor: 'divider'

                                    },
                                }}
                            >
                                <Div sx={{p: 3, pb: 2, minWidth: 276}}>
                                    <Div
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mb: 2,
                                        }}
                                    >
                                        <Avatar
                                            sx={{width: 60, height: 60, mr: 2}}
                                            alt={"Cory Smith"}
                                            src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`,"60x60")}
                                        />
                                        <Div sx={{flex: '1 1 auto'}}>
                                            <Typography variant={"h5"} mb={.35}>Sunil Charley</Typography>
                                            <Typography
                                                variant={"body1"}
                                                color={"text.secondary"}
                                            >Life must be big</Typography>
                                        </Div>
                                    </Div>
                                    <List disablePadding>
                                        <ListItem sx={{px: 0}}>
                                            <ListItemIcon sx={{minWidth: 36}}>
                                                <FiberManualRecordIcon fontSize={"small"} color={"success"}/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography
                                                    variant={"h5"}
                                                    color={"text.primary"}
                                                    mb={0}
                                                >Online</Typography>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li"/>
                                        <ListItem sx={{px: 0}}>
                                            <ListItemIcon sx={{minWidth: 36}}>
                                            <ReplayIcon sx={{color:"#9417ee"}}/>

                                                {/* <FlagIcon fontSize={"small"}/> */}
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography
                                                    variant={"h5"}
                                                    color={"text.primary"}
                                                    mb={0}
                                                >Refresh</Typography>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li"/>
                                        <ListItem sx={{px: 0}} onClick={()=> handleClickOpenDialog("Add")}>
                                            <ListItemIcon sx={{minWidth: 36}}>
                                            <ZoomInIcon sx={{color:"#9417ee"}}/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography
                                                    variant={"h5"}
                                                    color={"text.primary"}
                                                    mb={0}
                                                >Search</Typography>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li"/>
                                        <ListItem sx={{px: 0}} onClick={()=> handleClickOpenDialog("Info")}>
                                            <ListItemIcon sx={{minWidth: 36}}>
                                            <CampaignIcon sx={{color:"#9417ee"}}/>
                                            </ListItemIcon>
                                            <ListItemText>
                                                <Typography
                                                    variant={"h5"}
                                                    color={"text.primary"}
                                                    mb={0}
                                                >Info</Typography>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider component="li"/>
                                     
                                    </List>
                                </Div>
                            </Popover>
                        </React.Fragment>
                    }
                    sx={{
                        mr: 2,
                        '& .MuiBadge-badge': {
                            height: 16,
                            width: 16,
                            minWidth: 16,
                            overflow: 'hidden',
                            border: 1,
                            borderColor: 'common.white',
                            color: 'common.white',
                            bgcolor: '#8dcd03',
                            cursor: 'pointer',
                            right: 9,
                            bottom: 9,
                        }
                    }}
                >
                    <Avatar sx={{width: 50, height: 50}} alt="Cory Smith" src={getAssetPath(`${ASSET_AVATARS}/avatar3.jpg`,"50x50")}/>
                </Badge>
                <Div sx={{flex: '1 1 auto'}}>
                    <Typography variant={"h5"}>Sunil Charly</Typography>
                    {/* <Typography variant={"body1"} color={"text.secondary"}>Life must be big</Typography> */}
                </Div>
             
            </Div>
        </React.Fragment>
    );
};

export default AuthUserSummary;
