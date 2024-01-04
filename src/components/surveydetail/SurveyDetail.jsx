import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import "./surveydetail.scss";
import axios from "axios";

const SurveyDetailPage = ({ onClickBack, onClickQuestion, surveyData }) => {
  const [surveyStatus, setSurveyStatus] = useState(surveyData.survey_status);
  const handleNewAuditClick = (surveyData) => {
    console.log(surveyData.survey_id);
    setSurveyStatus("processing");
    
    // Create a new instance of Axios with the desired headers
    const axiosInstance = axios.create({
      headers: {
        "ngrok-skip-browser-warning": "true"
      }
    });
  
    // Send the updated survey status to the backend using the custom Axios instance
    axiosInstance
      .post("https://e0ef-118-189-129-143.ngrok-free.app/audit", {
        surveyId: surveyData.survey_id
      })
      .then((response) => {
        console.log("Survey status updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating survey status:", error);
      });
  };
  const handleEndAuditClick = (surveyData) => {
    setSurveyStatus("audited");
    // Send the updated survey status to the backend using Axios
    axios
      .post("https://e0ef-118-189-129-143.ngrok-free.app/audit", {
        surveyId: surveyData.survey_id,
        //surveyStatus: "audited",
      })
      .then((response) => {
        console.log("Survey status updated successfully:", response.data);
      })
      .catch((error) => {
        // Handle any error that occurred during the API call
        console.error("Error updating survey status:", error);
      });
  };

  return (
    <div className="survey__detail__wrapper">
      <div className="survey__detail__heading__wrapper">
        <Button
          variant="contained"
          color="primary"
          onClick={() => onClickBack()}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          {surveyData.survey_title}
        </Typography>
        {surveyStatus.toLowerCase() === "new" ? (
          <Button
            className="survey__detail__header__button"
            variant="contained"
            color="primary"
            onClick={() => handleNewAuditClick(surveyData)}
          >
            New Audit
          </Button>
        ) : surveyStatus.toLowerCase() === "processing" ? (
          <Button
            className="survey__detail__header__button"
            variant="contained"
            color="secondary"
            onClick={() => handleEndAuditClick(surveyData)}
          >
            End Audit
          </Button>
        ) : (
          <Box
            sx={{
              color: "#BBC5CF",
              textTransform: "uppercase",
            }}
          >
            {surveyStatus}
          </Box>
        )}
      </div>

      <div className="survey__detail__card__container">
        {surveyData.questions.map((questionItem) => (
          <Card
            key={questionItem.question_id}
            variant="outlined"
            className="survey__detail__card__content"
            onClick={() => onClickQuestion(questionItem.question_id)}
          >
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                className="survey__detail__card__content__question"
              >
                {questionItem.question}
              </Typography>
              {questionItem.user_responses.map((response) => (
                <Typography
                  key={response.response_id}
                  variant="body1"
                  component="div"
                  className="survey__detail__card__content__answer"
                >
                  <Typography>{response.response}</Typography>
                  <Typography sx={{ color: "#BBC5CF" }}>
                    {response.count} responses{" "}
                  </Typography>
                </Typography>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SurveyDetailPage;
