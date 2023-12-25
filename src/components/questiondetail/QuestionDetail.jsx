import { Card, CardContent, Typography, Button, Grid  } from '@material-ui/core';
import "./questiondetail.scss"

const QuestionDetail = ({onClickBack, questionData }) => {
    console.log(questionData)
    return (
        <div className="question__detail__container">
            <div className = "question__detail__heading__wrapper" >
                <Button variant="contained" color="primary" onClick={() => onClickBack()}>
                    Back
                </Button>
                <div className='question__detail__heading__question'>
                  {questionData.question}
                </div>
            </div>
            <div className = "answer__detail__container">
                {questionData.user_responses.map((responseItem) =>(
                    <Card key={responseItem.response_id} variant="outlined" className="answer__detail__card__content">
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={4} className="answer__detail__card__content_userdetail">
                          <Typography component="div" gutterBottom className="answer__detail__card__content_userdetail_name">
                            Name: {responseItem.user_name}
                          </Typography>
                          <Typography component="div" gutterBottom className="answer__detail__card__content_userdetail_age">
                            Age: {responseItem.user_age}
                          </Typography>
                          <Typography component="div" gutterBottom className="answer__detail__card__content_userdetail_department">
                            Department: {responseItem.user_department}
                          </Typography>
                        </Grid>
                        <Grid item xs={8} className="answer__detail__card__content_response">
                            Answer: {responseItem.response}
                        </Grid>
                      </Grid>
                      <Button variant="contained" color="primary" className='note_buttom' >
                        Note
                      </Button>
                    </CardContent>
                  </Card>
                ))}

            </div>
        </div>
    )
}
export default QuestionDetail