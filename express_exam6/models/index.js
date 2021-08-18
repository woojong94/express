const Sequelize = require('sequelize'); //Sequelize 생성자
const env = process.env.NODE_ENV || 'development';  // 서비스중 또는 개발중

const config = require("../config/config.json")[env];     // .json 생략 가능     DB접속 정보 설정

/** DB 접속을 하기 위한 sequelize 인스턴스를 생성 */
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// sequelize 인스턴스 -> DB연결, SQL 실행
// Sequelize 생성자 속성 QueryType은 SQL 실행시 SQL 종류를 명시하는 상수
// 외부에서는 sequelize 인스턴스, Sequelize 생성자 둘다 모두 사용

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
