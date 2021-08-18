const express = require('express');
const member = require("../models/member");
const { alert, go } = require("../lib/common");
const router = express.Router();

router.route("/join")    // member/join
    .get((req, res) => {    // 회원가입 양식
        return res.render("member/join");
    })
    .post(async(req, res) => {   // 회원가입 처리
        const result = await member.join(req.body);
        if (result) { // 회원가입 성공 -> 로그인 페이지로 이동
            return go("/member/login", res, "parent");
        }
        // 실패시 메세지
        return alert("회원가입에 실패하였습니다.");
    });

router.route("/login")
    .get((req, res) => {    // 로그인 양식
        return res.render("member/login"); 
    })
    .post((req, res) => {   // 로그인 처리

    });

router.route("/logout")
    .get((req, res) => {    // 로그아웃 양식

    })
    .post((req, res) => {   // 로그이웃 처리

    });


module.exports = router;