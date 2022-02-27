import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function ScoreGrid({score}) {

  console.log({
    scoreGrid: 'Score Grid',
    score // [ [],[],[],[],[] ]
  });

  // 🟩 green square emoji
  // 🟨 yellow square emoji
  // ⬛ black square emoji
  return (

    <div>
      {score && score.map((scorearray, index)=>(
        <div key={index}>
        <Grid
          container
          key={index}
          justifyContent="center"
          spacing={0.25}
          direction="row"
        >
            <Grid 
            sx={{ mt: '1px', display: 'inline-flex', gap: '1px', direction: 'row', }}
            key={index} 
            item>
              {scorearray.map((colorNumber, index) => (
                <Paper
                key={index}
                  sx={{
                    borderRadius: 0,
                    height: 15,
                    width: 15,
                    backgroundColor: () => {
                      return colorNumber == 0
                        ? "#C4C4C4"
                        : colorNumber == 1
                        ? "#f1c40f"
                        : "#2ecc71";
                    },
                  }}
                />
              ))}
            </Grid>
        </Grid>
        </div>
        
      ))}
    </div>

  );
}

export default ScoreGrid;
