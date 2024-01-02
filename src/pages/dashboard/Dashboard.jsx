import PageTitle from "../../components/pagetitle/PageTitle";
import { useEffect, useState } from "react";
import "./dashboard.scss";
import SurveyDetail from "../../components/surveydetail/SurveyDetail";
import QuestionDetail from "../../components/questiondetail/QuestionDetail";
import { Typography } from "@material-ui/core";

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState("1");
  const [pageData, setPageData] = useState({
    surveyList: "",
    surveyDetail: "",
    questionDetail: "",
  });

  useEffect(() => {
    //https://mocki.io/v1/899c8c5f-43b3-46a2-b0a7-4a0f625c41d7
    //https://4a72-103-6-151-182.ngrok-free.app/surveys
    fetch("https://mocki.io/v1/899c8c5f-43b3-46a2-b0a7-4a0f625c41d7", {
      method: "GET",
      headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setPageData({
          ...{
            surveyList: "",
            surveyDetail: "",
            questionDetail: "",
          },
          surveyList: json,
        });
      });
  }, []);

  const handleQuestionClick = (questionId) => {
    // Send the question ID to the backend
    //https://mocki.io/v1/194d4f0d-5b5a-450c-bac4-c9e393e52a5c
    //`https://4a72-103-6-151-182.ngrok-free.app/survey_respond/${questionId}`
    fetch(
      "https://mocki.io/v1/194d4f0d-5b5a-450c-bac4-c9e393e52a5c",
      {
        method: "GET",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    )
      .then((response) => response.json())
      .then((questionData) => {
        // Load the question details based on the ID
        setPageData({
          ...pageData,
          questionDetail: questionData,
        });
        console.log(questionData);
      });
    setSelectedPage("3");
  };

  const handleSurveyClick = (survey) => {
    //https://mocki.io/v1/6c482d68-4dcd-4587-95bd-3ed9161db7ad
    //`https://4a72-103-6-151-182.ngrok-free.app/questions/survey/${survey.Survey_ID}`
    fetch(
      "https://mocki.io/v1/6c482d68-4dcd-4587-95bd-3ed9161db7ad",
      {
        method: "GET",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      }
    )
      .then((response) => response.json())
      .then((surveyData) => {
        setPageData((prevPageData) => ({
          ...prevPageData,
          surveyDetail: surveyData,
        }));
      });
    setSelectedPage("2");
  };

  return (
    <div className="dashboard__container">
      <PageTitle>Dashboard</PageTitle>

      {pageData.questionDetail === "" &&
        pageData.surveyDetail === "" &&
        pageData.surveyList === "" && (
          <Typography color="error">Error happen !</Typography>
        )}

      {selectedPage === "1" && pageData.surveyList !== "" && (
        <div className="dashboard__survey__list">
          {pageData.surveyList.map((survey) => (
            <div
              key={survey.id}
              className="survey__card"
              onClick={() => handleSurveyClick(survey)}
            >
              <div className="survey__card__content">
                <div className="survey__card__info">
                  <h4>{survey.Survey_Title}</h4>
                  <p>{survey.Survey_Description}</p>
                </div>
                <div
                  className={`survey__card__status ${survey.Survey_Status.toLowerCase()}`}
                >
                  {survey.Survey_Status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedPage === "2" && pageData.surveyDetail !== "" && (
        <div className="dashboard__survey__detail">
          <SurveyDetail
            surveyData={pageData.surveyDetail}
            onClickBack={() => {
              setSelectedPage("1");
              setPageData({
                ...pageData,
                surveyDetail: "",
              });
            }}
            onClickQuestion={(questionId) => handleQuestionClick(questionId)}
          />
        </div>
      )}

      {selectedPage === "3" && pageData.questionDetail !== "" && (
        <div className="dashboard__question__detail">
          <QuestionDetail
            questionData={pageData.questionDetail}
            onClickBack={() => {
              setSelectedPage("2");
              setPageData({
                ...pageData,
                questionDetailDetail: "",
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
