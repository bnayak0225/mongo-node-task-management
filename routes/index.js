const express = require("express");
const {getTask, createTask, updateTask, deleteTask} = require("../controllers");
const router = express.Router();

router.use("/api/task/", getTask);
router.use("/api/create-task/", createTask);
router.use("/api/update-task/", updateTask);
router.use("/api/delete-task/", deleteTask);


module.exports = router
