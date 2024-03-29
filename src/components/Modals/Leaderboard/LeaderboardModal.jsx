import { useMemo, useState } from "react";
import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@mui/material";
import LeaderboardChart from "./LeaderboardChart";
import { crownify, guid } from "../../../helpers/helpers";
import EuropeIcon from "../../../assets/europe.png";
import NorthAmericaIcon from "../../../assets/northAmerica.png";
import SouthAmericaIcon from "../../../assets/southAmerica.png";
import AsiaIcon from "../../../assets/asia.png";
import AfricaIcon from "../../../assets/africa.png";
import OceaniaIcon from "../../../assets/oceania.png";
import { USAIcon } from "../../../assets/icons/USAIcon";
import { Typography } from "@mui/material";

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

const Backdrop = styled("div")`
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    bgcolor: "#444",
    color: "#ffffff",
    padding: "20px",
    textAlign: "center",
    p: 6,
    px: 6,
    pb: 6,
};

const Letter = styled("span")({
    textTransform: "uppercase",
    padding: "4px",
    margin: "1px",
});

const LetterBox = styled("span")({
    minHeight: "25px",
    height: "25px",
    width: "25px",
    minWidth: "25px",
    border: "1px solid #FFF",
    marginRight: "2px",
});

const colors = ["#2ECC71", "#F1C40F", "#7F8C8D"];

const WLetterBox = styled("span")({
    fontSize: "clamp(12px, 2vw ,16px)",
    padding: "4px 6px",
    fontWeight: 600,
    marginRight: "2px",
});

const darkTheme = createTheme({ palette: { mode: "dark" } });

const regionMap = {
    af: "Africa",
    as: "Asia",
    na: "North America + Caribbean",
    sa: "Central + South America",
    eu: "Europe",
    me: "Middle East",
    oc: "Oceania",
};

const regionIconMap = {
    af: AfricaIcon,
    as: AsiaIcon,
    na: NorthAmericaIcon,
    sa: SouthAmericaIcon,
    eu: EuropeIcon,
    me: Math.floor(Math.random() * 2) % 2 == 0 ? AfricaIcon : AsiaIcon,
    oc: OceaniaIcon,
};

export default function LeaderboardModal({
    dontShowUsersList,
    LeaderboardModalOpen,
    setLeaderboardModalOpen,
    scores,
}) {
    let mobile = useMediaQuery(`(max-width: 662px)`);

    const sortedScores = scores?.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const [showNewText, setShowNewText] = useState([
        "af",
        "na",
        "sa",
        "as",
        "eu",
        "me",
        "oc",
        "us_max",
        "us_curr",
    ]);

    const removeOnHover = (regionString) => {
        let newShowNewTextArray = showNewText.filter(
            (txt) => txt != regionString
        );
        setShowNewText(newShowNewTextArray);
    };

    const closeModal = () => {
        setLeaderboardModalOpen(false);
    };

    const handleKeyPress = (event) => {
        event.preventDefault();
        const keys = ["Enter", "Space"];
        if (keys.includes(event.code)) {
            closeModal();
        }
    };

    const userWordleCrownScores = useMemo(() => {
        let user_wordle_crown_scores = {};
        scores.map((dateobject) => {
            dateobject.scores.map((userobject) => {
                if (user_wordle_crown_scores[userobject.name] === undefined) {
                    user_wordle_crown_scores[userobject.name] = 0;
                }
            });
            let winner = crownify(dateobject.scores, "wordle");
            if (winner) {
                user_wordle_crown_scores[winner]++;
            }
        });

        const sorted = Object.entries(user_wordle_crown_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const filtered = sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        return filtered;
    }, [scores]);

    const userWorldleCrownScores = useMemo(() => {
        let user_worldle_crown_scores = {};
        scores.map((dateobject) => {
            dateobject.scores.map((userobject) => {
                if (user_worldle_crown_scores[userobject.name] === undefined) {
                    user_worldle_crown_scores[userobject.name] = 0;
                }
            });
            let winner = crownify(dateobject.scores, "worldle");
            if (winner) {
                user_worldle_crown_scores[winner]++;
            }
        });

        const sorted = Object.entries(user_worldle_crown_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const filtered = sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        return filtered;
    }, [scores]);

    const streaksWordle = useMemo(() => {
        let user_word_curr_streaks = {};
        let user_word_max_streaks = {};

        sortedScores.map((dateobject) => {
            dateobject.scores.map((userobject) => {
                if (
                    userobject?.score?.length > 0 &&
                    userobject?.score?.length < 6
                ) {
                    if (user_word_curr_streaks[userobject.name] >= 0) {
                        user_word_curr_streaks[userobject.name]++;
                        let max = user_word_max_streaks[userobject.name]
                            ? user_word_max_streaks[userobject.name]
                            : 0;
                        let curr = user_word_curr_streaks[userobject.name];
                        user_word_max_streaks[userobject.name] = Math.max(
                            max,
                            curr
                        );
                    } else if (
                        user_word_curr_streaks[userobject.name] === undefined
                    ) {
                        user_word_curr_streaks[userobject.name] = 1;
                        user_word_max_streaks[userobject.name] = 1;
                    }
                } else if (userobject?.score?.length === 6) {
                    if (
                        userobject?.score[5]?.filter((x) => x == 2).length === 5
                    ) {
                        if (user_word_curr_streaks[userobject.name] >= 0) {
                            user_word_curr_streaks[userobject.name]++;
                            let max = user_word_max_streaks[userobject.name]
                                ? user_word_max_streaks[userobject.name]
                                : 0;
                            let curr = user_word_curr_streaks[userobject.name];
                            user_word_max_streaks[userobject.name] = Math.max(
                                max,
                                curr
                            );
                        } else if (
                            user_word_curr_streaks[userobject.name] ===
                            undefined
                        ) {
                            user_word_curr_streaks[userobject.name] = 1;
                            user_word_max_streaks[userobject.name] = 1;
                        }
                    } else {
                        user_word_curr_streaks[userobject.name] = 0;
                    }
                }
            });
        });

        const maxsorted = Object.entries(user_word_max_streaks)?.sort(
            ([, a], [, b]) => b - a
        );

        const maxfiltered = maxsorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const currsorted = Object.entries(user_word_curr_streaks)?.sort(
            ([, a], [, b]) => b - a
        );

        const currfiltered = currsorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        return [maxfiltered, currfiltered];
    }, [scores]);

    const streaksWorldle = useMemo(() => {
        let user_world_curr_streaks = {};
        let user_world_max_streaks = {};

        sortedScores.map((dateobject) => {
            dateobject.scores.map((userobject) => {
                if (
                    userobject?.worldleScore?.length > 0 &&
                    userobject?.worldleScore?.length < 6
                ) {
                    if (user_world_curr_streaks[userobject.name] >= 0) {
                        user_world_curr_streaks[userobject.name]++;

                        let max = user_world_max_streaks[userobject.name]
                            ? user_world_max_streaks[userobject.name]
                            : 0;
                        let curr = user_world_curr_streaks[userobject.name];
                        user_world_max_streaks[userobject.name] = Math.max(
                            curr,
                            max
                        );
                    } else if (
                        user_world_curr_streaks[userobject.name] === undefined
                    ) {
                        user_world_curr_streaks[userobject.name] = 1;
                        user_world_max_streaks[userobject.name] = 1;
                    }
                } else if (userobject?.worldleScore?.length === 6) {
                    if (
                        userobject?.worldleScore[5]?.filter((x) => x == 2)
                            .length === 5
                    ) {
                        if (user_world_curr_streaks[userobject.name] >= 0) {
                            user_world_curr_streaks[userobject.name]++;

                            let max = user_world_max_streaks[userobject.name]
                                ? user_world_max_streaks[userobject.name]
                                : 0;
                            user_world_max_streaks[userobject.name] = Math.max(
                                max,
                                user_world_curr_streaks[userobject.name]
                            );
                        } else if (
                            user_world_curr_streaks[userobject.name] ===
                            undefined
                        ) {
                            user_world_curr_streaks[userobject.name] = 1;
                            user_world_max_streaks[userobject.name] = 1;
                        }
                    } else {
                        user_world_curr_streaks[userobject.name] = 0;
                    }
                }
            });
        });

        const maxsorted = Object.entries(user_world_max_streaks)?.sort(
            ([, a], [, b]) => b - a
        );

        const currsorted = Object.entries(user_world_curr_streaks)?.sort(
            ([, a], [, b]) => b - a
        );

        const maxfiltered = maxsorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const currfiltered = currsorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        return [maxfiltered, currfiltered];
    }, [scores]);

    const regionScores = useMemo(() => {
        let user_region_scores = {};

        let af_scores = {};
        let na_scores = {};
        let sa_scores = {};
        let eu_scores = {};
        let me_scores = {};
        let as_scores = {};
        let oc_scores = {};

        scores.map((dateobject) => {
            dateobject.scores.map((userobject) => {
                if (userobject.worldleScore) {
                    let len = userobject.worldleScore.length;
                    if (
                        (len > 0 && len < 6) ||
                        (len === 6 &&
                            userobject?.worldleScore[5]?.filter((x) => x == 2)
                                .length === 5)
                    ) {
                        if (dateobject.region === "af") {
                            af_scores[userobject.name] =
                                af_scores[userobject.name] >= 0
                                    ? af_scores[userobject.name] + 1
                                    : 1;
                        }

                        if (dateobject.region === "na") {
                            na_scores[userobject.name] =
                                na_scores[userobject.name] >= 0
                                    ? na_scores[userobject.name] + 1
                                    : 1;
                        }

                        if (dateobject.region === "sa") {
                            sa_scores[userobject.name] =
                                sa_scores[userobject.name] >= 0
                                    ? sa_scores[userobject.name] + 1
                                    : 1;
                        }

                        if (dateobject.region === "eu") {
                            eu_scores[userobject.name] =
                                eu_scores[userobject.name] >= 0
                                    ? eu_scores[userobject.name] + 1
                                    : 1;
                        }

                        if (dateobject.region === "me") {
                            me_scores[userobject.name] =
                                me_scores[userobject.name] >= 0
                                    ? me_scores[userobject.name] + 1
                                    : 1;
                        }

                        if (dateobject.region === "as") {
                            as_scores[userobject.name] =
                                as_scores[userobject.name] >= 0
                                    ? as_scores[userobject.name] + 1
                                    : 1;
                        }

                        if (dateobject.region === "oc") {
                            oc_scores[userobject.name] =
                                oc_scores[userobject.name] >= 0
                                    ? oc_scores[userobject.name] + 1
                                    : 1;
                        }
                    }
                }
            });
        });

        const africa_sorted = Object.entries(af_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const africa_filtered = africa_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const as_sorted = Object.entries(as_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const as_filtered = as_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const na_sorted = Object.entries(na_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const na_filtered = na_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const sa_sorted = Object.entries(sa_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const sa_filtered = sa_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const me_sorted = Object.entries(me_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const me_filtered = me_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const oc_sorted = Object.entries(oc_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const oc_filtered = oc_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const europe_sorted = Object.entries(eu_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const europe_filtered = europe_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        user_region_scores = {
            af: africa_filtered,
            na: na_filtered,
            sa: sa_filtered,
            as: as_filtered,
            me: me_filtered,
            eu: europe_filtered,
            oc: oc_filtered,
        };

        return user_region_scores;
    }, [scores]);

    const stateScores = useMemo(() => {
        let user_state_curr_streaks = {};
        let user_state_max_streaks = {};
        let user_state_crown_scores = {};

        let winner_found = false;

        sortedScores.map((dateobject) => {
            winner_found = false;
            dateobject.scores.map((userobject) => {
                if (userobject?.state_score?.length > 0) {
                    if (
                        user_state_crown_scores[userobject.name] === undefined
                    ) {
                        user_state_crown_scores[userobject.name] = 0;
                    }

                    let winner = crownify(dateobject.scores, "statele");

                    if (!winner_found && winner) {
                        winner_found = true;
                        user_state_crown_scores[winner] =
                            user_state_crown_scores[winner]
                                ? user_state_crown_scores[winner] + 1
                                : 1;
                    }
                }

                if (
                    userobject?.state_score?.length > 0 &&
                    userobject?.state_score?.length < 6
                ) {
                    if (user_state_curr_streaks[userobject.name] >= 0) {
                        user_state_curr_streaks[userobject.name]++;

                        let max = user_state_max_streaks[userobject.name]
                            ? user_state_max_streaks[userobject.name]
                            : 0;
                        let curr = user_state_curr_streaks[userobject.name];
                        user_state_max_streaks[userobject.name] = Math.max(
                            curr,
                            max
                        );
                    } else if (
                        user_state_curr_streaks[userobject.name] === undefined
                    ) {
                        user_state_curr_streaks[userobject.name] = 1;
                        user_state_max_streaks[userobject.name] = 1;
                    }
                } else if (userobject?.state_score?.length === 6) {
                    if (
                        userobject?.state_score[5]?.filter((x) => x == 2)
                            .length === 5
                    ) {
                        if (user_state_curr_streaks[userobject.name] >= 0) {
                            user_state_curr_streaks[userobject.name]++;

                            let max = user_state_max_streaks[userobject.name]
                                ? user_state_max_streaks[userobject.name]
                                : 0;
                            user_state_max_streaks[userobject.name] = Math.max(
                                max,
                                user_state_curr_streaks[userobject.name]
                            );
                        } else if (
                            user_state_curr_streaks[userobject.name] ===
                            undefined
                        ) {
                            user_state_curr_streaks[userobject.name] = 1;
                            user_state_max_streaks[userobject.name] = 1;
                        }
                    } else {
                        user_state_curr_streaks[userobject.name] = 0;
                    }
                }
            });
        });

        const maxsorted = Object.entries(user_state_max_streaks)?.sort(
            ([, a], [, b]) => b - a
        );

        const currsorted = Object.entries(user_state_curr_streaks)?.sort(
            ([, a], [, b]) => b - a
        );

        const maxfiltered = maxsorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const currfiltered = currsorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        const crown_sorted = Object.entries(user_state_crown_scores)?.sort(
            ([, a], [, b]) => b - a
        );

        const crown_filtered = crown_sorted.filter((kvp) => {
            return !dontShowUsersList.includes(kvp[0]);
        });

        return [maxfiltered, currfiltered, crown_filtered];
    }, [sortedScores]);

    const CloseLeaderboardModalIcon = (
        <Box
            tabIndex={0}
            sx={{
                color: "#ee5253",
                position: "absolute",
                right: "18px",
                display: "flex",
                top: "18px",
                background: "#00000024",
                borderRadius: "6px",
                cursor: "pointer",
                "&: hover": {
                    color: "red",
                },
            }}
            onKeyPress={handleKeyPress}
            onClick={() => closeModal()}
        >
            <CloseIcon
                sx={{
                    fontSize: "38px",
                }}
            />
        </Box>
    );

    return (
        <div>
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={LeaderboardModalOpen}
                onClose={closeModal}
                BackdropComponent={Backdrop}
            >
                <Box
                    sx={{
                        position: "relative",
                        width: mobile
                            ? "calc(100% - 20px)"
                            : "calc(100% - 200px)",
                        maxWidth: "1000px",
                        margin: "0 auto",
                        background: "#444",
                        maxHeight: "704px",
                        paddingBottom: "40px",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        height: mobile
                            ? "calc(100% - 100px)"
                            : "calc(100% - 200px)",
                    }}
                >
                    {CloseLeaderboardModalIcon}

                    <h1 style={{ color: "#FFF", paddingLeft: "30px" }}>
                        Leaderboard
                    </h1>
                    <Box
                        sx={
                            mobile
                                ? {
                                      display: "grid",
                                      width: "100%",
                                      gridTemplateColumns: "1fr",
                                      minHeight: "240px",
                                  }
                                : {
                                      display: "grid",
                                      width: "100%",
                                      gridTemplateColumns: "repeat(1, 1fr)",
                                      minHeight: "240px",
                                  }
                        }
                    >
                        <ThemeProvider theme={darkTheme}>
                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <WLetterBox
                                        sx={{
                                            backgroundColor:
                                                colors[
                                                    Math.floor(
                                                        Math.random() * 3
                                                    )
                                                ],
                                        }}
                                    >
                                        W
                                    </WLetterBox>
                                    <WLetterBox
                                        sx={{
                                            backgroundColor:
                                                colors[
                                                    Math.floor(
                                                        Math.random() * 3
                                                    )
                                                ],
                                        }}
                                    >
                                        O
                                    </WLetterBox>
                                    <WLetterBox
                                        sx={{
                                            backgroundColor:
                                                colors[
                                                    Math.floor(
                                                        Math.random() * 3
                                                    )
                                                ],
                                        }}
                                    >
                                        R
                                    </WLetterBox>
                                    <WLetterBox
                                        sx={{
                                            backgroundColor:
                                                colors[
                                                    Math.floor(
                                                        Math.random() * 3
                                                    )
                                                ],
                                        }}
                                    >
                                        D
                                    </WLetterBox>
                                    <WLetterBox
                                        sx={{
                                            backgroundColor:
                                                colors[
                                                    Math.floor(
                                                        Math.random() * 3
                                                    )
                                                ],
                                        }}
                                    >
                                        L
                                    </WLetterBox>
                                    <WLetterBox
                                        sx={{
                                            backgroundColor:
                                                colors[
                                                    Math.floor(
                                                        Math.random() * 3
                                                    )
                                                ],
                                        }}
                                    >
                                        E
                                    </WLetterBox>

                                    <span style={{ paddingLeft: "10px" }}>
                                        Crowns 👑
                                    </span>
                                </Box>
                                <LeaderboardChart
                                    users={userWordleCrownScores.map(
                                        (userScoreArray) => userScoreArray[0]
                                    )}
                                    usersValuesArray={userWordleCrownScores.map(
                                        (userScoreArray) => userScoreArray[1]
                                    )}
                                />
                            </Paper>

                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <span>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            W
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            O
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            R
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            D
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            L
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            E
                                        </WLetterBox>
                                        <span style={{ paddingLeft: "10px" }}>
                                            Max Streak 🔥
                                        </span>
                                    </span>
                                </Box>

                                <LeaderboardChart
                                    users={streaksWordle[0].map(
                                        (userScoreArray) => userScoreArray[0]
                                    )}
                                    usersValuesArray={streaksWordle[0].map(
                                        (userScoreArray) => userScoreArray[1]
                                    )}
                                />
                            </Paper>

                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <span>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            W
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            O
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            R
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            D
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            L
                                        </WLetterBox>
                                        <WLetterBox
                                            sx={{
                                                backgroundColor:
                                                    colors[
                                                        Math.floor(
                                                            Math.random() * 3
                                                        )
                                                    ],
                                            }}
                                        >
                                            E
                                        </WLetterBox>
                                        <span style={{ paddingLeft: "10px" }}>
                                            Current Streak 📈
                                        </span>
                                    </span>
                                </Box>
                                <LeaderboardChart
                                    users={streaksWordle[1].map(
                                        (userScoreArray) => userScoreArray[0]
                                    )}
                                    usersValuesArray={streaksWordle[1].map(
                                        (userScoreArray) => userScoreArray[1]
                                    )}
                                />
                            </Paper>

                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontWeight: "600",
                                            letterSpacing: "1.5px",
                                        }}
                                    >
                                        WOR
                                        <span style={{ color: "green" }}>
                                            L
                                        </span>
                                        DLE
                                    </span>
                                    <span style={{ paddingLeft: "10px" }}>
                                        Crowns 👑
                                    </span>
                                </Box>
                                <LeaderboardChart
                                    users={userWorldleCrownScores.map(
                                        (userScoreArray) => userScoreArray[0]
                                    )}
                                    usersValuesArray={userWorldleCrownScores.map(
                                        (userScoreArray) => userScoreArray[1]
                                    )}
                                />
                            </Paper>

                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <span>
                                        <span
                                            style={{
                                                fontWeight: "600",
                                                letterSpacing: "1.5px",
                                            }}
                                        >
                                            WOR
                                            <span style={{ color: "green" }}>
                                                L
                                            </span>
                                            DLE
                                        </span>
                                        <span style={{ paddingLeft: "10px" }}>
                                            Max Streak 🔥
                                        </span>
                                    </span>
                                </Box>
                                <LeaderboardChart
                                    users={streaksWorldle[0].map(
                                        (userScoreArray) => userScoreArray[0]
                                    )}
                                    usersValuesArray={streaksWorldle[0].map(
                                        (userScoreArray) => userScoreArray[1]
                                    )}
                                />
                            </Paper>

                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <span>
                                        <span
                                            style={{
                                                fontWeight: "600",
                                                letterSpacing: "1.5px",
                                            }}
                                        >
                                            WOR
                                            <span style={{ color: "green" }}>
                                                L
                                            </span>
                                            DLE
                                        </span>
                                        <span style={{ paddingLeft: "10px" }}>
                                            Current Streak 📈
                                        </span>
                                    </span>
                                </Box>
                                <LeaderboardChart
                                    users={streaksWorldle[1].map(
                                        (userScoreArray) => userScoreArray[0]
                                    )}
                                    usersValuesArray={streaksWorldle[1].map(
                                        (userScoreArray) => userScoreArray[1]
                                    )}
                                />
                            </Paper>

                            {["af", "as", "na", "sa", "eu", "me", "oc"].map(
                                (region) =>
                                    regionScores[region].length > 0 && (
                                        <Paper
                                            key={guid()}
                                            elevation={10}
                                            sx={{
                                                margin: "18px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    paddingTop: "20px",
                                                    paddingLeft: "20px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        width: "100%",
                                                        marginBottom: "30px",
                                                        color: "#4cd137",
                                                        display:
                                                            showNewText.includes(
                                                                region
                                                            )
                                                                ? "block"
                                                                : "none",
                                                    }}
                                                    onMouseOver={() =>
                                                        removeOnHover(region)
                                                    }
                                                >
                                                    New!
                                                </div>
                                                <span>
                                                    <span
                                                        style={{
                                                            fontWeight: "600",
                                                            letterSpacing:
                                                                "1.5px",
                                                        }}
                                                    >
                                                        WOR
                                                        <span
                                                            style={{
                                                                color: "green",
                                                            }}
                                                        >
                                                            L
                                                        </span>
                                                        DLE
                                                    </span>
                                                    <span
                                                        style={{
                                                            paddingLeft: "10px",
                                                        }}
                                                    >
                                                        {regionMap[region]}
                                                        <img
                                                            style={{
                                                                transform:
                                                                    "translate(10px, 10px)",
                                                                width: "40px",
                                                            }}
                                                            src={
                                                                regionIconMap[
                                                                    region
                                                                ]
                                                            }
                                                        />
                                                    </span>
                                                </span>
                                            </Box>
                                            <LeaderboardChart
                                                users={regionScores[
                                                    region
                                                ]?.map(
                                                    (userScoreArray) =>
                                                        userScoreArray[0]
                                                )}
                                                usersValuesArray={regionScores[
                                                    region
                                                ]?.map(
                                                    (userScoreArray) =>
                                                        userScoreArray[1]
                                                )}
                                            />
                                        </Paper>
                                    )
                            )}

                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            marginBottom: "30px",
                                            color: "#4cd137",
                                            display: showNewText.includes(
                                                "us_max"
                                            )
                                                ? "block"
                                                : "none",
                                        }}
                                        onMouseOver={() =>
                                            removeOnHover("us_max")
                                        }
                                    >
                                        New!
                                    </div>
                                    <span
                                        style={{
                                            position: "relative",
                                            paddingTop: "20px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: "600",
                                                letterSpacing: "1.5px",
                                            }}
                                        >
                                            <span style={{ color: "green" }}>
                                                STATE
                                            </span>
                                            LE
                                        </span>
                                        <span
                                            style={{
                                                paddingLeft: "10px",
                                                position: "absolute",
                                                top: "12px",
                                            }}
                                        >
                                            <USAIcon />
                                        </span>
                                    </span>
                                </Box>
                                <Box
                                    sx={{
                                        paddingLeft: "20px",
                                        paddingTop: "10px",
                                    }}
                                >
                                    <span>Crowns 👑</span>
                                </Box>
                                <LeaderboardChart
                                    users={stateScores[2].map(
                                        (userScoreArray) => userScoreArray[0]
                                    )}
                                    usersValuesArray={stateScores[2].map(
                                        (userScoreArray) => userScoreArray[1]
                                    )}
                                />
                            </Paper>

                            <Paper
                                key={guid()}
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            marginBottom: "30px",
                                            color: "#4cd137",
                                            display: showNewText.includes(
                                                "us_max"
                                            )
                                                ? "block"
                                                : "none",
                                        }}
                                        onMouseOver={() =>
                                            removeOnHover("us_max")
                                        }
                                    >
                                        New!
                                    </div>
                                    <span
                                        style={{
                                            position: "relative",
                                            paddingTop: "20px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: "600",
                                                letterSpacing: "1.5px",
                                            }}
                                        >
                                            <span style={{ color: "green" }}>
                                                STATE
                                            </span>
                                            LE
                                        </span>
                                        <span
                                            style={{
                                                paddingLeft: "10px",
                                                position: "absolute",
                                                top: "12px",
                                            }}
                                        >
                                            <USAIcon />
                                        </span>
                                    </span>
                                </Box>
                                <Box
                                    sx={{
                                        paddingTop: "12px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    Max Streak 🔥
                                </Box>

                                {stateScores[0]?.map(
                                    (userScoreArray) => userScoreArray[1]
                                )?.length > 0 && (
                                    <LeaderboardChart
                                        users={stateScores[0]?.map(
                                            (userScoreArray) =>
                                                userScoreArray[0]
                                        )}
                                        usersValuesArray={stateScores[0]?.map(
                                            (userScoreArray) =>
                                                userScoreArray[1]
                                        )}
                                    />
                                )}
                            </Paper>

                            <Paper
                                key={guid()}
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        paddingTop: "20px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            position: "absolute",
                                            width: "100%",
                                            marginBottom: "30px",
                                            color: "#4cd137",
                                            display: showNewText.includes(
                                                "us_curr"
                                            )
                                                ? "block"
                                                : "none",
                                        }}
                                        onMouseOver={() =>
                                            removeOnHover("us_curr")
                                        }
                                    >
                                        New!
                                    </div>
                                    <span
                                        style={{
                                            position: "relative",
                                            paddingTop: "20px",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontWeight: "600",
                                                letterSpacing: "1.5px",
                                            }}
                                        >
                                            <span style={{ color: "green" }}>
                                                STATE
                                            </span>
                                            LE
                                        </span>
                                        <span
                                            style={{
                                                paddingLeft: "10px",
                                                position: "absolute",
                                                top: "12px",
                                            }}
                                        >
                                            <USAIcon />
                                        </span>
                                    </span>
                                </Box>
                                <Box
                                    sx={{
                                        paddingTop: "12px",
                                        paddingLeft: "20px",
                                    }}
                                >
                                    Current Streak 📈
                                </Box>

                                {stateScores[1]?.map(
                                    (userScoreArray) => userScoreArray[1]
                                )?.length > 0 && (
                                    <LeaderboardChart
                                        users={stateScores[1]?.map(
                                            (userScoreArray) =>
                                                userScoreArray[0]
                                        )}
                                        usersValuesArray={stateScores[1]?.map(
                                            (userScoreArray) =>
                                                userScoreArray[1]
                                        )}
                                    />
                                )}
                            </Paper>

                            <Paper
                                elevation={10}
                                sx={{
                                    margin: "18px",
                                    padding: "30px",
                                }}
                            >
                                Mystery Features - Coming Soon !
                                <br />
                                <br />
                                <Typography color="#999" fontSize="12px">
                                    Continent icons from{" "}
                                    <a href="https://flaticons.com">
                                        flaticons.com
                                    </a>
                                    &nbsp;author - Freepik
                                </Typography>
                                <Box sx={{}}>
                                    <Typography color="#999" fontSize="12px">
                                        Usa by Setyo Ari Wibowo from&nbsp;
                                        <a href="https://NounProject.com">
                                            NounProject.com
                                        </a>
                                    </Typography>
                                </Box>
                            </Paper>
                        </ThemeProvider>
                    </Box>
                </Box>
            </StyledModal>
        </div>
    );
}
