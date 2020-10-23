const router = require("express").Router();
const operator = require("./operator-model");
const bcrypt = require("bcryptjs");

router.put("/:userId", async (req, res, next) => {
  const id = req.params.userId;
  const changes = req.body;
  if (changes.password) {
    const rounds = parseInt(process.env.ROUNDS);
    const hash = bcrypt.hashSync(changes.password, rounds || 8);
    changes.password = hash;
  }
  if (id && changes) {
    try {
      const response = await operator.updateOperator(changes, id);
      res.status(200).json({ message: "Update-- Success!", data: response });
    } catch (error) {
      next({
        statusCode: 500,
        message: "Something went wrong with the server, try again!",
        error,
      });
    }
  } else {
    next({ statusCode: 400, message: "Missing required data!", error });
  }
});

router.delete("/:userId", async (req, res, next) => {
  const id = req.params.userId;
  if (id) {
    try {
      const response = await operator.deleteOperator(id);
      res.status(200).json({ message: "Delete-- Success!", data: response });
    } catch (error) {
      next({
        statusCode: 500,
        message: "Something went wrong with the server, try again!",
        error,
      });
    }
  } else {
    next({ statusCode: 400, message: "Missing Username, try again!", error });
  }
});

router.get("/:userId/dashboard", async (req, res, next) => {
  const id = req.params.userId;
  try {
    const response = await operator.findOperatorTrucks(id);
    res.status(200).json(response);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Something went wrong with the server, try again!",
      error,
    });
  }
});

//trucks
router.post("/:userId/truck", async (req, res, next) => {
  const userId = req.params.userId;
  const body = req.body;
  try {
    const response = await operator.addTruck(userId, body);
    res.status(201).json(response);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Something went wrong with the server, try again!",
      error,
    });
  }
});

router.put("/:truckId/truck", async (req, res, next) => {
  const truckId = req.params.truckId;
  const changes = req.body;
  try {
    const response = await operator.editTruck(truckId, changes);
    res.status(201).json(response);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Something went wrong with the server, try again!",
      error,
    });
  }
});

router.delete("/:truckId/truck", async (req, res, next) => {
  const id = req.params.truckId;
  if (id) {
    try {
      const response = await operator.deleteOperator(id);
      res.status(200).json({ message: "Delete-- Success!", data: response });
    } catch (error) {
      next({
        statusCode: 500,
        message: "Something went wrong with the server, try again!",
        error,
      });
    }
  } else {
    next({ statusCode: 400, message: "Missing ID, try again!", error });
  }
});

//menu items
router.get("/:truckId/item", async (req, res, next) => {
  const id = req.params.truckId;
  try {
    const response = await operator.getDinerMenuItem(id);
    res.status(200).json(response);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Something went wrong with the server, try again!",
      error,
    });
  }
});

router.post("/:truckId/item", async (req, res, next) => {
  const body = req.body;
  console.log(body);
  const id = JSON.parse(req.params.truckId);
  try {
    const response = await operator.addMenuItem(id, body);
    res.status(201).json(response);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Something went wrong with the server, try again!",
      error,
    });
  }
});

router.put("/:menuitemId/item", async (req, res, next) => {
  const id = req.params.menuitemId;
  const changes = req.body;
  try {
    const response = await operator.editMenuItem(id, changes);
    res.status(201).json(response);
  } catch (error) {
    next({
      statusCode: 500,
      message: "Something went wrong with the server, try again!",
      error,
    });
  }
});

router.delete("/:menuitemId/item", async (req, res, next) => {
  const id = req.params.menuitemId;
  if (id) {
    try {
      const response = await operator.deleteMenuItem(id);
      res.status(200).json({ message: "Delete-- Success!", data: response });
    } catch (error) {
      next({
        statusCode: 500,
        message: "Something went wrong with the server, try again!",
        error,
      });
    }
  } else {
    next({ statusCode: 400, message: "Missing ID, try again!", error });
  }
});

module.exports = router;
