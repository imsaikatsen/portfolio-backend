const express = require("express");
const router = express.Router();

const { jwtMiddleware } = require("../middleware/jwtMiddleware");
const { register } = require("../controller/authController");
const { login } = require("../controller/authController");
const { logout } = require("../controller/authController");
const { get_all_users } = require("../controller/authController");
const { add_blog } = require("../controller/blogController");
const { get_all_blogs } = require("../controller/blogController");
const { get_single_blog } = require("../controller/blogController");
const { update_single_blog } = require("../controller/blogController");
const { delete_single_blog } = require("../controller/blogController");
const { add_project } = require("../controller/ProjectsController");
const { list_projects } = require("../controller/ProjectsController");
const { get_project } = require("../controller/ProjectsController");

//.................... Authentication API ...................//

router.post("/api/register", register);
router.post("/api/login", login);
router.post("/api/logout", jwtMiddleware, logout);
router.get("/api/protected", jwtMiddleware);
router.get("/api/get-users", get_all_users);

//.................... Blog API ...................//
router.post("/api/blog/add-blog", add_blog);
router.get("/api/blog/get-all-blogs", get_all_blogs);
//Get Single blog
router.get("/api/blog/:id", get_single_blog);
//Update blog
router.put("/api/blog/:id", update_single_blog);
// Delete a blog
router.delete("/api/blog/:id", delete_single_blog);

//.................... Project API ...................//

router.post("/api/projects/add-project", add_project);
router.get("/api/projects/list_projects", list_projects);
router.get("/api/projects/:id", get_project);
// router.put("/api/projects/:id", update_project);
// router.delete("/api/projects/:id", delete_project);
module.exports = router;
