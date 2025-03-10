const express = require("express");
const { addReview, deleteReview } = require("../controllers/reviewController");
const { protect, admin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, addReview);
router.delete("/:id", protect, admin, deleteReview);

module.exports = router;
