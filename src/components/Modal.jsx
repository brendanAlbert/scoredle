
import { useEffect, useState } from 'react';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import DropZone from './DropZone';
import Button from '@mui/material/Button';


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 280,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: '#444',
//   border: '2px solid #FFFFFF',
  color: '#ffffff',
  p: 2,
  px: 4,
  pb: 3,
};

export default function ModalUnstyledComponent({ setmodalOpenState, modalOpenState, handleDropAddScore}) {

    const [score, setLocalScore] = useState('');

    useEffect(() => {
        console.log({modalOpenState, location: 'ModalUnstyled', score});

    }, [modalOpenState])

    const closeModal = () => {
        console.log('closing modal');
        setmodalOpenState(false)
    }

    const handleClick = () => {
        console.log({
            log: 'handleClick fired',
            score
        })
        // TODO send score {name: 'bob', scores: [[],[],[]]} ✅

        // TODO get name from logged in user

        // TODO clean and ensure the score the user passed in matches a certain form

        /*
            Wordle #230 1/6

            [][][][][]
            [][][][][]
            [][][][][]
            [][][][][]
        */

            // TODO map the gray/black yellow and green checkboxes to 0, 1, and 2

        handleDropAddScore({
            name: 'Long Ass Name',
            score: [
                [0,0,0,0,1],
                [1,0,0,0,2],
            ]
        })
        setLocalScore('')
        closeModal()
    }

  return (
    <div>
      <StyledModal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={modalOpenState}
        onClose={closeModal}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          {/* <h2 id="unstyled-modal-title">Paste your wordle score here</h2> */}
          <DropZone setScore={setLocalScore} score={score} />
          <Button onClick={handleClick} variant="contained">Submit Score</Button>
        </Box>
      </StyledModal>
    </div>
  );
}
