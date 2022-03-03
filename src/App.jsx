import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import RightDrawer from "./components/Drawer";
import Modal from "./components/Modal";
import CurateUsersModal from "./components/CurateUsersModal";

function App() {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  const [modalOpenState, setmodalOpenState] = useState(false);
  const [curateUserModalState, setCurateUserModalState] = useState(false);
  const [scores, setScores] = useState([
    {
      date: new Date(2022, 1, 27).toDateString(),
      scores: [
        {
          name: "Al",
          score: [
            [0, 0, 1, 1, 2],
            [1, 1, 1, 1, 2],
            [0, 1, 2, 1, 0],
            [2, 2, 2, 2, 2],
          ],
        },
        {
          name: "Bob",
          score: [
            [0, 0, 1, 1, 2],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 2],
            [0, 1, 2, 1, 0],
            [0, 1, 2, 1, 1],
          ],
        },
      ],
      wordle: "#10",
    },
    {
      date: new Date(2022, 1, 26).toDateString(),
      scores: [
        {
          name: "CJ",
          score: [
            [0, 0, 1, 1, 2],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 2],
            [0, 1, 2, 1, 0],
            [0, 1, 2, 1, 1],
          ],
        },
        {
          name: "Dan",
          score: [
            [0, 0, 1, 1, 2],
            [0, 0, 0, 0, 0],
            [1, 1, 1, 1, 2],
            [0, 1, 2, 1, 0],
            [0, 1, 2, 1, 1],
          ],
        },
      ],
      wordle: "#29",
    },
  ]);
  const [curatedUsers, setCuratedUsers] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpenState(open);
  };

  useEffect(() => {
    const todaysDate = new Date().toDateString();
    if (!scores.some((dateObject) => dateObject.date == todaysDate)) {
      setScores([
        ...scores,
        {
          date: todaysDate,
          scores: [
            {
              name: "Bill",
              score: [
                [0, 1, 2, 1, 2],
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 2],
                [0, 1, 2, 1, 0],
                [0, 1, 2, 1, 1],
              ],
            },
            {
              name: "Jim",
              score: [
                [0, 0, 1, 1, 2],
                [0, 0, 0, 0, 0],
                [1, 1, 1, 1, 2],
                [0, 1, 2, 1, 0],
                [2, 2, 2, 2, 2],
              ],
            },
          ],
          wordle: "",
        },
      ]);
    }
  }, [
    modalOpenState,
    curateUserModalState,
    drawerOpenState,
    scores,
    curatedUsers,
  ]);

  useEffect(() => {
    let userFeed = [];
    scores.forEach((dataObject) => {
      dataObject.scores.forEach((userScoreObject) => {
        userFeed.push({
          name: userScoreObject.name,
          isShowing: true, // TODO persist this value in db
        });
      });
    });

    setCuratedUsers(userFeed);
  }, []);

  const handleDropAddScore = (newScore) => {
    let currentScores = scores;
    let index = currentScores.findIndex(
      (dateObject) => dateObject.date == new Date().toDateString()
    );

    if (index > -1) {
      // date object exists, append new score value to scores array
      currentScores[index].scores.push(newScore);
      if (currentScores[index].wordle == "" && newScore.wordle != "") {
        currentScores[index].wordle = newScore.wordle;
      }
      setScores(currentScores);
    } else {
      // date object does not exist, need to instantiate one and then add the new score to its scores array
      let newWordleDateObject = {
        date: new Date().toDateString(),
        scores: [newScore],
        wordle: newScore.wordle,
      };
      setScores([...scores, newWordleDateObject]);
    }

    console.log({ latestScores: scores });
  };

  return (
    <>
      <Navbar toggleDrawer={toggleDrawer} drawerOpenState={drawerOpenState} />
      <Cards
        scores={scores}
        curatedUsers={curatedUsers}
        setmodalOpenState={setmodalOpenState}
      />
      <RightDrawer
        drawerOpenState={drawerOpenState}
        toggleDrawer={toggleDrawer}
        setmodalOpenState={setmodalOpenState}
        setCurateUserModalState={setCurateUserModalState}
      />
      <Modal
        setmodalOpenState={setmodalOpenState}
        modalOpenState={modalOpenState}
        handleDropAddScore={handleDropAddScore}
      />
      <CurateUsersModal
        curatedUsers={curatedUsers}
        setCurateUserModalState={setCurateUserModalState}
        curateUserModalState={curateUserModalState}
        setCuratedUsers={setCuratedUsers}
      />
    </>
  );
}

export default App;
