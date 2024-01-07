import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

const QuestionResponse = ({ questionId, notes, questions, response }) => {
  const [showDetails, setShowDetails] = useState(false);

  const question = questions.find(
    (question) => question.question_id === questionId
  );
  const auditorNote = notes.find((note) => note.note_id === response.note_id);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Box sx={{ marginBottom: "8px" }}>
      <Typography
        variant="h6"
        component="h4"
        onClick={toggleDetails}
        sx={{
          "&:hover": {
            backgroundColor: "#264465",
            color: "#FFFFFF",
            cursor: "pointer",
          },
          marginBottom: "8px",
        }}
      >
        {question.question}
      </Typography>
      {showDetails && (
        <Box>
          <Box
            sx={{
              fontSize: "2rem",
            }}
          >
            <Typography>Response</Typography>
            <Typography
              variant="body2"
              sx={{
                backgroundColor: "#F5F6FA",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "8px",
              }}
            >
              {response.response}
            </Typography>
          </Box>
          <Box
            sx={{
              fontSize: "1.25rem",
            }}
          >
            <Typography>Public Note</Typography>
            <Typography
              sx={{
                backgroundColor: "#F5F6FA",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "8px",
              }}
              variant="body2"
            >
              {auditorNote.public_note}
            </Typography>
          </Box>
          <Box
            sx={{
              fontSize: "1.25rem",
            }}
          >
            <Typography>Private Note</Typography>
            <Typography
              sx={{
                backgroundColor: "#F5F6FA",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "8px",
              }}
              variant="body2"
            >
              {auditorNote.private_note}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuestionResponse;
