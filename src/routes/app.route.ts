import express from "express";
import { Routes } from "../types/interfaces/app.inter";
import AuthRoute from "./auth.route";
import ProfileRoute from "./profile.route";
import PrescriptionRoute from "./prescription.route";

const AppRouter = express.Router();

const appRoutes: Routes = [
    {
        path: "/auth",
        router: AuthRoute,
    },
    {
        path: "/profile",
        router: ProfileRoute,
    },
    {
        path: "/prescription",
        router: PrescriptionRoute,
    },
];

appRoutes.forEach((route) => {
    AppRouter.use(route.path, route.router);
});

export default AppRouter;
