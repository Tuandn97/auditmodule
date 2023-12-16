import PageTitle from "../../components/pagetitle/PageTitle";
import { useEffect, useState } from "react";
import "./dashboard.scss";
import SurveyDetail from "../../components/surveydetail/SurveyDetail"

const Dashboard = () => {
    const [surveys, setSurveys] = useState([]);

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

    return (
        <div>
            <PageTitle>Dashboard</PageTitle>
            {surveys.map((survey) => (
                <div key={survey.id} className="survey__card">
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

            <SurveyDetail/>
        </div>
    );
};

export default Dashboard;