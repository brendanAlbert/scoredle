import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import Card from "./Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { guid } from "../helpers/helpers";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth0 } from "@auth0/auth0-react";

export default function Cards({ scores, curatedUsers, loading }) {
    const { user, isLoading } = useAuth0();

    const [cardsScores, setcardsScores] = useState([]);

    useEffect(() => {
        console.log({ line: 16, scores, curatedUsers });

        let sortedScoredleDateObjectsArray = scores.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        let filtered = sortedScoredleDateObjectsArray.map((dateObject) => {
            if (curatedUsers && curatedUsers.length > 0) {
                console.log({
                    line: 24,
                    curatedUsers,
                    dateObject,
                });
                let filteredScores = dateObject.scores.filter((scoreUser) => {
                    console.log({ line: 30, scoreUser, user });
                    // if (scoreUser.name === "Koopa") {
                    //     return true;
                    // }

                    return curatedUsers.some(
                        (cu) => cu.name == scoreUser.name && cu.show
                    );
                });
                console.log({
                    line: 32,
                    filteredScores,
                });
                // if (filteredScores.length > 0) {
                let newDateObject = {
                    date: dateObject.date,
                    scores: filteredScores,
                };
                return newDateObject;
                // } else {
                //   return { date: dateObject.date, scores: dateObject.scores };
                // }
            } else {
                return dateObject;
            }

            // console.log({ filteredScores });
        });

        // let filtered = scores;
        setcardsScores(filtered);

        // console.log({
        //   sortedScoredleDateObjectsArray,
        //   scores,
        //   curatedUsers,
        //   filtered,
        //   cardsScores,
        //   // filteredScores
        // });
    }, [scores, curatedUsers]);

    return (
        <Container sx={{ mb: "100px" }} maxWidth="lg">
            <Typography
                variant="h5"
                align="center"
                component="div"
                sx={{
                    color: "#ffffff",
                    mt: 11,
                    typography: "body1",
                    flexGrow: 1,
                }}
            >
                wordle scores
            </Typography>

            {loading || isLoading ? (
                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {cardsScores &&
                        cardsScores.map((dateObject) => (
                            <div key={guid()}>
                                <Typography
                                    variant="h6"
                                    align="center"
                                    component="div"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    sx={{
                                        color: "#888888",
                                        mt: 3,
                                        typography: "body2",
                                        flexGrow: 1,
                                    }}
                                >
                                    {dateObject.date}
                                </Typography>

                                <Box
                                    sx={{
                                        mt: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    spacing={2}
                                >
                                    {dateObject?.scores.map((score) => (
                                        <div key={guid()}>
                                            <Card score={score} />
                                        </div>
                                    ))}

                                    {dateObject?.scores?.length == 0 && (
                                        <Typography
                                            variant="h5"
                                            align="center"
                                            component="div"
                                            sx={{
                                                color: "#ffffff",
                                                mt: 1,
                                                typography: "body1",
                                                flexGrow: 1,
                                            }}
                                            style={{ fontSize: "10px" }}
                                        >
                                            No scores yet today. Be the first!
                                        </Typography>
                                    )}
                                </Box>
                            </div>
                        ))}
                </>
            )}
        </Container>
    );
}
