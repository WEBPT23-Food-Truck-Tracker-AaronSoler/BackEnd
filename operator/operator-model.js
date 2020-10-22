const { router } = require("../api/server");
const db = require("../database/dbConfig");
const express = require("express");

const findOperatorTrucks = async (id) => {
  return db("trucks").where({ operator_id: id });
};

module.exports = {
  findOperatorTrucks,
};
