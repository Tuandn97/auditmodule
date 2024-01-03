import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
        // "https://mocki.io/v1/4da9a637-4163-432b-a93b-4c5e99d73762"
        "https://mocki.io/v1/4da9a637-4163-432b-a93b-4c5e99d73762",
        {
          method: "GET",
          headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
          }),
        }
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
      {data && (
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
      )}
      
    </Box>
    
  );
};

export default Note;