const { router } = require("../api/server");
const db = require("../database/dbConfig");
const express = require("express");

const findOperatorTrucks = async (id) => {
  return db("trucks").where({ operator_id: id });
};

const updateOperator = async (changes, id) => {
  await db("operators").where({ id }).update(changes);
  return db("operators").where({ id });
};

const deleteOperator = async (id) => {
  const response = await db("operators").where({ id });
  await db("operators").where({ id }).del();
  return response;
};

const addTruck = async (Userid, body) => {
  const [id] = await db("trucks").insert(
    { ...body, operator_id: Userid },
    "id"
  );
  console.log(id);
  return db("trucks").where({ id });
};

const editTruck = async (id, changes) => {
  await db("trucks").where({ id }).update(changes);
  return db("trucks").where({ id });
};

const deleteTruck = async (id) => {
  const response = await db("trucks").where({ id });
  await db("trucks").where({ id }).del();
  return response;
};

module.exports = {
  findOperatorTrucks,
  updateOperator,
  deleteOperator,
  addTruck,
  editTruck,
  deleteTruck,
};
