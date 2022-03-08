import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Cards from "./components/Feed/Cards";
import RightDrawer from "./components/Drawer/Drawer";
import Modal from "./components/Modals/Modal";
import WorldleModal from "./components/Modals/WorldleModal";
import CurateUsersModal from "./components/Modals/CurateUsersModal";
import { useAuth0 } from "@auth0/auth0-react";

const apiurl = import.meta.env.VITE_API_URL;
const fetchUsersUrl = import.meta.env.VITE_FETCH_USERS_URL;
const postScoredleUrl = import.meta.env.VITE_POST_SCOREDLE_URL;
const env = import.meta.env.VITE_NODE_ENV;
const postUserUrl = import.meta.env.VITE_POST_USER_URL;

function App() {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  const [modalOpenState, setmodalOpenState] = useState(false);
  const [worldleModalOpenState, setWorldleModalOpenState] = useState(false);
  const [curateUserModalState, setCurateUserModalState] = useState(false);
  const [scores, setScores] = useState([]);
  // const [worldlescores, setworldleScores] = useState([]);
  const [initialScoreState, setinitialScoreState] = useState([]);
  const [curatedUsers, setCuratedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();
  // const [toggleState, setToggleState] = useState({
  //   wordle: true,
  //   worldle: false,
  // });
  const [toggleState, setToggleState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpenState(open);
  };

  const update = async () => {
    let result = await fetch(apiurl);
    let scoredleData = await result.json();

    setTimeout(
      () => {
        setScores(scoredleData);
        setinitialScoreState(scoredleData);

        const date = new Date().toDateString();
        let index = scoredleData.findIndex(
          (dateObject) => dateObject.date == date
        );

        console.log({
          //   date,
          //   dateType: typeof date,
          //   date1: scoredleData[0],
          //   date1Type: typeof scoredleData[0].date,
          //   date2: scoredleData[1],
          //   date1match: date == scoredleData[0].date,
          //   date2match: date == scoredleData[1].date,
          //   scores,
          scoredleData,
          //   index,
        });

        if (scoredleData.length == 0 || index == -1) {
          let newWordleDateObject = {
            date: new Date().toDateString(),
            scores: [],
            wordle: "",
            worldle: "",
          };
          setScores([newWordleDateObject]);
          setinitialScoreState([newWordleDateObject]);
          persistScoredles([newWordleDateObject]);
          setLoading(false);
        }
      },
      env === "development" ? 2000 : 0
    );
  };

  const persistScoredles = async (newScoredleState) => {
    await fetch(postScoredleUrl, {
      method: "POST",
      body: JSON.stringify(newScoredleState),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };

  const updateUserFeed = async () => {
    let usersResult;
    let usersData;

    if (!user) return;

    usersResult = await fetch(fetchUsersUrl, {
      method: "POST",
      // body: user.given_name,
      body: "Mario",
      //   body: "Bowser",
    });

    usersData = await usersResult.json();

    /*
      for each scoredle date object
        for each user in scores

    */
    console.log({
      line: 114,
      scores,
      usersData,
    });

    let userFeed = [];

    if (usersData && usersData?.feed?.length > 0) {
      userFeed = usersData.feed;
    } else {
      scores.forEach((dataObject) => {
        dataObject.scores.forEach((userScoreObject) => {
          userFeed.push({
            name: userScoreObject.name,
            show: true, // TODO 🚧 use persisted value instead
          });
        });
      });
      userFeed.push({
        name: "Mario", // TODO 🚧 user.given_name
        // name: user.given_name, // TODO 🚧 user.given_name
        show: true,
      });

      // Add current user to all of the other user's feed array in userdb.json
    }

    console.log({
      line: 135,
      scores,
      usersData,
      userFeed,
    });

    // if (usersData.feed) {
    //   setCuratedUsers(usersData.feed);
    // }
    if (userFeed) {
      setCuratedUsers(userFeed);
    }

    console.log({ line: 151 });

    await fetch(postUserUrl, {
      method: "POST",
      body: JSON.stringify({
        // user: user.given_name,
        // user: "Bowser",
        user: "Mario",
        feed: userFeed,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(async () => {
    await update();
  }, []);

  useEffect(async () => {
    await updateUserFeed();
  }, [initialScoreState, user]);

  useEffect(async () => {
    setLoading(!(scores.length > 0));
  }, [scores]);

  const handleDropAddScore = (newScore) => {
    let currentScores = [...scores];
    let index = currentScores.findIndex(
      (dateObject) => dateObject.date == new Date().toDateString()
    );

    let scoreExistsForThisUserIndex = currentScores[index].scores.findIndex(
      (userScoreObject) => userScoreObject.name == newScore.name
    );

    if (scoreExistsForThisUserIndex > -1) {
      currentScores[index].scores[scoreExistsForThisUserIndex].score =
        newScore.score;
    } else {
      let lastIndex = Math.max(0, currentScores[index].scores.length);
      currentScores[index].scores = [newScore];
    }

    if (currentScores[index].wordle == "" && newScore.wordle != "") {
      currentScores[index].wordle = newScore.wordle;
    }
    persistScoredles(currentScores);
    setScores(currentScores);
  };

  const handleWorldleAddScore = (newScore) => {
    const currentWorldleScores = [...scores];
    let index = currentWorldleScores.findIndex(
      (dateObject) => dateObject.date == new Date().toDateString()
    );

    let scoreExistsForThisUserIndex = currentWorldleScores[
      index
    ].scores.findIndex(
      (userScoreObject) => userScoreObject.name == newScore.name
    );

    if (scoreExistsForThisUserIndex > -1) {
      currentWorldleScores[index].scores[
        scoreExistsForThisUserIndex
      ].worldleScore = newScore.worldleScore;
    } else {
      let lastIndex = Math.max(0, currentWorldleScores[index].scores.length);
      currentWorldleScores[index].scores = [newScore];
    }

    if (currentWorldleScores[index].worldle == "" && newScore.worldle != "") {
      currentWorldleScores[index].worldle = newScore.worldle;
    }
    persistScoredles(currentWorldleScores);
    setScores(currentWorldleScores);
  };

  return (
    <>
      <Navbar
        toggleState={toggleState}
        toggleDrawer={toggleDrawer}
        drawerOpenState={drawerOpenState}
      />
      <Cards
        scores={scores}
        toggleState={toggleState}
        loading={loading}
        curatedUsers={curatedUsers}
        setmodalOpenState={setmodalOpenState}
      />
      <RightDrawer
        toggleState={toggleState}
        setToggleState={setToggleState}
        drawerOpenState={drawerOpenState}
        toggleDrawer={toggleDrawer}
        setmodalOpenState={setmodalOpenState}
        setWorldleModalOpenState={setWorldleModalOpenState}
        setCurateUserModalState={setCurateUserModalState}
      />
      <Modal
        setmodalOpenState={setmodalOpenState}
        modalOpenState={modalOpenState}
        handleDropAddScore={handleDropAddScore}
      />
      <WorldleModal
        setWorldleModalOpenState={setWorldleModalOpenState}
        worldleModalOpenState={worldleModalOpenState}
        handleWorldleAddScore={handleWorldleAddScore}
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
