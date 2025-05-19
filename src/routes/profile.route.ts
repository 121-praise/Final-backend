import express from "express";
import { 
    getProfile, 
    setProfile,
    searchByMatric
} from "../controllers/profile.controller";
import MiddlewareService from "../middlewares/auth.middleware";


const ProfileRouter = express.Router()

ProfileRouter.use(MiddlewareService.protect)

ProfileRouter.get('/get-profile', getProfile)

ProfileRouter.put('/set-profile', setProfile);

ProfileRouter.get('/search-by-matric', searchByMatric);

export default ProfileRouter;