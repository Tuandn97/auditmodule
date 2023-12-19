import PageTitle from "../../components/pagetitle/PageTitle";
import { useEffect, useState } from "react";
import "./dashboard.scss";
import SurveyDetail from "../../components/surveydetail/SurveyDetail";

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
        // Send the survey ID to the backend
        fetch("https://mocki.io/v1/ba0c3b6c-20ea-40c4-be90-93f834dc5516")
        .then((response) => response.json())
        .then((surveyData) => {
            // Load the survey details based on the ID
            setSelectedSurvey(surveyData);
        })
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
        </div>
    );
};

export default Dashboard;
