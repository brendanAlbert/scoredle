function guid() {
  const characters =
    "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let guid = "";
  while (guid.length < 26) {
    guid = guid + characters[Math.floor(Math.random() * characters.length)];
    if (guid.length % 7 == 0) {
      guid = guid + "-";
    }
  }
  return guid;
}

const crownify = (dateObjectScoresArray, calculateForGameType) => {
  if (dateObjectScoresArray?.length === 0) return null;

  let tieIndexList = [[], [], [], [], [], []];

  if (calculateForGameType === "wordle") {
    dateObjectScoresArray?.forEach((userScoreObject, idx) => {
      if (userScoreObject?.score) {
        tieIndexList[userScoreObject?.score?.length - 1].push(idx);
      }
    });
  }

  if (calculateForGameType === "worldle") {
    dateObjectScoresArray?.forEach((userScoreObject, idx) => {
      if (userScoreObject?.worldleScore) {
        tieIndexList[userScoreObject?.worldleScore?.length - 1].push(idx);
      }
    });
  }

  if (calculateForGameType === "statele") {
    dateObjectScoresArray?.forEach((userScoreObject, idx) => {
      if (userScoreObject?.state_score) {
        tieIndexList[userScoreObject?.state_score?.length - 1].push(idx);
      }
    });
  }

  if (calculateForGameType === "deutschlandle") {
    dateObjectScoresArray?.forEach((userScoreObject, idx) => {
      if (userScoreObject?.de_score) {
        tieIndexList[userScoreObject?.de_score?.length - 1].push(idx);
      }
    });
  }

  const LastRow = 5;

  for (let i = 0; i < 6; i++) {
    if (tieIndexList[i].length > 1 && i < 5) {
      return null;
    }

    if (tieIndexList[i].length === 1) {
      if (
        calculateForGameType === "wordle" &&
        i === LastRow &&
        dateObjectScoresArray[tieIndexList[i][0]].score[LastRow].filter(
          (x) => x == 2
        ).length !== 5
      ) {
        return null;
      }
      if (
        calculateForGameType === "worldle" &&
        i === LastRow &&
        dateObjectScoresArray[tieIndexList[i][0]].worldleScore[LastRow].filter(
          (x) => x == 2
        ).length !== 5
      ) {
        return null;
      }
      if (
        calculateForGameType === "statele" &&
        i === LastRow &&
        dateObjectScoresArray[tieIndexList[i][0]].state_score[LastRow].filter(
          (x) => x == 2
        ).length !== 5
      ) {
        return null;
      }
      if (
        calculateForGameType === "deutschlandle" &&
        i === LastRow &&
        dateObjectScoresArray[tieIndexList[i][0]].de_score[LastRow].filter(
          (x) => x == 2
        ).length !== 5
      ) {
        return null;
      }

      return dateObjectScoresArray[tieIndexList[i][0]].name;
    }
  }

  if (tieIndexList[5].length > 1) {
    let mappedLastRowList = [];
    mappedLastRowList = dateObjectScoresArray
      .map((dateObject, idx) => {
        if (tieIndexList[5].includes(idx)) {
          return dateObject;
        }
      })
      .filter((x) => x !== undefined);

    let gotItLastGuessList = [];
    mappedLastRowList.forEach((userScoreObj) => {
      if (calculateForGameType === "wordle") {
        if (userScoreObj.score[LastRow].filter((x) => x == 2).length === 5) {
          gotItLastGuessList.push(userScoreObj);
        }
      }

      if (calculateForGameType === "worldle") {
        if (
          userScoreObj.worldleScore[LastRow].filter((x) => x == 2).length === 5
        ) {
          gotItLastGuessList.push(userScoreObj);
        }
      }

      if (calculateForGameType === "statele") {
        if (
          userScoreObj.state_score[LastRow].filter((x) => x == 2).length === 5
        ) {
          gotItLastGuessList.push(userScoreObj);
        }
      }

      if (calculateForGameType === "deutschlandle") {
        if (userScoreObj.de_score[LastRow].filter((x) => x == 2).length === 5) {
          gotItLastGuessList.push(userScoreObj);
        }
      }
    });
    if (gotItLastGuessList.length === 1) return gotItLastGuessList[0].name;
    return null;
  }
};

export { guid, crownify };
