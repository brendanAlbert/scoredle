import TextareaAutosize from "@mui/material/TextareaAutosize";

const style = {
  width: 220,
  padding: "20px",
  margin: "20px",
  fontSize: "20px",
  textAlign: "center",
};
export default function DropZone({ setScore, score, placeholderText }) {
  const handleChange = (e) => {
    setScore(e.target.value);
  };

  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      value={score}
      placeholder={placeholderText}
      onChange={handleChange}
      style={style}
    />
  );
}
