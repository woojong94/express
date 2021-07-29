const express = require("express");
const middle1 = require("./middleware/middle1");
// const middle2 = require("./middleware/middle2");
// const { joinValidator, loginValidator } = require("./middleware/middle2");
const middle3 = require("./middleware/middle3");
const app = express();

app.use(middle1);

// app.use(middle2.joinValidator);			// 못고침
// app.use(middle2.loginValidator);

app.use(middle3("인수1"));
app.use(middle3("인수2"));
app.use(middle3("인수3"));

app.use((req, res, next) => {
	// console.log("가장 상단 모든 메서드, 모든 요청 URL");
	console.log("공통 라우터");
	next();
});

app.get("/", (req, res, next) => {
	console.log("1번째");
	// const error = new Error("1번째 미들웨어에서 발생시킨 에러!!");
	// throw error;
	 next();
	// next(error);
	// return res.send("출력");
});

app.get("/", (req, res, next) => {
	console.log("2번째");
	next();
});
app.get("/", (req, res, next) => {
	console.log("3번째");
	next();
}, (req, res, next) => {
	console.log("4번째");
	next();
}, (req, res, next) => {
	console.log("5번째");
	next();
}, (req, res) => {
	console.log("6번째");
	return res.send("6번째 미들웨어에서 출력");
});

app.get("/test", (req, res) => {
	return res.send("/test 페이지..");
});


/* 없는 페이지 처리 라우터 */
app.use((req, res, next) => {
	// return res.send("가장 하단 모든 매칭 하우터");
	// return res.send("없는 페이지 처리 라우터");
	const error = new Error("없는 페이지...");
	next(error); // 오류처리 라우터에 있는 미들웨어로 전달
});

/* 오류 페이지 처리 라우터 */
app.use((err, req, res, next) => {
	/**
		1) throw 에러객체
		2) next(에러객체)
			-> 오류 처리 라우터
	*/
	return res.send(err.message);
});

app.listen(3000, () => {
	console.log("3000번 포트에서 서버 대기중!!!!");
});