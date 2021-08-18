/**
 * 
 * 회원 가입 유효성 검사
 * 
 */

const validator = {
    /** 회원가입 유효성 검사 */
    joinValidator(req, res, next) {

        const data = req.body;
        console.log(data);
        return res.send("");
        // next();
    }
};

module.exports = validator;