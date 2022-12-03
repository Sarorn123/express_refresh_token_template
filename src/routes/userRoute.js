const express = require("express");
const userController = require("../controller/UserController");
const multer = require("multer");
const AuthMiddleware = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        const filename = file.fieldname + Date.now() + '-' + Math.round(Math.random() * 1E9) + ".jpg";
        req.body.image_name = filename;
        cb(null, filename);
    }
});
const uploadImage = multer({ storage });

const router = express.Router();

router.get("/", AuthMiddleware ,userController.getAllUsers);


router.get("/:id", userController.getSingleUser);
router.post("/", uploadImage.single("file"), userController.addNewUser);
router.patch("/:id", userController.editUser);
router.delete("/:id", userController.deleteUser);
router.post("/uploadImage", uploadImage.single("file"), (req, res) => {
    res.send(req.body);
});

module.exports = router;