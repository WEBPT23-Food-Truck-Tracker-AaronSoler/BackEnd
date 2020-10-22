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
      const response = await diner.updateOperator(changes, id);
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
      const response = await diner.deleteOperator(id);
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

module.exports = router;
