const express = require("express");
const router = express.Router();

router.get("/list", (req, res) => {
	return res.send("상품 목록 페이지");
});

router.get("/view", (req, res) => {
	return res.send("상품 상세 정보");
});

module.exports = router;