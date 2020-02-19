const initializeDB = require("./db.js");

const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

const start = async () => {
  const controller = await initializeDB();

  app.get("/users", async (req, res) => {
    const users = await controller.getUsers();
    res.json(users);
  });


  app.get("/users/add", async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    let errors = [];
    if (username == "" || password == "") {
      errors.push({
        status: 403,
        error: true,
        message:
          "you cannot create a user without providing a user name or password"
      });
    }

    if (errors.length > 0) {
      res.json({ status: 403, error: true, message: errors });
    } else {
      try {
        const addUser = await controller.addUser({ username, password });
        res.json({ id: addUser, username: username, password: password });
      } catch (e) {
        res.json({ status: 403, error: true, message: e.message });
      }
    }
  });

  app.get("/users/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const del = await controller.deleteUser(id);
      res.json({ del });
    } catch (e) {
      res.json({ status: 403, error: true, message: e.message });
    }
  });
  app.get("/users/update/:id", async (req, res) => {
    const id = req.params.id;
    const {username, password}=req.query;
    console.log(id, username, password)
    try {
      const updateUser = await controller.updateUser(id,{ username, password });
      res.json({ updateUser });
    } catch (e) {
      res.json({ status: 403, error: true, message: e.message });
    }
  });
};



app.listen(5000, () => console.log("server listening on port 5000..."));
start();
