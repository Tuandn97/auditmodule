import React, { useEffect, useState } from "react";
import PageTitle from "../../components/pagetitle/PageTitle";
import UserNote from "../../components/auditmeeting/UserNote";
import { Button, Box, ButtonGroup } from "@mui/material";

const Audit = () => {
  const [data, setData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("Waiting");

  useEffect(() => {
    fetchData();
  },);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/meeting/${activeFilter}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching API:", error);
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <Box>
      <PageTitle>Audit</PageTitle>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleFilterClick("Waiting")}
            style={{
              backgroundColor:
                activeFilter === "Waiting" ? "#264465" : "#BBC5CF",
              color: activeFilter === "Waiting" ? "#fff" : "#000",
            }}
          >
            Waiting
          </Button>
          <Button
            onClick={() => handleFilterClick("Confirm")}
            style={{
              backgroundColor:
                activeFilter === "Confirm" ? "#264465" : "#BBC5CF",
              color: activeFilter === "Confirm" ? "#fff" : "#000",
            }}
          >
            Confirm
          </Button>
          <Button
            onClick={() => handleFilterClick("Processing")}
            style={{
              backgroundColor:
                activeFilter === "Processing" ? "#264465" : "#BBC5CF",
              color: activeFilter === "Processing" ? "#fff" : "#000",
            }}
          >
            Processing
          </Button>
          <Button
            onClick={() => handleFilterClick("Finished")}
            style={{
              backgroundColor:
                activeFilter === "Finished" ? "#264465" : "#BBC5CF",
              color: activeFilter === "Finished" ? "#fff" : "#000",
            }}
          >
            Finished
          </Button>
        </ButtonGroup>
      </Box>
      <Box
        className="note__container"
        component="div"
        sx={{
          marginBottom: "16px",
          width: "90%",
        }}
      >
        {data ? (
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
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Audit;
