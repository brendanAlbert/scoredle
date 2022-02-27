import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Cards from './components/Cards'
import RightDrawer from './components/Drawer';
import Modal from './components/Modal';

function App() {
  const [drawerOpenState, setDrawerOpenState] = useState(false);
  const [modalOpenState, setmodalOpenState] = useState(false);
  const [scores, setScores] = useState([]);

  /*
  [
    {
      date: 'Wed Feb 23 2022',
      scores: [
        {name: 'Brendan', score: [[0,1,2,1,2],[],[],[],[]]},
        {name: 'Cameron', score: [[0,0,1,1,2],[],[],[],[]]},
      ]
    }
  ]
  
  */

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawerOpenState(open);
  };

  useEffect(() => {
    const todaysDate = new Date().toDateString();
    if(!scores.some(dateObject => dateObject.date == todaysDate)) {
      setScores([...scores, {
        date: todaysDate,
        // 0 = gray box, 1 = yellow box, 2 = green box
        scores: [
          {name: 'Brendan', score: [[0,1,2,1,2],[0,0,0,0,0],[1,1,1,1,2],[0,1,2,1,0],[0,1,2,1,1]]},
          {name: 'Cameron', score: [[0,0,1,1,2],[0,0,0,0,0],[1,1,1,1,2],[0,1,2,1,0],[2,2,2,2,2]]},
          // {name: 'Collin', score: [[0,0,1,1,2],[1,1,1,1,2],[0,1,2,1,0],[2,2,2,2,2]]},
          // {name: 'KC', score: [[0,0,1,1,2],[0,0,0,0,0],[1,1,1,1,2],[0,1,2,1,0],[0,1,2,1,1]]},
          // {name: 'Lauren', score: [[0,0,1,1,2],[0,0,0,0,0],[1,1,1,1,2],[0,1,2,1,0],[0,1,2,1,1]]},
          // {name: 'Fifi', score: [[0,0,1,1,2],[0,0,0,0,0],[1,1,1,1,2],[0,1,2,1,0],[0,1,2,1,1]]},
        ]
      }])
    }

  }, [modalOpenState, drawerOpenState, scores]);

  const handleDropAddScore = (newScore) => {
    /*
    {
      name: '<user_name>',
      scores: [
          [0,0,0,0,1],
          [1,0,0,0,2],
      ]
    }
    */

    /* currentScores array of objects
    [
      {
        date: "", 
        scores: [
          {name:'', score: []},
          {name:'', score: []}
        ]
      },
      {
        date: "", 
        scores: [
          {name:'', score: []},
          {name:'', score: []}
        ]
      },

    ]
    */

    let currentScores = scores;
    let index = currentScores.findIndex((dateObject) => dateObject.date == new Date().toDateString());
    
    if (index > -1) {
      // date object exists, append new score value to scores array
      currentScores[index].scores.push(newScore);
      setScores(currentScores)

    } else {
      // date object does not exist, need to instantiate one and then add the new score to its scores array
      let newWordleDateObject = {
        date: new Date().toDateString(),
        scores: [newScore]
      }
      setScores([...scores, newWordleDateObject])
    }
  }

  return (
    <>
    <Navbar toggleDrawer={toggleDrawer} drawerOpenState={drawerOpenState}/>
    <Cards scores={scores}/>
    <RightDrawer 
      drawerOpenState={drawerOpenState} 
      toggleDrawer={toggleDrawer} 
      setmodalOpenState={setmodalOpenState}
      />
    <Modal 
      setmodalOpenState={setmodalOpenState} 
      modalOpenState={modalOpenState}
      handleDropAddScore={handleDropAddScore}
      />
    </>
  )
}

export default App
