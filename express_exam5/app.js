const express = require("express");
const nunjucks = require("nunjuck");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

const app = express();

dotenv.config();

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

/* body-parser */
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.set("PORT", process.env.PORT || 3000);




/* 없는 페이지 처리 */
app.use((req, res, next) => {
	const err = new Error(`${req.url}은 존재하지않습니다.` );
	err.status = 404;
	next(err);
}

/* 오류 페이지 처리 */
app.use((err, req, res, next) => {
	return res.send(err.status || 500);
};




app.listen(app.get("PORT"), () => {
	console.log(app.get("PORT"), "번 포트에서 서버 대기중!");
});