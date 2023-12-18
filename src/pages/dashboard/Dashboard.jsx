import PageTitle from "../../components/pagetitle/PageTitle";
import { useEffect, useState } from "react";
import "./dashboard.scss";
import SurveyDetail from "../../components/surveydetail/SurveyDetail";

const surveyData = [
    {
        question: 'Question 1:',
        answers: ['Answer 1a', 'Answer 1b', 'Answer 1c']
    },
    {
        question: 'Question 2:',
        answers: ['Answer 2a', 'Answer 2b', 'Answer 2c']
    },
    {
        question: 'Question 3:',
        answers: ['Answer 3a', 'Answer 3b', 'Answer 3c']
    },
    {
        question: 'Question 3:',
        answers: ['Answer 3a', 'Answer 3b', 'Answer 3c']
    },
    {
        question: 'Question 3:',
        answers: ['Answer 3a', 'Answer 3b', 'Answer 3c']
    },
    {
        question: 'Question 3:',
        answers: ['Answer 3a', 'Answer 3b', 'Answer 3c']
    },
    {
        question: 'Question 3:',
        answers: ['Answer 3a', 'Answer 3b', 'Answer 3c']
    }
];

const Dashboard = () => {
    const [surveys, setSurveys] = useState([]);
    const [selectedSurvey, setSelectedSurvey] = useState(false);

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
                setSurveys(sortedSurveys);
            });
    }, []);

    const handleSurveyClick = (survey) => {
        setSelectedSurvey(survey);
    };

    return (
        <div className="dashboard__container">
            <PageTitle>Dashboard</PageTitle>

            {selectedSurvey ? (
                <div className="dashboard__survey__detail">
                    <SurveyDetail surveyData={selectedSurvey} onClickBack={setSelectedSurvey} />
                </div>
            ) : (
                <div className="dashboard__survey__list">
                    {surveys.map((survey) => (
                        <div
                            key={survey.id}
                            className="survey__card"
                            onClick={() => handleSurveyClick(surveyData)}
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
        </div>
    );
};

export default Dashboard;