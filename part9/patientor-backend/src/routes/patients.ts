import express from "express";
import diaryService from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryService.getEntries());
});

// router.get("/:id", (req, res) => {
//   const diary = diaryService.findById(Number(req.params.id));

//   if (diary) {
//     res.send(diary);
//   } else {
//     res.sendStatus(404);
//   }
// });

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedEntry = diaryService.addDiary({ ...req.body });
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
