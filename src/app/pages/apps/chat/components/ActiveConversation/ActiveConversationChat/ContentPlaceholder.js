import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import Div from "@jumbo/shared/Div";
import WhatsappIcon from "../../../../../../../assets/images/whatsapp-logo.png";
import ViperIcon from "../../../../../../../assets/images/Viber-logo.png";
import DoubleMessage from "../../../../../../../assets/images/doubleMessage.png";
import Slide from "@mui/material/Slide";
import "./chat.css";
import Grow from "@mui/material/Grow";

const ContentPlaceholder = () => {
  const [checked, setChecked] = React.useState(true);
  return (
    <Div
      sx={{
        textAlign: "center",
        margin: "auto",
        p: 3,
      }}
    >
      <Slide direction="down" in={checked} mountOnEnter unmountOnExit>
        <Stack direction={"row"} spacing={3}>
          <Grow in={checked}   style={{ transformOrigin: "0 0 0" }}
            {...(checked ? { timeout: 2000 } : {})}>
            <img
              src={WhatsappIcon}
              alt="Welcome to Jumbo Chat App"
              width={55}
              height={55}
            />
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(checked ? { timeout: 3400 } : {})}
          >
            <img
              src={ViperIcon}
              alt="Welcome to Jumbo Chat App"
              width={70}
              height={72}
            />
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: "0 0 0" }}
            {...(checked ? { timeout: 4500 } : {})}
          >
            <img
              src={DoubleMessage}
              alt="Welcome to Jumbo Chat App"
              width={55}
              height={55}
            />
          </Grow>
        </Stack>
      </Slide>
      <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
        <Typography
          variant={"h3"}
          mt={2}
          letterSpacing={2}
          color={"text.primary"}
          fontSize={"19px"}
          className="animate-charcter"
        >
          Welcome to Echt
        </Typography>
      </Slide>
    </Div>
  );
};

export default ContentPlaceholder;
