import diaryData from "../../data/patients";
import { Patient, PatientWithoutId } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = () => {
  return diaryData;
};

// const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
//   return diaries.map(({ id, date, weather, visibility }) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };

// const findById = (id: number): DiaryEntry | undefined => {
//   const entry = diaries.find((d) => d.id === id);
//   return entry;
// };

const addDiary = (entry: PatientWithoutId) => {
  const newDiaryEntry: Patient = {
    ...entry,
    id: uuid(),
  };

  diaryData.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  // getNonSensitiveEntries,
  // findById,
};
