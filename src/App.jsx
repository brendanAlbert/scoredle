import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import WordleFeed from "./components/Feed/WordleFeed";
import WorldleFeed from "./components/Feed/WorldleFeed";
import StateleFeed from "./components/Feed/StateleFeed";
import DeutschlandleFeed from "./components/Feed/DeutschlandleFeed";
import RightDrawer from "./components/Drawer/Drawer";
import Modal from "./components/Modals/Modal";
import WorldleModal from "./components/Modals/WorldleModal";
import StateleModal from "./components/Modals/States/StateleModal";
import DeutschlandleModal from "./components/Modals/Deutschlandle/DeutschlandleModal";
import StatsModal from "./components/Stats/StatsModal";
import CurateUsersModal from "./components/Modals/CurateUsersModal";
import { useAuth0 } from "@auth0/auth0-react";
import AddSvgModal from "./components/Modals/Svg/AddSvgModal";
import Iconbar from "./components/Iconbar/Iconbar";
import LeaderboardModal from "./components/Modals/Leaderboard/LeaderboardModal";
import FeaturesModal from "./components/Modals/Features/FeaturesModal";
import { Messenger } from "./components/Messenger/Messenger";

const apiurl = import.meta.env.VITE_API_URL;
const fetchUsersUrl = import.meta.env.VITE_FETCH_USERS_URL;
const postScoredleUrl = import.meta.env.VITE_POST_SCOREDLE_URL;
const env = import.meta.env.VITE_NODE_ENV;
const postUserUrl = import.meta.env.VITE_POST_USER_URL;

