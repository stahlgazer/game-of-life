import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import Container from "@material-ui/core/Container";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Rules() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={`${classes.root} Rules`}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} style={{ align: "center" }}>
            Game of Life Introduction
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            'The Game of Life, also known simply as Life, is a cellular
            automaton devised by the British mathematician John Horton Conway in
            1970. It is a zero-player game, meaning that it's evolution is
            determined by it's initial state, requiring no further input. One
            interacts with the Game of Life by creating an initial configuration
            and observing how it evolves. It is Turing complete and can simulate
            a universal constructor or any other Turing machine.' -{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            >
              Wikipedia
            </a>
            <br />
            <br />
            An empty cell represents a dead cell, while a filled cell is a live
            cell. Your cell's survival is reliant on it's neighbors and position
            on the grid. First select cells to start with that are alive, or
            choose the 'randomize cells' button. Check out the different
            settings and experiment with different configurations to see what
            kind of results you come up with, then sit back and watch. Check out
            the rules to see what will make your cells live or die so that you
            can choose wisely. Below are some examples of common patterns that
            often arise in The Game of Life.
            <br />
            <br />
            <video
              width="320"
              height="240"
              autoPlay
              loop
              style={{ display: "block", margin: "0 auto" }}
            >
              <source
                src="https://i.gyazo.com/040f91064d1336abe670786a6a63955b.mp4"
                type="video/mp4"
              />
            </video>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>
            Game of Life Rules
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              <li>
                If a cell has 2 or 3 neighbors it will live on to the next
                generation.
              </li>
              <li>
                If a cell has 1 or 0 neighbors, they will die by
                underpopulation.
              </li>
              If a cell has 4 or more neighbors, they will die by
              overpopulation.
              <li>
                If a dead cell has 3 neighbors it will come back to life, by way
                of reproduction.
              </li>
              <li>
                Any cells that move off the grid will die because of moving too
                far from necessary resources.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
//              In the Game of Life, these rules examine each cell of the grid: For
//             each cell, it counts that cell's eight neighbors up, down, left,
//             right, and diagonal, and then acts on that result. If the cell is
//             alive and has 2 or 3 neighbors, then it remains alive. Else it dies.
//             If the cell is dead and has exactly 3 neighbors, then it comes to
//             life. Else if remains dead. From those two rules, many types of
//             "creatures" can be created that move around the "landscape". Note:
//             cells that are off the edge of the grid are typically assumed to be
//             dead. In other cases, people sometimes code it up to wrap around to
//             the far side.
