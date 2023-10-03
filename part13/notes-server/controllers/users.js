const router = require("express").Router();

const { User, Note, Team } = require("../models");
const { tokenExtractor, isAdmin } = require("../util/middleware");

router.get("/", async (req, res) => {
  const users = await User.scope("disabled").findAll({
    include: [
      {
        model: Note,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  let usersWithNotes = await User.with_notes(0);
  res.json({ ...users, usersWithNotes });
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.query.teams);
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: [""] },
    include: [
      {
        model: Note,
        attributes: { exclude: ["userId"] },
      },
      // {
      //   model: Note,
      //   as: "marked_notes",
      //   attributes: { exclude: ["userId"] },
      //   through: {
      //     attributes: [],
      //   },
      //   include: {
      //     model: User,
      //     attributes: ["name"],
      //   },
      // },
    ],
  });

  if (!user) {
    return res.status(404).end();
  }

  let teams = undefined;
  if (req.query.teams === "true") {
    teams = await user.getTeams({
      attributes: ["name"],
      joinTableAttributes: [],
    });
  }
  let noteNumber = await user.number_of_notes();
  res.json({ ...user.toJSON(), teams, noteNumber });
});

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
