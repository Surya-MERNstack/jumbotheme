import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Link from "@mui/material/Link";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import CircleIcon from "@mui/icons-material/Circle";
import useJumboLayoutSidebar from "@jumbo/hooks/useJumboLayoutSidebar";
import { SIDEBAR_VIEWS } from "@jumbo/utils/constants/layout";
import { useTranslation } from "react-i18next";

const menuBefore = {
  left: 0,
  top: 0,
  content: `''`,
  position: "absolute",
  display: "inline-block",
  width: "4px",
  height: "100%",
  color: "white",
  backgroundColor: "#00bf63",
};

const JumboNavItem = ({ item, isNested, translate }) => {
  const location = useLocation();
  const { sidebarOptions } = useJumboLayoutSidebar();
  const { t } = useTranslation();

  const isMiniAndClosed = React.useMemo(() => {
    return sidebarOptions?.view === SIDEBAR_VIEWS.MINI && !sidebarOptions?.open;
  }, [sidebarOptions.view, sidebarOptions.open]);

  const label = React.useMemo(() => {
    return translate ? t(item.label) : item.label;
  }, [item, translate, t]);

  if (!item) return null;

  return (
    <>
      <ListItemButton
        component={"li"}
        sx={{
          p: 0,
          overflow: "hidden",
          borderRadius: isMiniAndClosed ? "50%" : "0 24px 24px 0",
          margin: isMiniAndClosed ? "0 auto" : "0",
          ...(isMiniAndClosed
            ? { width: 40, height: 40, justifyContent: "center" }
            : {}),
          ...(!isMiniAndClosed ? { "&::before": menuBefore } : {}),
          "&:hover": {
            color: "#00bf63",
            backgroundColor: "white",
            ...(!isMiniAndClosed
              ? {
                  "&::before": {
                    ...menuBefore,
                    backgroundColor: "green",
                  },
                }
              : {}),
          },
          ...(location.pathname === item.uri
            ? {
                color: "#00bf63",
                backgroundColor: "white",
                ...(!isMiniAndClosed
                  ? {
                      "&::before": {
                        ...menuBefore,
                        backgroundColor: "white",
                      },
                    }
                  : {}),
              }
            : {}),
        }}
      >
        <Link
          underline={"none"}
          component={RouterLink}
          to={item.uri}
          {...(item.target ? { target: item.target } : {})}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            position: "relative",
            color: "inherit",
            p: (theme) => (!isMiniAndClosed ? theme.spacing(1, 3.75) : 0),
            ...(isMiniAndClosed ? { justifyContent: "center" } : {}),
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: isMiniAndClosed ? 20 : 32,
              color: "inherit",
            }}
          >
            {isNested ? (
              <CircleIcon
                sx={{
                  fontSize: 6,
                  ml: 1,
                  
                }}
              />
            ) : (
              item.icon
            )}
          </ListItemIcon>
          {!isMiniAndClosed && (
            <ListItemText
              primary={label}
              sx={{
                m: 0,
                "& .MuiTypography-root": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
              }}
            />
          )}
        </Link>
      </ListItemButton>
    </>
  );
};

export default JumboNavItem;
