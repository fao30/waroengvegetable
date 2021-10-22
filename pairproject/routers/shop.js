let express = require("express");
const Controller = require("../controllers/controller");
let router = express.Router();

// let coba = function (req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// };

router.get("/:idbuyer", Controller.catalogList);
router.get("/:idbuyer/invoice", Controller.invoice);
router.get("/:id/buy/:idbuyer", Controller.vegeBuy);

module.exports = router;
