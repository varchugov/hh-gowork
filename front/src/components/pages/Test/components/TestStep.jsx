import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import withTheme from '@material-ui/core/styles/withTheme';
import CheckboxGroup from 'src/components/pages/Test/components/QuestionTypes/CheckboxGroup';
import RadioButtonGroup from 'src/components/pages/Test/components/QuestionTypes/RadioButtonGroup';

const TestStep = (props) => {
    const [answerIsGiven, setAnswerIsGiven] = useState(false);
    const [answerIsCorrect, setAnswerIsCorrect] = useState(true);
    const [answerExplanation, setAnswerExplanation] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const onAnswer = (answerIsCorrect, explanation) => {
        setAnswerIsGiven(true);
        setAnswerIsCorrect(answerIsCorrect);
        setAnswerExplanation(explanation);
    };

    const getNextStep = () => {
        setDisabled(true);
        props.getNextStep();
    };

    return (
        <Box mb={5}>
            <Box mb={2} style={props.theme.h6} dangerouslySetInnerHTML={{ __html: props.data.theory }}></Box>
            <Paper elevation={10}>
                <Box px={3} py={1.5}>
                    <Box style={props.theme.h6} mb={2}>
                        Ваш ответ:
                    </Box>
                    {props.data.question.type === 'checkbox' && (
                        <CheckboxGroup data={props.data} onAnswer={onAnswer} disabled={props.disabled} />
                    )}
                    {props.data.question.type === 'radio' && (
                        <RadioButtonGroup data={props.data} onAnswer={onAnswer} disabled={props.disabled} />
                    )}
                </Box>
            </Paper>
            {answerIsGiven && (
                <React.Fragment>
                    <Box
                        style={props.theme.h6}
                        borderLeft={2}
                        borderColor={answerIsCorrect ? 'primary.main' : 'error.main'}
                        my={3}
                        pl={3}
                        py={1}
                    >
                        <div>{answerIsCorrect ? 'Правильно!' : ''}</div>
                        {answerExplanation}
                    </Box>
                    {!disabled && (
                        <Button variant={'contained'} color={'primary'} onClick={getNextStep}>
                            Далее
                        </Button>
                    )}
                </React.Fragment>
            )}
        </Box>
    );
};

export default withTheme(TestStep);
