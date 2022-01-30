module.exports = app => {
    const hobbies = require("../controllers/hobbies.controller.js");
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new user
    router.post("/users/", users.create);
  
    // Retrieve all users
    router.get("/users/", users.findAll);
  
    // Retrieve a single User with id
    router.get("/users/:id", users.findOne);
  
    // Update a users with id
    router.put("/users/:id", users.update);
  
    // Delete a users with id
    router.delete("/users/:id", users.delete);
  
    // Delete all users
    router.delete("/users/", users.deleteAll);
  
    // Create a new hobby
    // router.post("/", hobbies.create);
    router.post("/", hobbies.create);
  
    // Retrieve all hobbies
    router.get("/", hobbies.findAll);

    // Retrieve a single hobbies with id
    router.get("/:id", hobbies.findOne);
  
    // Update a hobbies with id
    router.put("/:id", hobbies.update);
  
    // Delete a hobbies with id
    router.delete("/:id", hobbies.delete);
  
    // Delete all hobbies
    router.delete("/", hobbies.deleteAll);
  
    app.use('/api/hobbies', router);
  };