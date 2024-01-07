import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Snackbar,
} from "@mui/material";
import "./questiondetail.scss";
import { useState } from "react";
import axios from "axios";

const QuestionDetail = ({ onClickBack, questionData, surveyStatus }) => {
  const [privateNote, setPrivateNote] = useState("");
  const [publicNote, setPublicNote] = useState("");
  const [showNote, setShowNote] = useState(false);
  const [selectedResponseId, setSelectedResponseId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const handleSaveNote = () => {
    // Send the private and public notes to the backend
    const noteData = {
      responseId: selectedResponseId,
      privateNote,
      publicNote,
    };

    /// Send the note data to the backend using Axios
    axios
      .post("http://127.0.0.1:5000/add_audit_note", noteData)
      .then((response) => {
        // Note saved successfully
        console.log("Note saved successfully");
        setStatusMessage("Note saved successfully");
        setShowStatus(true);
      })
      .catch((error) => {
        // Error occurred while saving the note
        console.error("Error occurred while saving the note", error);
        setStatusMessage("Error occurred while saving the note");
        setShowStatus(true);
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
        <div />
      </div>
      <div className="answer__detail__container">
        {questionData.user_responses.map((responseItem) => (
          <Card
            sx={{
              borderRadius: "10px",
            }}
            key={responseItem.respond_id}
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
                    Name: {responseItem.auditee_name}
                  </Typography>
                  <Typography
                    component="div"
                    gutterBottom
                    className="answer__detail__card__content_userdetail_age"
                  >
                    Age: {responseItem.auditee_age}
                  </Typography>
                  <Typography
                    component="div"
                    gutterBottom
                    className="answer__detail__card__content_userdetail_department"
                  >
                    Department: {responseItem.auditee_department}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={8}
                  className="answer__detail__card__content_response"
                >
                  Answer: {responseItem.answer_text}
                </Grid>
              </Grid>

              {showNote && selectedResponseId === responseItem.respond_id && (
                <Box
                  className="note__form"
                  component="form"
                  noValidate
                  autoComplete="off"
                >
                  <div className="note__form__wrap_textarea">
                    <TextField
                      sx={{
                        marginBottom: "16px",
                      }}
                      className="note__form__textarea"
                      multiline
                      label="Private Note"
                      variant="outlined"
                      value={privateNote}
                      onChange={(e) => setPrivateNote(e.target.value)}
                    />
                  </div>

                  <TextField
                    sx={{
                      marginBottom: "16px",
                    }}
                    className="note__form__textarea"
                    multiline
                    label="Public Note"
                    variant="outlined"
                    value={publicNote}
                    onChange={(e) => setPublicNote(e.target.value)}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      sx={{
                        marginRight: "16px",
                      }}
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
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!showNote && surveyStatus.toLowerCase() === "processing" && (
                  <Button
                    variant="contained"
                    color="primary"
                    className="note_button"
                    onClick={() => {
                      setShowNote(true);
                      setSelectedResponseId(responseItem.respond_id);
                    }}
                  >
                    Note
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal
        open={showStatus}
        onClose={() => setShowStatus(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={showStatus}>
          <div className="status__modal">
            <Typography variant="h6">{statusMessage}</Typography>
          </div>
        </Fade>
      </Modal>
      <Snackbar
        open={showStatus}
        autoHideDuration={3000}
        onClose={() => setShowStatus(false)}
        message={statusMessage}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        sx={{
          background: "#333",
          color: "#fff",
          "& .MuiSnackbarContent-root": {
            justifyContent: "center",
          },
          "& .MuiSnackbarContent-message": {
            fontWeight: "bold",
          },
        }}
      />
    </div>
  );
};
export default QuestionDetail;
