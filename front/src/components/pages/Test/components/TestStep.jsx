import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withTheme from '@material-ui/core/styles/withTheme';
import CheckboxGroup from 'src/components/pages/Test/components/QuestionTypes/CheckboxGroup';

const TestStep = (props) => {
    const [answerIsGiven, setAnswerIsGiven] = useState(false);
    const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const onAnswer = (answerIsCorrect) => {
        setAnswerIsCorrect(answerIsCorrect);
        setAnswerIsGiven(true);
    };

    const getNextStep = () => {
        setDisabled(true);
        props.getNextStep();
    };

    return (
        <Box mb={5}>
            <Box mb={2} fontSize={11} dangerouslySetInnerHTML={{ __html: props.data.theory }}></Box>
            <Paper elevation={10}>
                <Box px={3} py={1.5}>
                    <Box style={props.theme.h6} mb={2}>
                        Ваш ответ:
                    </Box>
                    {props.data.question.type === 'checkbox' && <CheckboxGroup data={props.data} onAnswer={onAnswer} />}
                </Box>
            </Paper>
            {answerIsGiven && (
                <React.Fragment>
                    <Box
                        fontSize={9}
                        borderLeft={1}
                        borderColor={answerIsCorrect ? 'primary.main' : 'error.main'}
                        my={3}
                        pl={3}
                        py={1}
                    >
                        {props.data.answer.explanation}
                    </Box>
                    <Button variant={'contained'} color={'primary'} onClick={getNextStep} disabled={disabled}>
                        Далее
                    </Button>
                </React.Fragment>
            )}
        </Box>
    );
};

export default withTheme(TestStep);
