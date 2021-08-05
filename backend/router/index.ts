const Router = require("express").Router;
import {
  geAllTimeToiletData,
  getDayToiletData,
  getMonthToiletData,
  getWeekToiletData,
  getYearToiletData,
  sendToiletData,
} from "../controllers/toilet-controller";
import {
  authenticate,
  checkAuth,
  logout,
  register,
} from "../controllers/user-controller";

export const router = new Router();

router.post("/register", register);
router.post("/authenticate", authenticate);
router.post("/logout", logout);
router.post("/checkAuth", checkAuth);
router.get("/geAllTimeToiletData", geAllTimeToiletData);
router.get("/getYearToiletData", getYearToiletData);
router.get("/getWeekToiletData", getWeekToiletData);
router.get("/getDayToiletData", getDayToiletData);
router.get("/getMonthToiletData", getMonthToiletData);
router.post("/sendToiletData", sendToiletData);
