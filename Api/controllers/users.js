const { request, response } = require("express");


const User = require("../models/user");

//ya se que es redundante es para tener el tipado
const getUsers = async (req = request, res = response) => {
    res.json({
        resp: "Mostrar Usuarios"
    })
};

const postUser = async (req = request, res = response) => {
    res.json({
        resp: "Post Usuarios"
    })
};

const putUser = async (req = request, res = response) => {
    res.json({
        resp: "Put Usuarios"
    })
};

const deleteUser = async (req = request, res = response) => {
    res.json({
        resp: "Delete Usuarios"
    })
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};