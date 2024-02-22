import React, { useEffect } from "react";
import { Box, Card, CardHeader, Grid, Stack, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ClientFullDetails({ clientDetails }) {
  return (
    <Box>
          <Typography letterSpacing={1} padding={1} fontSize={16} variant="h4" fontWeight={700}>
            Client Details
          </Typography>
      <Box sx={{ p: 2,pt:1 }}>
        <>
       
          <List
            disablePadding
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.userName}
            >
              <ListItemText sx={{fontWeight:600}} primary={"User Name"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.name}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Names"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.date}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Date"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.phone}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Mobile No"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.email}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Email"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.description}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Description"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.plan}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Plan"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.balance}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Balance"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.agent}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Agent"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>
            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.supervisor}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Supervisor"} />
            </ListItem>
            <hr style={{padding:"0px", margin:"3px"}}/>

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={clientDetails.overDraft}
            >
              <ListItemText sx={{fontWeight:600}} primary={"Over Draft"} />
            </ListItem>
          </List>
         
        </>
      </Box>
    </Box>
  );
}
