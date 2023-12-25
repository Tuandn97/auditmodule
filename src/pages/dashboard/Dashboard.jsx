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
    })

    useEffect(() => {
        fetch("https://mocki.io/v1/e21487a2-9fed-48d9-9910-48ac2f7ae519")
            .then((response) => response.json())
            .then((json) => {
                const sortedSurveys = json.sort((a, b) => {
                    const statusOrder = {
                        processing: 1,
                        new: 2,
                        audited: 3,
                    };
                    return statusOrder[a.status] - statusOrder[b.status];
                });
                setPageData({
                    ...{
                        surveyList: "",
                        surveyDetail: "",
                        questionDetail: ""
                    },
                    surveyList: sortedSurveys,
                });
            });
    }, []);


    const handleQuestionClick = (question) =>{
        //send the question ID to the backend 
        fetch("https://mocki.io/v1/194d4f0d-5b5a-450c-bac4-c9e393e52a5c") // with question id
            .then((response)=> response.json())
            .then((questionData)=> {
                //Load the question details based on the ID
                setPageData({
                    ...pageData,
                    questionDetail: questionData,
                })
            })
        setSelectedPage("3");
    };


    const handleSurveyClick = (survey) => {
        // Send the survey ID to the backend
        fetch("https://mocki.io/v1/ba0c3b6c-20ea-40c4-be90-93f834dc5516")
        .then((response) => response.json())
        .then((surveyData) => {
            // Load the survey details based on the ID
            setPageData({
                ...pageData,
                surveyDetail: surveyData,
            });
        })
        setSelectedPage("2");
    };

    return (
        <div className="dashboard__container">
            <PageTitle>Dashboard</PageTitle>

            {(pageData.questionDetail === "" && pageData.surveyDetail === "" && pageData.surveyList === "") && (
                <Typography color='error'>Error happen !</Typography>
            )}

            {(selectedPage === "2" && pageData.surveyDetail !== "") && (
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
                    onClickQuestion={handleQuestionClick}
                    />
                </div>
            )}
            {(selectedPage === "1" && pageData.surveyList !== "") && (
                <div className="dashboard__survey__list">
                    {pageData.surveyList.map((survey) => (
                        <div
                            key={survey.id}
                            className="survey__card"
                            onClick={() => handleSurveyClick(survey)}
                        >
                            <div className="survey__card__content">
                                <div className="survey__card__info">
                                    <h4>{survey.surveyName}</h4>
                                    <p>{survey.description}</p>
                                </div>
                                <div
                                    className={`survey__card__status ${survey.status.toLowerCase()}`}
                                >
                                    {survey.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {(selectedPage === "3" && pageData.questionDetail !== "") && (
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
