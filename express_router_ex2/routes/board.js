const express = require("express");
const router = express.Router();

/** /board/list/인수 */
router.get("/list/:boardId", (req, res) => {
	const data = { 
						board : req.params.boardId,
						list : ["apple", "orange", "mango"],
						city : "인천",
						isLogin : true,
						htmlData : '<h1>HTML 출력 테스트</h1>',
					};
	return res.render("board/list", data); // views/board/list.html
});
/** /board/view/인수 */
router.get("/list/:num", (req, res) => {
	return res.send("게시글 번호 -" + req.params.num);
});
/** /board/write */
router.route("/write")
	.get((req, res) => {
		// 게시글 작성 양식
	})
	.post((req, res) => {
		// 게시글 작성 처리
	})
	.patch((req, res) => {
		// 게시글 수정 처리
	})
	.delete((req, res) => {
		// 게시글 삭제
	});

module.exports = router;	// 외부에서 사용할 때