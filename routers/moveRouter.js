// need to add a post, delete, update function for moves

const { Router } = require("express");
const {
  movePageGet,
  moveDelete,
  getSearchMove,
} = require("../controllers/moveController");

const moveRouter = Router();

moveRouter.post("/delete/:id", async (req, res) => {
  console.log("hei");
  await moveDelete(req, res);
});

moveRouter.get("/:id", async (req, res) => {
  console.log("hi");
  await movePageGet(req, res);
});

moveRouter.get("", async (req, res) => {
  await getSearchMove(req, res);
});

module.exports = { moveRouter };