function App() {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  const [modalOpenState, setmodalOpenState] = useState(false);
  const [worldleModalOpenState, setWorldleModalOpenState] = useState(false);
  const [stateleModalOpenState, setStateleModalOpenState] = useState(false);
  const [deutschlandleModalOpenState, setDeutschlandleModalOpenState] =
    useState(false);
  const [curateUserModalState, setCurateUserModalState] = useState(false);
  const [statsModalOpenState, setStatsModalOpenState] = useState(false);
  const [addSvgModalOpen, setaddSvgModalOpen] = useState(false);
  const [LeaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [featuresModalState, setfeaturesModalState] = useState(false);
  const [scores, setScores] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [dontShowUsersList, setDontShowUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();
  const [wordleCardsLoaded, setWordleCardsLoaded] = useState(5);
  const [worldleCardsLoaded, setWorldleCardsLoaded] = useState(5);
  const [stateleCardsLoaded, setStateleCardsLoaded] = useState(5);
  const [deutschlandleCardsLoaded, setDeutschlandleCardsLoaded] = useState(5);
  const [toggleState, setToggleState] = useState("word");

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
        setLoading(false);

        const date = new Date().toDateString();
        let index = scoredleData.findIndex(
          (dateObject) => dateObject.date == date
        );

        if (scoredleData.length == 0 || index == -1) {
          let newWordleDateObject = {
            date: new Date().toDateString(),
            scores: [],
            wordle: "",
            worldle: "",
          };
          setScores([...scoredleData, newWordleDateObject]);
          persistScoredles(newWordleDateObject);
          setLoading(false);
        }
      },
      env === "development" ? 2000 : 0
    );
  };

  const persistScoredles = async (newScoredleDateObject) => {
    const dtoUser = user?.given_name || import.meta.env.VITE_USER;

    let dataTransferScoredleObject = {
      date: newScoredleDateObject.date,
      scores: newScoredleDateObject.scores,
      user: dtoUser,
    };

    if (dtoUser === import.meta.env.VITE_ADMIN) {
      dataTransferScoredleObject = {
        ...dataTransferScoredleObject,
        ...newScoredleDateObject,
      };
    }

    await fetch(postScoredleUrl, {
      method: "POST",
      body: JSON.stringify(dataTransferScoredleObject),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
  };

  const fetchAllUsers = async () => {
    let usersResult = await fetch(fetchUsersUrl, {
      method: "GET",
    });
    return usersResult;
  };

  const updateUserFeed = async () => {
    if (!user) return;

    let localAllUsersRaw = await fetchAllUsers();

    let localAllUsers = await localAllUsersRaw.json();

    let index = localAllUsers.findIndex(
      (userobj) =>
        userobj.user === (import.meta.env.VITE_USER || user?.given_name)
    );

    if (index === -1) {
      let newUserObject = {
        user: import.meta.env.VITE_USER || user?.given_name,
        dontShowUsers: [],
      };
      let newAllUsersResult = [...localAllUsers, newUserObject];

      let listAllUserNames = newAllUsersResult.reduce((prev, curr, idx, []) => {
        return prev.concat(curr.user);
      }, []);
      setAllUsers(listAllUserNames);
      persistNewDontShowUsersList(newUserObject.dontShowUsers);
    } else {
      let listAllUserNames = localAllUsers.reduce((prev, curr, idx, []) => {
        return prev.concat(curr.user);
      }, []);
      setAllUsers(listAllUserNames);
      const dontShowUsersList = localAllUsers[index].dontShowUsers;

      if (dontShowUsersList) {
        setDontShowUsersList(dontShowUsersList);
      }
    }
  };

  const persistNewDontShowUsersList = async (newDontShowUsersList) => {
    await fetch(postUserUrl, {
      method: "POST",
      body: JSON.stringify({
        user: import.meta.env.VITE_USER || user?.given_name,
        dontShowUsers:
          newDontShowUsersList && newDontShowUsersList.length > 0
            ? newDontShowUsersList
            : [],
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
  }, [user]);

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
      currentScores[index].scores[scoreExistsForThisUserIndex].wordle =
        newScore.wordle;
    } else {
      let lastIndex = Math.max(0, currentScores[index].scores.length);
      currentScores[index].scores[lastIndex] = {
        name: newScore.name,
        score: newScore.score,
        wordle: newScore.wordle,
      };
    }

    if (newScore.word) {
      currentScores[index].word = newScore.word;
    }

    if (currentScores[index].wordle == "" && newScore.wordle != "") {
      currentScores[index].wordle = newScore.wordle;
    }

    persistScoredles(currentScores[index]);
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
      currentWorldleScores[index].scores[scoreExistsForThisUserIndex].worldle =
        newScore.worldle;
    } else {
      let lastIndex = Math.max(0, currentWorldleScores[index].scores.length);
      currentWorldleScores[index].scores[lastIndex] = {
        name: newScore.name,
        worldleScore: newScore.worldleScore,
        worldle: newScore.worldle,
      };
    }

    if (newScore.country) {
      currentWorldleScores[index].country = newScore.country;
    }

    if (newScore.svg) {
      currentWorldleScores[index].svg = newScore.svg;
    }

    if (newScore.region) {
      currentWorldleScores[index].region = newScore.region;
    }

    if (currentWorldleScores[index].worldle == "" && newScore.worldle != "") {
      currentWorldleScores[index].worldle = newScore.worldle;
    }

    persistScoredles(currentWorldleScores[index]);
    setScores(currentWorldleScores);
  };

  const handleStateleAddScore = (newScore) => {
    const currentStateleScores = [...scores];
    let index = currentStateleScores.findIndex(
      (dateObject) => dateObject.date == new Date().toDateString()
    );

    let scoreExistsForThisUserIndex = currentStateleScores[
      index
    ].scores.findIndex(
      (userScoreObject) => userScoreObject.name == newScore.name
    );

    if (scoreExistsForThisUserIndex > -1) {
      currentStateleScores[index].scores[
        scoreExistsForThisUserIndex
      ].state_score = newScore.state_score;
      currentStateleScores[index].scores[scoreExistsForThisUserIndex].statele =
        newScore.statele;
    } else {
      let lastIndex = Math.max(0, currentStateleScores[index].scores.length);
      currentStateleScores[index].scores[lastIndex] = {
        name: newScore.name,
        state_score: newScore.state_score,
        statele: newScore.statele,
      };
    }

    if (newScore.state) {
      currentStateleScores[index].state = newScore.state;
    }

    if (newScore.state_svg) {
      currentStateleScores[index].state_svg = newScore.state_svg;
    }

    if (currentStateleScores[index].statele == "" && newScore.statele != "") {
      currentStateleScores[index].statele = newScore.statele;
    }

    persistScoredles(currentStateleScores[index]);
    setScores(currentStateleScores);
  };

  const handleDeutschlandleAddScore = (newScore) => {
    const currentDeutschlandleScores = [...scores];
    let index = currentDeutschlandleScores.findIndex(
      (dateObject) => dateObject.date == new Date().toDateString()
    );

    let scoreExistsForThisUserIndex = currentDeutschlandleScores[
      index
    ].scores.findIndex(
      (userScoreObject) => userScoreObject.name == newScore.name
    );

    if (scoreExistsForThisUserIndex > -1) {
      currentDeutschlandleScores[index].scores[
        scoreExistsForThisUserIndex
      ].de_score = newScore.de_score;
    } else {
      let lastIndex = Math.max(
        0,
        currentDeutschlandleScores[index].scores.length
      );
      currentDeutschlandleScores[index].scores[lastIndex] = {
        name: newScore.name,
        de_score: newScore.de_score,
      };
    }

    if (newScore.de_state) {
      currentDeutschlandleScores[index].de_state = newScore.de_state;
    }

    if (newScore.de_svg) {
      currentDeutschlandleScores[index].de_svg = newScore.de_svg;
    }

    if (
      currentDeutschlandleScores[index].de_state == "" &&
      newScore.de_state != ""
    ) {
      currentDeutschlandleScores[index].de_state = newScore.de_state;
    }

    persistScoredles(currentDeutschlandleScores[index]);
    setScores(currentDeutschlandleScores);
  };

  const filteredWordleScores = useMemo(() => {
    let sortedScoredleDateObjectsArray = scores?.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let filtered = sortedScoredleDateObjectsArray?.map((dateObject) => {
      let filteredScores = dateObject?.scores?.filter((scoreUser) => {
        return !dontShowUsersList?.some((dsu) => dsu == scoreUser.name);
      });

      return {
        date: dateObject.date,
        scores: filteredScores,
        word: dateObject.word,
      };
    });

    let shorterList = filtered.splice(0, wordleCardsLoaded);

    return shorterList;
  }, [scores, dontShowUsersList, wordleCardsLoaded]);

  const filteredWorldleScores = useMemo(() => {
    let sortedScoredleDateObjectsArray = scores?.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let filtered = sortedScoredleDateObjectsArray?.map((dateObject) => {
      let filteredScores = dateObject?.scores?.filter((scoreUser) => {
        return !dontShowUsersList?.some((dsu) => dsu == scoreUser.name);
      });

      return {
        date: dateObject.date,
        scores: filteredScores,
        svg: dateObject.svg,
        country: dateObject.country,
      };
    });

    let shorterWorldleList = filtered.splice(0, worldleCardsLoaded);

    return shorterWorldleList;
  }, [scores, dontShowUsersList, worldleCardsLoaded]);

  const filteredStateleScores = useMemo(() => {
    let sortedScoredleDateObjectsArray = scores?.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let filtered = sortedScoredleDateObjectsArray?.map((dateObject) => {
      let filteredScores = dateObject?.scores?.filter((scoreUser) => {
        return !dontShowUsersList?.some((dsu) => dsu == scoreUser.name);
      });

      return {
        date: dateObject.date,
        scores: filteredScores,
        state_svg: dateObject.state_svg,
        state: dateObject.state,
      };
    });

    let shorterStateleList = filtered.splice(0, stateleCardsLoaded);

    return shorterStateleList;
  }, [scores, dontShowUsersList, stateleCardsLoaded]);

  const filteredDeutschlandleScores = useMemo(() => {
    let sortedScoredleDateObjectsArray = scores?.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    let filtered = sortedScoredleDateObjectsArray?.map((dateObject) => {
      let filteredScores = dateObject?.scores?.filter((scoreUser) => {
        return !dontShowUsersList?.some((dsu) => dsu == scoreUser.name);
      });

      return {
        date: dateObject.date,
        scores: filteredScores,
        de_svg: dateObject.de_svg,
        de_state: dateObject.de_state,
      };
    });

    let shorterGermanStateList = filtered.splice(0, deutschlandleCardsLoaded);

    return shorterGermanStateList;
  }, [scores, dontShowUsersList, deutschlandleCardsLoaded]);

  return (
    <>
      <Navbar toggleState={toggleState} toggleDrawer={toggleDrawer} />

      {/* {!loading && <Messenger />} */}

      <Iconbar
        loading={loading}
        toggleState={toggleState}
        setWorldleModalOpenState={setWorldleModalOpenState}
        setStateleModalOpenState={setStateleModalOpenState}
        setDeutschlandleModalOpenState={setDeutschlandleModalOpenState}
        setaddSvgModalOpen={setaddSvgModalOpen}
        setLeaderboardModalOpen={setLeaderboardModalOpen}
        setmodalOpenState={setmodalOpenState}
      />

      {toggleState === "word" && (
        <WordleFeed
          max={scores.length}
          filteredWordleScores={filteredWordleScores}
          loading={loading}
          wordleCardsLoaded={wordleCardsLoaded}
          setWordleCardsLoaded={setWordleCardsLoaded}
        />
      )}

      {toggleState === "world" && (
        <WorldleFeed
          max={scores.length}
          filteredWorldleScores={filteredWorldleScores}
          loading={loading}
          worldleCardsLoaded={worldleCardsLoaded}
          setWorldleCardsLoaded={setWorldleCardsLoaded}
        />
      )}

      {toggleState === "state" && (
        <StateleFeed
          max={scores.length}
          filteredStateleScores={filteredStateleScores}
          loading={loading}
          stateleCardsLoaded={stateleCardsLoaded}
          setStateleCardsLoaded={setStateleCardsLoaded}
        />
      )}

      {toggleState === "germany" && (
        <DeutschlandleFeed
          max={scores.length}
          filteredDeutschlandleScores={filteredDeutschlandleScores}
          loading={loading}
          deutschlandleCardsLoaded={deutschlandleCardsLoaded}
          setDeutschlandleCardsLoaded={setDeutschlandleCardsLoaded}
        />
      )}

      <RightDrawer
        toggleState={toggleState}
        setToggleState={setToggleState}
        drawerOpenState={drawerOpenState}
        toggleDrawer={toggleDrawer}
        setmodalOpenState={setmodalOpenState}
        setWorldleModalOpenState={setWorldleModalOpenState}
        setCurateUserModalState={setCurateUserModalState}
        setStatsModalOpenState={setStatsModalOpenState}
        setaddSvgModalOpen={setaddSvgModalOpen}
        setfeaturesModalState={setfeaturesModalState}
        setStateleModalOpenState={setStateleModalOpenState}
        setDeutschlandleModalOpenState={setDeutschlandleModalOpenState}
      />

      {modalOpenState && (
        <Modal
          setmodalOpenState={setmodalOpenState}
          modalOpenState={modalOpenState}
          handleDropAddScore={handleDropAddScore}
        />
      )}

      {worldleModalOpenState && (
        <WorldleModal
          setWorldleModalOpenState={setWorldleModalOpenState}
          worldleModalOpenState={worldleModalOpenState}
          handleWorldleAddScore={handleWorldleAddScore}
        />
      )}

      {stateleModalOpenState && (
        <StateleModal
          setStateleModalOpenState={setStateleModalOpenState}
          stateleModalOpenState={stateleModalOpenState}
          handleStateleAddScore={handleStateleAddScore}
        />
      )}

      {deutschlandleModalOpenState && (
        <DeutschlandleModal
          setDeutschlandleModalOpenState={setDeutschlandleModalOpenState}
          deutschlandleModalOpenState={deutschlandleModalOpenState}
          handleDeutschlandleAddScore={handleDeutschlandleAddScore}
        />
      )}

      {curateUserModalState && (
        <CurateUsersModal
          allUsers={allUsers}
          dontShowUsersList={dontShowUsersList}
          setCurateUserModalState={setCurateUserModalState}
          curateUserModalState={curateUserModalState}
          setDontShowUsersList={setDontShowUsersList}
          persistNewDontShowUsersList={persistNewDontShowUsersList}
        />
      )}

      {user && (
        <StatsModal
          setStatsModalOpenState={setStatsModalOpenState}
          statsModalOpenState={statsModalOpenState}
          scores={scores}
        />
      )}
      {addSvgModalOpen && (
        <AddSvgModal
          addSvgModalOpen={addSvgModalOpen}
          setaddSvgModalOpen={setaddSvgModalOpen}
        />
      )}
      {LeaderboardModalOpen && (
        <LeaderboardModal
          dontShowUsersList={dontShowUsersList}
          LeaderboardModalOpen={LeaderboardModalOpen}
          scores={scores}
          setLeaderboardModalOpen={setLeaderboardModalOpen}
        />
      )}
      {featuresModalState && (
        <FeaturesModal
          featuresModalState={featuresModalState}
          setfeaturesModalState={setfeaturesModalState}
        />
      )}
    </>
  );
}

export default App;
