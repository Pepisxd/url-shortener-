import express from "express";
import {
  createShorturl,
  redirectUrl,
  deleteUrl,
  getUrls,
  getUrlByShortUrl,
  updateShortUrl,
  updateUrl,
} from "../controllers/linkController.js";

const router = express.Router();

router.post("/shorten", createShorturl);
router.get("/all", getUrls);
router.put("/shorturl", updateShortUrl);

router.get("/:shortUrl", redirectUrl);
router.delete("/:shortUrl", deleteUrl);
router.get("/url/:shortUrl", getUrlByShortUrl);

router.put("/:shortUrl", updateUrl);

export default router;
