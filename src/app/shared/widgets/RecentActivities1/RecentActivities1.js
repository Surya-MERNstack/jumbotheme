import React, { useState } from "react";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import RecentActivitiesList from "./RecentActivitiesList";
import { useTranslation } from "react-i18next";
import JumboScrollbar from "@jumbo/components/JumboScrollbar";
import {
  Card,
  CardHeader,
  Box,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GetAppIcon from "@mui/icons-material/GetApp";

const buttonVariants = [
  { label: "Refresh", StartIcon: <RefreshIcon /> },
  { label: "Add", StartIcon: <AddIcon /> },
  { label: "Search", StartIcon: <SearchIcon /> },
  { label: "Export", StartIcon: <ArrowDropDownIcon />,endIcon:<GetAppIcon/> },
];
const RecentActivities1 = ({ scrollHeight }) => {
  const { t } = useTranslation();
  const [buttonValue, setButtonValue] = useState("");
  const [modelOpen,setModalOpen] = useState(false)
  const handleClick = (value) => {

    setButtonValue(value);
    if(value == "Add" || value == "Search")
    setModalOpen(true)
  };
  return (
    <Card
      title={t("widgets.title.recentActivities")}
      wrapperSx={{ p: 0 }}
      sx={{ p: 2 }}
    >
      <Box display={"flex"} justifyContent={"space-between"} p={2}>
        <Typography variant="h6">Channels</Typography>
        <Stack direction={"row"} spacing={2}>
          {buttonVariants.map((value) => (
            <Button
              variant="contained"
              size="small"
              color="primary"
              onClick={() => handleClick(value.label)}
              startIcon={value.StartIcon}
              endIcon= {value.endIcon ? value.endIcon : null}
            >
              {value.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <JumboScrollbar
        autoHeight
        autoHeightMin={scrollHeight ? scrollHeight : 480}
        autoHide
        autoHideDuration={200}
        autoHideTimeout={500}
      >
        <RecentActivitiesList buttonValue={buttonValue} setButtonValue={setButtonValue} modelOpen={modelOpen} setModalOpen={setModalOpen}/>
      </JumboScrollbar>
    </Card>
  );
};
/* Todo scrollHeight prop define */
export default RecentActivities1;
