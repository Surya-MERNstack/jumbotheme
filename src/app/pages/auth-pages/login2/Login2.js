import React, { useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { Facebook, Google, Twitter } from "@mui/icons-material";
import Div from "@jumbo/shared/Div";
import { alpha } from "@mui/material/styles";
import { ASSET_IMAGES } from "../../../utils/constants/paths";
import { getAssetPath } from "../../../utils/appHelpers";
import * as yup from "yup";
import { Form, Formik } from "formik";
import JumboTextField from "@jumbo/components/JumboFormik/JumboTextField";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import Big from "big.js";

const validationSchema = yup.object({
  username: yup.string("Enter your username").required("Username is required"),
  password: yup.string("Enter your password").required("Password is required"),
});

const Login2 = ({ disableSmLogin }) => {
  function convertToSafeString(value) {
    const stringValue = value.toString();
    return stringValue.includes("e") ? stringValue : String(value);
  }

  const cookies = new Cookies();
  const navigate = useNavigate();



  const onSignIn = async (email, password) => {

    // alert(email + password)
    try {
      await axios
        .post(
          "https://devserver.ath.cx/admin/login.jsp",
          { username: email, password: password },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              //         // 'Authorization': `Bearer ${token}`
            },
          }
        )
        .then(function (response) {
          const data = response.data;
          if (data.error) {
            toast.error(data.error, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else if (data.success) {
            const getCookie = data.success;
            cookies.set("authcookie", getCookie, { path: "/" });
            const getAuthCookie = cookies.get("authcookie");
            const stringToken = convertToSafeString(Big(getAuthCookie));

            localStorage.setItem("authCookie", getCookie);
            console.log(stringToken);
            toast.success("You Logged in Successfully", {
              position: toast.POSITION.TOP_RIGHT,
            });

            setTimeout(() => {
              navigate("/dashboards/misc");
            }, 1000);
          }

          console.log(JSON.stringify(response));
        })
        .catch(function (error) {
          console.log("err: ", error);
        });

      // Handle the response, e.g., check for success or error messages
    } catch (error) {
      // Handle the error, e.g., display an error message
      console.error(error);
    }

  };

  return (
    <Div
      sx={{
        width: 720,
        maxWidth: "100%",
        margin: "auto",
        p: 4,
      }}
    >
      <ToastContainer />
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
              `${ASSET_IMAGES}/RLImages/WhatsAppBg.png`,
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
              zIndex: 1,
              height: "100%",
              paddingBottom: 2,
            }}
          >
            <Div sx={{ mb: 2 }}>
              <Div sx={{ mt: "auto", mb: 2 }}>
                <Link href="#" underline="none" sx={{ display: "inline-flex" }}>
                  <img
                    src={require("../../../../assets/images/logoechtWhite.png")}
                    width={90}
                    alt="Echt Logo"
                  />
                </Link>
              </Div>
              <Typography
                variant={"body1"}
                mb={0}
                textAlign={"left"}
                fontSize={15}
                fontWeight={"bold"}
                color={"#fff4fe"}
              >
                Welcome
              </Typography>
              <Typography variant={"body1"} mb={3} textAlign={"left"}>
                Sign in to start your session
              </Typography>
            </Div>

            <Div sx={{ mt: "auto" }}>
              <Typography
                variant={"body1"}
                display={"flex"}
                alignItems={"flex-start"}
                height={"100%"}
              >
                <Link href={"#"} color={"inherit"} underline={"none"}>
                  Forgot your password? Recover Now
                </Link>
              </Typography>
              <Typography
                variant={"body1"}
                display={"flex"}
                flexDirection={"row"}
                gap={1.5}
                alignItems={"flex-start"}
                height={"100%"}
              >
                Don't have an account ?{" "}
                <Link
                  href={"/auth-pages/signup-2"}
                  color={"inherit"}
                  underline={"none"}
                >
                  {" "}
                  Sign Up{" "}
                </Link>
              </Typography>
              {/* <Link href="#" underline="none" sx={{display: 'inline-flex'}}>
                                <img src={`${ASSET_IMAGES}/RLImages/emLogo.png`} width={100} alt="Jumbo React"/>
                            </Link> */}
            </Div>
          </Div>
        </CardContent>
        <CardContent sx={{ flex: 1, p: 4, pt: 3 }}>
          <Typography variant={"h3"} color={"inherit"} fontWeight={500} mb={3}>
            Sign In
          </Typography>

          <Formik
            validateOnChange={true}
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              onSignIn(data.username, data.password);
              setSubmitting(false);
            }}
          >
            {/* {({isSubmitting}) => ( */}
            <Form style={{ textAlign: "left" }} noValidate autoComplete="off">
              <Div sx={{ mt: 1, mb: 3 }}>
                <JumboTextField fullWidth name="username" label="Username" />
              </Div>
              <Div sx={{ mt: 1, mb: 2 }}>
                <JumboTextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                />
              </Div>
              <Div sx={{ mb: 2 }}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </Div>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                sx={{ mb: 3 }}
                // loading={isSubmitting}
                // onClick={onSignIn}
              >
                Sign In
              </LoadingButton>
              {/* {
                                    !disableSmLogin && ( */}
              <React.Fragment>
                <Typography variant={"body1"} mb={2}>
                  Or sign in with
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <IconButton
                    sx={{
                      bgcolor: "#385196",
                      color: "common.white",
                      p: (theme) => theme.spacing(1.0),

                      "&:hover": {
                        backgroundColor: "#385196",
                      },
                    }}
                    aria-label="Facebook"
                  >
                    <Facebook fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#00a8ff",
                      color: "common.white",
                      p: (theme) => theme.spacing(1.0),

                      "&:hover": {
                        backgroundColor: "#00a8ff",
                      },
                    }}
                    aria-label="Twitter"
                  >
                    <Twitter fontSize="small" />
                  </IconButton>
                  <IconButton
                    sx={{
                      bgcolor: "#23272b",
                      color: "common.white",
                      p: (theme) => theme.spacing(1.0),

                      "&:hover": {
                        backgroundColor: "#23272b",
                      },
                    }}
                    aria-label="Twitter"
                  >
                    <Google fontSize="small" />
                  </IconButton>
                </Stack>
              </React.Fragment>
              {/* )
                                } */}
            </Form>
            {/* )} */}
          </Formik>
        </CardContent>
      </Card>
    </Div>
  );
};

export default Login2;
