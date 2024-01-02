import React, { useState } from "react";
import {
  Box,
  Card,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Button,
} from "@mui/material";

const NoteCard = () => {
  const [checked, setChecked] = useState({});

  const handleToggle = (questionId) => () => {
    setChecked((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId],
    }));
  };
  return (
    <Card
      sx={{ marginTop: "30px", borderRadius: "10px", backgroundColor: "#fff" }}
    >
      <Box sx={{ borderBottom: "1px solid #ccc" }} className="note__card">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box
              sx={{ padding: "16px", lineHeight: "2.5rem" }}
              className="note__card__header__user__detail"
            >
              <Typography variant="body1" component="div">
                Name: Nguyen Van A
              </Typography>
              <Typography variant="body1" component="div">
                Age: 20
              </Typography>
              <Typography variant="body1" component="div">
                Department: IT
              </Typography>
            </Box>
          </Grid>
          <Grid sx={{ borderLeft: "1px solid #ccc" }} item xs={8}>
            <Typography
              sx={{
                textAlign: "center",
                padding: "10px",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
              component="div"
            >
              Question
            </Typography>
            <Box className="note__card__header__question">
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                {[0, 1, 2, 3].map((value) => (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments" />
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked[value]}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            "aria-labelledby": `checkbox-list-label-${value}`,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText primary={`Line item ${value + 1}`} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className="note__card__content">
        <Box sx={{ padding: "16px" }} className="note__card__content__response">
          <Typography sx={{ borderBottom: "5px" }}>Response</Typography>
          {[0, 1, 2, 3].map(
            (value) =>
              checked[value] && (
                <Typography
                  key={value}
                  sx={{
                    backgroundColor: "#F5F6FA",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  Response for question {value + 1}
                </Typography>
              )
          )}
        </Box>
        <Box sx={{ padding: "16px" }} className="note__card__content__response">
          <Typography>Private note</Typography>
          {[0, 1, 2, 3].map(
            (value) =>
              checked[value] && (
                <Typography
                  key={value}
                  sx={{
                    backgroundColor: "#F5F6FA",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  Private note for question {value + 1}
                </Typography>
              )
          )}
        </Box>
        <Box sx={{ padding: "16px" }} className="note__card__content__response">
          <Typography>Public note</Typography>
          {[0, 1, 2, 3].map(
            (value) =>
              checked[value] && (
                <Typography
                  key={value}
                  sx={{
                    backgroundColor: "#F5F6FA",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  Public note for question {value + 1}
                </Typography>
              )
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
        className="note__card__button"
      >
        <Button variant="contained">Booking audit</Button>
      </Box>
    </Card>
  );
};

export default NoteCard;
