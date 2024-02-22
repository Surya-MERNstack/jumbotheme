import React from "react";
import { Navigate } from "react-router-dom";
import dashboardRoutes from "./dashboardRoutes";
import metricsRoutes from "./metricsRoutes";
import widgetsRoutes from "./widgetRoutes";
import calendarRoutes from "./calendarRoutes";
import chartRoutes from "./chartRoutes";
import mapRoutes from "./mapRoutes";
import extensionsRoutes from "./extensionsRoutes";
import extraRoutes from "./extraRoutes";
import appsRoutes from "./appsRoutes";
import {muiRoutes} from "./muiRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import listViewRoutes from "./listViewRoutes";
import gridViewRoutes from "./gridViewRoutes";
import Login2 from "../pages/auth-pages/login2";
import Signup2 from "../pages/auth-pages/signup2";
import Page from "@jumbo/shared/Page";
import Dashboard from "@mui/icons-material/Dashboard";
import Agent from "app/pages/apps/mail/Agent";

/**
 routes which you want to make accessible to both authenticated and anonymous users
 **/
const routesForPublic = [];

/**
 routes only accessible to authenticated users
 **/
const routesForAuthenticatedOnly = [
    {
        path: "/",
        element: <Navigate to={"/user/login"} />
    },
    ...dashboardRoutes,
    ...appsRoutes,
    ...widgetsRoutes,
    ...metricsRoutes,
    ...muiRoutes,
    ...extensionsRoutes,
    ...calendarRoutes,
    ...chartRoutes,
    ...mapRoutes,
    ...authRoutes,
    ...extraRoutes,
    ...userRoutes,
    ...listViewRoutes,
    ...gridViewRoutes,
];

/**
 routes only accessible when user is anonymous
 **/
const routesForNotAuthenticatedOnly = [
    {
        path: "/user/app/mails/inbox",
        element: <Page component={Agent} layout={"solo-page"} disableSmLogin={true}/>
    },
    {
        path: "/user/signup",
        element: <Signup2/>
    },
];

const routes = [
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
];

export {routes as default, routesForPublic, routesForNotAuthenticatedOnly, routesForAuthenticatedOnly};
