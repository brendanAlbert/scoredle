import { styled, Box } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Paper } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import BugReportIcon from "@mui/icons-material/BugReport";
import PestControlIcon from "@mui/icons-material/PestControl";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ListIcon from "@mui/icons-material/List";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import TheatersIcon from "@mui/icons-material/Theaters";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import PublicIcon from "@mui/icons-material/Public";
import LanguageIcon from "@mui/icons-material/Language";
import RedoIcon from "@mui/icons-material/Redo";
import Typography from "@mui/material/Typography";

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

const darkTheme = createTheme({ palette: { mode: "dark" } });

export default function FeaturesModal({
  featuresModalState,
  setfeaturesModalState,
}) {
  let mobile = useMediaQuery(`(max-width: 662px)`);

  const closeModal = () => {
    setfeaturesModalState(false);
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    const keys = ["Enter", "Space"];
    if (keys.includes(event.code)) {
      closeModal();
    }
  };

  const CloseFeaturesModalIcon = (
    <Box
      tabIndex={0}
      sx={{
        color: "#ee5253",
        position: "absolute",
        right: "18px",
        display: "flex",
        top: mobile ? "48px" : "18px",
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
        open={featuresModalState}
        onClose={closeModal}
        BackdropComponent={Backdrop}
      >
        <Box
          sx={{
            position: "relative",
            width: mobile ? "calc(100% - 20px)" : "calc(100% - 200px)",
            maxWidth: "1000px",
            background: "#444",
            maxHeight: "704px",
            overflowY: "scroll",
          }}
        >
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
            {CloseFeaturesModalIcon}

            <ThemeProvider theme={darkTheme}>
              <Paper
                elevation={10}
                sx={{
                  height: "100%",
                  padding: mobile ? "0px" : "30px",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    color: "#FFF",
                    fontWeight: 600,
                    fontSize: "clamp(26px, 4vw ,30px)",
                    marginTop: mobile ? "130px" : "80px",
                    paddingLeft: "30px",
                  }}
                >
                  {"Features Roadmap"}
                </div>

                <Timeline position="alternate">
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Summer 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="secondary" variant="outlined">
                        <QuestionMarkIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Future
                      </Typography>
                      <Typography>
                        Scoredle is always looking to improve! Feel free to
                        suggest fixes and features
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      April / May
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="success" variant="outlined">
                        <PrecisionManufacturingIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Automate
                      </Typography>
                      <Typography>
                        Would like to automate adding the daily country svg and
                        the previous day's wordle.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Late April / Early May
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="info" variant="outlined">
                        <DisplaySettingsIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Settings
                      </Typography>
                      <Typography>
                        Custom settings: horizontal / vertical feed. Toggle if
                        you want to show icons directly in feed.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Late April / Early May
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="success" variant="outlined">
                        <MilitaryTechIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Badges
                      </Typography>
                      <Typography>Earn badges for achievements</Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      Late April / Early May
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="warning" variant="outlined">
                        <TheatersIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Framed Feed
                      </Typography>
                      <Typography>
                        Track your scores from{" "}
                        <a href="https://framed.wtf/">framed.wtf</a>.
                        <div>
                          Get all 3 'dles and the Framed to achieve a quadfecta!
                          <div>W ✅</div>
                          <div>🌍 ✅</div>
                          <div>🎶 ✅</div>
                          <div>🎥 ✅</div>
                        </div>
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      align="right"
                      variant="body2"
                      color="text.secondary"
                    >
                      Late April / Early May
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="secondary" variant="outlined">
                        <MusicNoteIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Heardle Feed
                      </Typography>
                      <Typography>
                        Track your scores from{" "}
                        <a href="https://www.heardle.app">heardle.app</a>. Get
                        all 3 'dles: word, world, and heard to achieve the
                        trifecta!
                        <div>W ✅</div>
                        <div>🌍 ✅</div>
                        <div>🎶 ✅</div>
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      April
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="error" variant="outlined">
                        <PestControlIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Save bug
                      </Typography>
                      <Typography>
                        Searching for bug which causes scores to sometimes not
                        persist.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      April
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="warning" variant="outlined">
                        <ListIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Optimize
                      </Typography>
                      <Typography>
                        Scoredle is starting to show signs of scale issues with
                        not even 10 users! It is beginning to lag from either
                        showing too much or doing too many calculations.
                        Exploring options like virtualized list or limited feed
                        size may solve this.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Sun April 10, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="success" variant="outlined">
                        <RedoIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Word / Name
                      </Typography>
                      <Typography>
                        Country name and wordle word will show up in feed the
                        next day. Admin can add word, country name and svg from
                        Scoredle.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Sat April 9, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="error" variant="outlined">
                        <LocalFireDepartmentIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Streaks
                      </Typography>
                      <Typography>
                        Implemented leaderboard max + current streaks. 1st, 2nd,
                        3rd place leaderboard medals assign correctly. Autofocus
                        when adding scores. Current and future features
                        timeline.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Fri April 8, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="success" variant="outlined">
                        <BugReportIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography
                        sx={{ fontSize: "clamp(18px, 5vw ,20px)" }}
                        variant="h6"
                        component="span"
                      >
                        Bugfix
                      </Typography>
                      <Typography>
                        See Worldle crown leaders in leaderboard. Finally fixed
                        countries not showing bug. Shrunk stats cards.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Tue April 5, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="warning" variant="outlined">
                        <LeaderboardIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography
                        sx={{ fontSize: "clamp(18px, 5vw ,20px)" }}
                        variant="h6"
                        component="span"
                      >
                        Leaderboard
                      </Typography>
                      <Typography>
                        Added leaderboard with Wordle crowns. Add score directly
                        in feed. Logout.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Sat April 2, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="info" variant="outlined">
                        <QueryStatsIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Stats
                      </Typography>
                      <Typography>
                        See your stats: # played, win %, max, current streak,
                        crowns.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Mon Mar 21, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="warning" variant="outlined">
                        <EmojiEventsIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Coronation
                      </Typography>
                      <Typography>
                        Each day's top scorer is coronated.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Sun Mar 20, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="secondary" variant="outlined">
                        <PublicIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Country Svgs
                      </Typography>
                      <Typography>Add country svgs.</Typography>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Sun Mar 13, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="success" variant="outlined">
                        <LanguageIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Worldles
                      </Typography>
                      <Typography>Worldle feed added.</Typography>
                    </TimelineContent>
                  </TimelineItem>

                  <TimelineItem>
                    <TimelineOppositeContent
                      sx={{ m: "auto 0" }}
                      variant="body2"
                      color="text.secondary"
                    >
                      Sun Mar 6, 2022
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineConnector />
                      <TimelineDot color="primary" variant="outlined">
                        <ChildCareIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: "12px", px: 2 }}>
                      <Typography variant="h6" component="span">
                        Scoredle
                      </Typography>
                      <Typography>
                        Scoredle is born! Only wordles can be tracked for now.
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Paper>
            </ThemeProvider>
          </Box>
        </Box>
      </StyledModal>
    </div>
  );
}
