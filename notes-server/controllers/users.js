const app = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

app.get("/", async (req, resp) => {
  let result = await User.find({});
  resp.json(result);
});

app.get("/:id", async (req, resp, next) => {
  try {
    const result = await User.findById(req.params.id);

    if (result) {
      resp.json(result);
    } else {
      resp.status(404).send(`There are no Users at ${req.params.id}`);
    }
  } catch (error) {
    //Here handling middlewaew
    next(error);
    // console.log(err);
    // resp.status(500).send(`${req.params.id} is not a expected format`);
  }
});

// app.put("/:id", async (request, response, next) => {
//   const body = request.body;

//   const User = {
//     content: body.content,
//     important: body.important,
//   };

//   try {
//     const updatedUser = await User.findByIdAndUpdate(request.params.id, User, {
//       new: true,
//       runValidators: true,
//     });

//     // Return only the relevant data from the updated User
//     response.json({
//       id: updatedUser.id,
//       content: updatedUser.content,
//       important: updatedUser.important,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// app.delete("/:id", async (request, response, next) => {
//   try {
//     User.findByIdAndRemove(request.params.id);
//     response.status(204).end();
//   } catch (error) {
//     next(error);
//   }
// });

app.post("/", async (request, response, next) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name,
  });

  //TODO: Don't use "express-async-error"
  try {
    const savedUser = await user.save(); //! ".save" returns promise here
    response.status(201).json(savedUser);
  } catch (e) {
    next(e);
  }
});

module.exports = app;
