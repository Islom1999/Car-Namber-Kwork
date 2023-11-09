const { request } = require("express");
const Users = require("../models/user.model");

const getLogin = async (req, res) => {
  try {
    res.render("admin/login", {
      title: "Login",
      islLoginPage: true,
      isAdmin: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });

    if (!user) {
      return res.render("admin/login", {
        title: "Login",
        islLoginPage: true,
        isAdmin: true,
        errorMessage: "Username yoki parol xato",
      });
    }

    if (user.password !== password) {
      return res.render("admin/login", {
        title: "Login",
        islLoginPage: true,
        isAdmin: true,
        errorMessage: "Username yoki parol xato",
      });
    }
    user.password = "";

    req.session.user = user;
    req.session.isLogin = true;
    req.session.save();
    return res.redirect("/admin/numbers");
  } catch (error) {
    console.log(error);
  }
};

const userLogout = async (req, res) => {
  try {
    req.session.user = undefined;
    req.session.role = undefined;
    req.session.isLogin = false;
    req.session.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getLogin,
  userLogin,
  userLogout
};
