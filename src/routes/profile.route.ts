import express from "express";
import { 
    getProfile, 
    setProfile,
    searchByMatric,
    getPharmacists,
    getNurses
} from "../controllers/profile.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const ProfileRouter = express.Router()

ProfileRouter.use(MiddlewareService.protect)

ProfileRouter.get('/get-profile', getProfile)

ProfileRouter.put('/set-profile', setProfile);

ProfileRouter.get('/search-by-matric', searchByMatric);

ProfileRouter.get('/get-pharmacists', getPharmacists);

ProfileRouter.get('/get-nurses', getNurses);

export default ProfileRouter;