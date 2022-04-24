import ScoreGrid from "./ScoreGrid";
import WorldleScoreGrid from "./WorldleScoreGrid";

function Card({ crowned, userScoresObject, toggleState }) {
  let length;

  if (toggleState === "word" && userScoresObject?.score?.length > 0) {
    length =
      userScoresObject?.score?.length < 6
        ? userScoresObject?.score?.length
        : userScoresObject?.score[5].includes(0) ||
          userScoresObject?.score[5].includes(1)
        ? "X"
        : userScoresObject?.score?.length;
  }

  if (toggleState === "world" && userScoresObject?.worldleScore?.length > 0) {
    length =
      userScoresObject?.worldleScore?.length < 6
        ? userScoresObject?.worldleScore?.length
        : userScoresObject?.worldleScore[5].includes(0) ||
          userScoresObject?.worldleScore[5].includes(1)
        ? "X"
        : userScoresObject?.worldleScore?.length;
  }

  if (toggleState === "state" && userScoresObject?.state_score?.length > 0) {
    length =
      userScoresObject?.state_score?.length < 6
        ? userScoresObject?.state_score?.length
        : userScoresObject?.state_score[5].includes(0) ||
          userScoresObject?.state_score[5].includes(1)
        ? "X"
        : userScoresObject?.state_score?.length;
  }

  const ratio = `${length} / 6`;

  let name =
    crowned && crowned === userScoresObject?.name && length !== "X"
      ? "👑 " + userScoresObject?.name
      : userScoresObject?.name;

  if (length) {
    return (
      <div
        style={{
          width: "350px",
          display: "grid",
          gap: "6px",
          gridTemplateColumns: "repeat(3, 1fr)",
          color: "#FFF",
          marginTop: "20px",
          fontFamily: "Roboto",
        }}
      >
        <div style={{ justifySelf: "flex-end" }}>{name}</div>
        <div style={{ justifySelf: "center" }}>
          {toggleState === "word" ? (
            <ScoreGrid score={userScoresObject.score} />
          ) : toggleState === "world" ? (
            <WorldleScoreGrid worldleScore={userScoresObject.worldleScore} />
          ) : (
            <WorldleScoreGrid worldleScore={userScoresObject.state_score} />
          )}
        </div>
        <div>{ratio}</div>
      </div>
    );
  }

  return null;
}

export default Card;
