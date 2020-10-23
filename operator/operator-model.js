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

const getDinerMenuItem = async (id) => {
  return db("menu_items").where({ id });
};

const addMenuItem = async (truckid, body) => {
  const [id] = await db("menu_items").insert(
    {
      item_name: body.item_name,
      item_description: body.item_description,
      item_price: body.item_price,
      truck_id: truckid,
    },
    "id"
  );
  return getMenuItemById(id);
};

const editMenuItem = async (id, changes) => {
  await db("menu_items").where({ id }).update(changes);
  return getMenuItemById(id);
};

const deleteMenuItem = async (id) => {
  const response = await db("menu_items").where({ id });
  await db("menu_items").where({ id }).del();
  return response;
};

module.exports = {
  findOperatorTrucks,
  updateOperator,
  deleteOperator,
  addTruck,
  editTruck,
  deleteTruck,
  getDinerMenuItem,
  addMenuItem,
  editMenuItem,
  deleteMenuItem,
};
