import React from "react";
import Div from "@jumbo/shared/Div";
import { Card, CardContent, TextField, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import { useNavigate } from "react-router-dom";

const Signup2 = () => {
  const navigate = useNavigate()
  const handleSubmit = () =>{
    navigate("/dashboards/news")
  }
  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        p: 4,
      }}
    >
      <Card
        sx={{
          display: "flex",
          minWidth: 0,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <CardContent
          sx={{
            flex: "0 1 300px",
            position: "relative",
            background: `#0267a0 url(${getAssetPath(
              `${ASSET_IMAGES}/RLImages/WhatsappBg.png`,
              "640x428"
            )}) no-repeat center`,
            backgroundSize: "cover",

            "&::after": {
              display: "inline-block",
              position: "absolute",
              content: `''`,
              inset: 0,
              backgroundColor: alpha("#0267a0", 0.65),
            },
          }}
        >
          <Div
            sx={{
              display: "flex",
              minWidth: 0,
              flex: 1,
              flexDirection: "column",
              color: "common.white",
              position: "relative",
              paddingBottom:2,
    
              zIndex: 1,
              height: "100%",
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Div sx={{ mt: "auto", mb: 3 }}>
                <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
                  <img
                    src={`${ASSET_IMAGES}/RLImages/emLogo.png`}
                    width={100}
                    alt="Jumbo React"
                  />
                </Link>
              </Div>{" "}
              <Typography variant={"body1"} mb={2}>
                <Typography variant={"h4"} color={"#ffff"} fontWeight={"bold"}>
                  {" "}
                  Welcome{" "}
                </Typography>
                Create your free account
              </Typography>
            
            </Div>

            <Typography
                variant={"body1"}
                display={"flex"}
                flexDirection={"row"}
                flex={2}
                gap={1.5}
                alignItems={"flex-end"}
                height={"100%"}
              >
                Already have an account?{" "}
                <Link
                  href={"/auth-pages/login-2"}
                  color={"inherit"}
                  underline={"none"}
                >
                  Sign in
                </Link>
              </Typography>
            {/* <Div sx={{mt: 'auto'}}>
                            <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                            <img src={`${ASSET_IMAGES}/RLImages/emLogo.png`} width={100} alt="Jumbo React"/>
                            </Link>
                        </Div> */}
          </Div>
         
        </CardContent>
        <CardContent
          sx={{
            flex: 1,
            p: 4,
            pt:2
          }}
        >
            <Typography variant="h3" mb={3}>Sign Up</Typography>
          <Div sx={{ mt: 1, mb: 2 }}>
            <TextField size="small" fullWidth id="name" label="User Name" />
          </Div>
          <Div sx={{ mt: 1, mb: 2 }}>
            <TextField size="small" fullWidth id="fullName" label="Full Name" />
          </Div>
          <Div sx={{ mt: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              id="mobileNumber"
              label="Mobile Number"
            />
          </Div>
          <Div sx={{ mt: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              id="email"
              label="Email"
              defaultValue="demo@example.com"
            />
          </Div>
          <Div sx={{ mt: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              id="password"
              label="Password"
              type="password"
              defaultValue="123456"
            />
          </Div>
          <Div sx={{ mt: 1, mb: 2 }}>
            <TextField
              size="small"
              fullWidth
              id="conform password"
              label="Conform Password"
              type="password"
              defaultValue="123456"
            />
          </Div>
          <Button variant="contained" sx={{ mb: 2 }} onClick={handleSubmit} >
            Signup
          </Button>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Signup2;
