import React, { useState } from "react";
import QuestionResponse from "./QuestionResponse";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  Card,
  Grid,
  Button,
} from "@mui/material";
const UserNote = ({ auditee, responses, questions, notes }) => {
  const userResponses = responses.filter(
    (response) => response.auditee_id === auditee.auditee_id
  );
  const [bookingDisabled, setBookingDisabled] = useState(false);

  const handleBookingAudit = async () => {
    const auditeeId = auditee.auditee_id;
    const responseIds = userResponses.map((response) => response.response_id);
    console.log("Booking auditmeeting request data:", auditeeId, responseIds);

    try {
      const response = await fetch("http://127.0.0.1:5000/add_meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auditeeId,
          responseIds,
        }),
      });

      if (response.ok) {
        // The request was successful
        console.log("Booking auditmeeting request sent successfully");
        const data = await response.json();
        console.log("Response data:", data);
        setBookingDisabled(true);
        // Perform any other necessary actions
      } else {
        // The request was not successful
        console.log(
          "Error sending booking auditmeeting request:",
          response.status,
          response.statusText
        );
        // Handle the error appropriately
      }
    } catch (error) {
      console.log("Error sending booking auditmeeting request:", error.message);
      // Handle the error appropriately
    }
  };

  return (
    <Card
      sx={{ marginTop: "30px", borderRadius: "10px", backgroundColor: "#fff" }}
    >
      <Box sx={{ borderBottom: "1px solid #ccc" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ padding: "16px", lineHeight: "2.5rem" }}>
              <Typography variant="h5" sx={{ marginBottom: "8px" }}>
                {auditee.auditee_name}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "4px" }}>
                Age: {auditee.age}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: "8px" }}>
                Department: {auditee.department}
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
            <Box>
              <List>
                {userResponses.map((response, index) => (
                  <React.Fragment key={response.response_id}>
                    <ListItem disablePadding>
                      <QuestionResponse
                        questionId={response.question_id}
                        notes={notes}
                        questions={questions}
                        response={response}
                      />
                    </ListItem>
                    {index !== userResponses.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleBookingAudit}
          disabled={bookingDisabled}
        >
          Booking audit
        </Button>
      </Box>
    </Card>
  );
};

export default UserNote;
