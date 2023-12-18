import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import './surveydetail.scss';

const SurveyDetailPage = ({onClickBack, surveyData}) => {
    return (
        <div className="survey__detail__wrapper">
            <div className="survey__detail__heading__wrapper">
                <Button variant="contained" color="primary" onClick={() => onClickBack()}>Back</Button>
                <Typography variant="h4" component="h1" gutterBottom>
                    Survey Detail
                </Typography>
                <Button className="survey__detail__header__button" variant="contained" color="primary">New Audit</Button>
            </div>

            <div className="survey__detail__card__container">
                {surveyData.map((questionItem, index) => (
                    <Card key={index} variant="outlined" className="survey__detail__card__content">
                        <CardContent>
                            <Typography variant="h6" component="div" gutterBottom className="survey__detail__card__content__question">
                                {questionItem.question}
                            </Typography>
                            {questionItem.answers.map((answer, answerIndex) => (
                                <Typography key={answerIndex} variant="body1" component="div" className="survey__detail__card__content__answer">
                                    {answer}
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