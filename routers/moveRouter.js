// need to add a post, delete, update function for moves

const { Router } = require("express");
const { movePageGet, moveDelete } = require("../controllers/moveController");

const moveRouter = Router();

moveRouter.get("/:id", async (req, res) => {
  await movePageGet(req, res);
});

moveRouter.post("/delete/:id", async (req, res) => {
  await moveDelete(req, res);
});

module.exports = { moveRouter };
