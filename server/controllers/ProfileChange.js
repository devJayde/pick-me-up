const express = require("express");
const { users } = require("../models");
const jwt = require("jsonwebtoken");
const { isAuthorized } = require("./tokenFunction");
require("dotenv").config();

module.exports = {
  // [POST] /user/profile/:id
  changeProfile: (req, res) => {
    const user_id = req.params.id;
    const { userName, mobile } = req.body;
    // const result = await users.findAll();
    // res.status(200).json({ data: result, message: "ok" });
    console.log("user_id", user_id);
    // const userInfo = await
    const accessTokendata = isAuthorized(req);
    if (!accessTokendata) {
      res.status(401).json({ message: "invalid access token" });
    } else {
      const compareToken = users.findOne({
        where: {
          id: user_id,
        },
      });
      users
        .update(
          {
            nickname: userName,
            phone_number: mobile,
          },
          {
            where: {
              id: user_id,
            },
          }
        )
        .then((userInfo) => {
          console.log("userInfo:", userInfo);
          if (!userInfo) {
            res.status(404).json({ message: "user not exists" });
          } else {
            // console.log("userInfo:", userInfo);
            res.status(200).json({ message: "profile changed" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // if (!userInfo) {
    //   res.status(404).send("bad request");
    // } else {
    //   res.status(200).send({ data: userInfo, message: "ok" });
    // }
    // console.log(req)
    // const { userName, mobile } = req.body;
    // if(!userName && !mobile) {
    //     return res.status(404).send("bad request");
    // }
    // const data = users.update({
    //     nickname: userName,
    //     phone_number: mobile
    // },
    // {
    //     where: { id: req.params.id }
    // });

    // if(!data) {
    //     return res.status(404).send({ "data": null, "message": "user not exists" });
    // }
    // else {
    //     const dataValues = data.dataValues;
    //     return res.status(200).send({ "data": dataValues, "message": "profile changed" });
    // }
    // users.update({
    //     nickname: userName,
    //     phone_number: mobile
    // },
    // {
    //     where: { id: req.params.id }
    // })
    // .then(result => {
    //     if(!result) {
    //         return res.status(404).send({ "data": null, "message": "user not exists" });
    //     } else {
    //         const data = result.dataValues;
    //         return res.status(200).send({ "data": data, "message": "profile changed" });
    //     }
    // })
    // .catch(err => {
    //     console.log(err);
    // })
  },
};

// const Authentication = req.headers.Authentication;

//         if(!Authentication) {
//             res.status(401).send({ "data": null, "message": "invalid access token" });
//         }
//         else {
//             const token = Authentication.split(' ')[1];
//             const data = jwt.verify(token, process.env.ACCESS_SECRET);
//             if(!data) {
//                 res.status(401).send({ "data": null, "message": "invalid access token" });
//             }
//             else {
//                 // optional한 parameter update 방법 알아보기
//                 const updatedData = users.update({
//                     nickname: userName,
//                     phone_number: mobile
//                 },
//                 {
//                     where: { id: req.params.id }
//                 });
//                 if(!updatedData) {
//                     return res.status(404).send({ "data": null, "message": "user not exists" });
//                 } else {
//                     const data = updatedData.dataValues;
//                     return res.status(200).send({ "data": data, "message": "profile changed" });
//                 }
//             }
//         }
// router.get("/user/profile", (req, res) => {
//   res.send("response res");
// });
