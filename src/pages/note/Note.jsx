import React, { useEffect, useState } from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import PageTitle from "../../components/pagetitle/PageTitle";
import UserNote from "../../components/note/UserNote";

const Note = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        //"https://mocki.io/v1/4da9a637-4163-432b-a93b-4c5e99d73762"
        "http://127.0.0.1:5000/auditor_note_data"
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  return (
    <Box
      className="note__container"
      component="div"
      sx={{
        marginBottom: "16px",
        width: "90%",
      }}
    >
      <PageTitle>Notes</PageTitle>
      {data && data.auditor_notes.length > 0 ? (
        <ul>
          {data.auditees.map((auditee) => (
            <UserNote
              key={auditee.auditee_id}
              auditee={auditee}
              responses={data.survey_responses}
              questions={data.survey_questions}
              notes={data.auditor_notes}
            />
          ))}
        </ul>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Typography
            sx={{
              marginBottom: "16px",
              fontSize: "1.5rem",
            }}
          >
            You haven't created any notes yet
          </Typography>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
      )}
    </Box>
  );
};

export default Note;
