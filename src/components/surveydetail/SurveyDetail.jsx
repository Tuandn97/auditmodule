import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import "./surveydetail.scss";
import axios from "axios";

const SurveyDetailPage = ({ onClickBack, onClickQuestion, surveyData }) => {
  const [surveyStatus, setSurveyStatus] = useState(surveyData.survey_status);
  const handleNewAuditClick = () => {
    setSurveyStatus("processing");
    // Send the updated survey status to the backend using Axios
    axios
      .post("/api/updateSurveyStatus", {
        surveyId: surveyData.survey_id,
        surveyStatus: "processing",
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
        {surveyStatus.toLowerCase() === "new" && (
          <Button
            className="survey__detail__header__button"
            variant="contained"
            color="primary"
            onClick={handleNewAuditClick}
          >
            New Audit
          </Button>
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
                  {response.response}
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
