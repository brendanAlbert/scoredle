import { useEffect } from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const style = {
  width: 220,
  padding: "20px",
  margin: "20px",
  fontSize: "20px",
  textAlign: "center",
};
export default function DropZone({ setScore, score }) {
  const handleChange = (e) => {
    setScore(e.target.value);
  };
  useEffect(() => {}, []);
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      value={score}
      placeholder="paste your wordle score here"
      onChange={handleChange}
      style={style}
    />
  );
}
