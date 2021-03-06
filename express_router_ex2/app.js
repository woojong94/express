const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");

const app = express();

dotenv.config();	// .env --> process.env의 하위 속성

app.set("view engine", "html");	// 1. 템플릿 엔진 사용  2. 템플릿 파일의 확장자
nunjucks.configure(path.join(__dirname, "views"), {
	express : app,
	watch : true,
});

app.set("PORT", process.env.PORT || 3500);

app.use(morgan('dev'));

/* 외부 라우터 */
const boardRouter = require("./routes/board");

/* 정적 페이지 */
app.use(express.static(path.join(__dirname, "public")));

/* body-parser 등록 - 그냥 암기 */
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

/* 라우터 (body-parser 아래에 등록) */
app.use("/board", boardRouter);

/* 없는 페이지 처리 라우터 */
app.use((req, res, next) => {
	// 1. throw 에러객체  2. next (에러객체);
const err = new Error(`${req.url}은 존재하지 않습니다!` );
err.status = 404;
	next(err);	// throw err;
});
/* 오류 처리 라우터 */
app.use((err, req, res, next) => {
	return res.status(err.status || 500).send(err.message);
});



app.listen(app.get("PORT"), () => {
	console.log(app.get("PORT"), "포트에서 서버 대기중!");
});