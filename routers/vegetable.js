let express = require("express");
const Controller = require("../controllers/controller");
let router = express.Router();

router.get("/add", Controller.vegeAdd);
router.post("/add", Controller.vegeAddDb);
router.get("/:id/delete", Controller.vegeDelete);

router.get("/:id/edit", Controller.vegeEdit);
router.post("/:id/edit", Controller.vegeEditDb);

router.get("/", Controller.readVegie);

module.exports = router;
