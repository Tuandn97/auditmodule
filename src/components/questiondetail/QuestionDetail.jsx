import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
} from "@material-ui/core";
import "./questiondetail.scss";
import { useState } from "react";
import axios from "axios";

const QuestionDetail = ({ onClickBack, questionData }) => {
  const [privateNote, setPrivateNote] = useState("");
  const [publicNote, setPublicNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState("");
  const handleSaveNote = () => {
    // Send the private and public notes to the backend
    const noteData = {
      responseId: selectedResponseId,
      privateNote,
      publicNote,
    };

    /// Send the note data to the backend using Axios
    axios
      .post("/api/save-note", noteData)
      .then((response) => {
        // Note saved successfully
        console.log("Note saved successfully");
      })
      .catch((error) => {
        // Error occurred while saving the note
        console.error("Error occurred while saving the note", error);
      });
    console.log("Note Data:", noteData);
  };
  const handleCancelNote = () => {
    // Reset the note fields
    setPrivateNote("");
    setPublicNote("");
    setShowNote(false);
    setSelectedResponseId(null);
  };

  return (
    <div className="question__detail__container">
      <div className="question__detail__heading__wrapper">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickBack()}
        >
          Back
        </Button>
        <div className="question__detail__heading__question">
          {questionData.question}
        </div>
      </div>
      <div className="answer__detail__container">
        {questionData.user_responses.map((responseItem) => (
          <Card
            key={responseItem.response_id}
            variant="outlined"
            className="answer__detail__card__content"
          >
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={4}
                  className="answer__detail__card__content_userdetail"
                >
                  <Typography
                    component="div"
                    gutterBottom
                    className="answer__detail__card__content_userdetail_name"
                  >
                    Name: {responseItem.user_name}
                  </Typography>
                  <Typography
                    component="div"
                    gutterBottom
                    className="answer__detail__card__content_userdetail_age"
                  >
                    Age: {responseItem.user_age}
                  </Typography>
                  <Typography
                    component="div"
                    gutterBottom
                    className="answer__detail__card__content_userdetail_department"
                  >
                    Department: {responseItem.user_department}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  className="answer__detail__card__content_response"
                >
                  Answer: {responseItem.response}
                </Grid>
              </Grid>

              {showNote && selectedResponseId === responseItem.response_id && (
                <Box
                  className="note__form"
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    className="note__form__textarea"
                    multiline
                    label="Private Note"
                    variant="outlined"
                    value={privateNote}
                    onChange={(e) => setPrivateNote(e.target.value)}
                  />
                  <TextField
                    className="note__form__textarea"
                    multiline
                    label="Public Note"
                    variant="outlined"
                    value={publicNote}
                    onChange={(e) => setPublicNote(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="save_buttom"
                    onClick={handleSaveNote}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="cancel_buttom"
                    onClick={handleCancelNote}
                  >
                    Cancle
                  </Button>
                </Box>
              )}
              {!showNote && (
                <Button
                  variant="contained"
                  color="primary"
                  className="note_buttom"
                  onClick={() => {
                    setShowNote(true);
                    setSelectedResponseId(responseItem.response_id);
                  }}
                >
                  Note
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default QuestionDetail;
