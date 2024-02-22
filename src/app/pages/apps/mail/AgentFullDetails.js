import React from "react";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";

export default function AgentFullDetails({ AgentDetails }) {
  return (
    <Box>
      <Typography
        letterSpacing={1}
        padding={1}
        fontSize={16}
        variant="h4"
        fontWeight={700}
      >
        Agent Details
      </Typography>
      <Box sx={{ p: 2, pt: 1 }}>
        <>
          <List
            disablePadding
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.userName}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"User Name"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} />

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.name}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Names"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} />

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.date}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Date"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} />

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.phone}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Mobile No"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} />

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.email}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Email"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} />

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.description}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Description"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} />

            {/* we can use this code in future 
            
            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.plan}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Plan"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} /> 
            
            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.balance}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Balance"} />
            </ListItem> 
            <hr style={{ padding: "0px", margin: "3px" }} /> 

            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Agent"} />
            </ListItem> 
            <hr style={{ padding: "0px", margin: "3px" }} /> 
            
            */}
            <ListItem
              disablePadding
              disableGutters
              secondaryAction={AgentDetails.supervisor}
            >
              <ListItemText sx={{ fontWeight: 600 }} primary={"Supervisor"} />
            </ListItem>
            <hr style={{ padding: "0px", margin: "3px" }} />
          </List>
        </>
      </Box>
    </Box>
  );
}
