const express = require("express");		// node_modules/express/index.js
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const app = express();
const logger = require("./lib/logger");

/* 라우터 */
const indexRouter = require("./routes"); 	// index.js 생략

dotenv.config();		// .env -> process.env 하위 속성 추가

app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
	epxress : app,
	watch : true,
});

app.set("PORT", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));		// 정적 경로 설정, 앞에 "/" 생략 가능
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

/* 라우터 등록 */
// app.use("/", indexRouter);	// "/" 생략 가능
app.use(indexRouter);	

/* 없는 페이지 처리 라우터 */
app.use((req, res, next)	=> {
	const err = new Error(`${req.url}은 없는 페이지 입니다.` );
	err.status = 404;
	next(err);		// 오류 페이지 처리 라우터로 이동
});

/* 오류 페이지 처리 라우터 */
app.use((err, req, res, next) => { 
	const data = {
		message : err.message,
		status : err.status || 500,
		stack : err.stack,		// 파일 위치등이 기록되어있음, 실제 서비스 중엔 기록 X
	};
	
	/* 로그 기록 */
	logger(`[${data.status}]${data.message}`	, "error");
	logger(data.stack, "error");
	
	if (process.env.NODE_ENV === "production") {		// 서비스 중일때
		delete data.stack;
	}
	
	//return res.status(err.status || 500).send(err.message);
	return res.status(err.status || 500).render("error", data);
});

app.listen(app.get("PORT"), () => {
	console.log(app.get("PORT"), "번 포트에서 서버 대기중...!");
});