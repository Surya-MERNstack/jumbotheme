import React from "react";
import Div from "@jumbo/shared/Div";
import Link from "@mui/material/Link";
import WhiteLogo from "../../../assets/images/logoechtWhite.png";
import DarkLogo from "../../../assets/images/logoechtDark.png";
import echtlogo from "../../../assets/images/img/echtanimation.gif";
import { ASSET_IMAGES } from "../../utils/constants/paths";
import echtdark from "../../../assets/images/img/output-onlinegiftools.gif";

const Logo = ({ mini, mode, sx }) => {
  const dropShadow = "drop-shadow(-1px 0px 20.5px #000000)";
  return (
    <Div sx={{ display: "inline-flex", ...sx }}>
      <Link href={"#"}>
        {!mini ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <a href="https://echt.im/" target="_blank">
              {" "}
              <img
                src={mode === "light" ? echtlogo : echtdark}
                width="140px"
                alt="Echt Logo"
              />
            </a>
          </div>
        ) : (
          <a href="https://www.amazon.com" target="_blank">
            <img
              src={mode === "light" ? echtdark : echtdark}
              width="140px"
              alt="Echt Logo"
            />
          </a>
        )}
      </Link>
    </Div>
  );
};

Logo.defaultProps = {
  mode: "light",
};

export default Logo;
