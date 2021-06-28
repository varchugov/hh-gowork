import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import withTheme from '@material-ui/core/styles/withTheme';
import CheckboxGroup from 'src/components/pages/Test/components/QuestionTypes/CheckboxGroup';
import RadioButtonGroup from 'src/components/pages/Test/components/QuestionTypes/RadioButtonGroup';
import FreeTextInput from 'src/components/pages/Test/components/QuestionTypes/FreeTextInput';
import EmptyQuestion from 'src/components/pages/Test/components/QuestionTypes/EmptyQuestion';

const TestStep = (props) => {
    const [answerIsGiven, setAnswerIsGiven] = useState(false);
    const [answerIsCorrect, setAnswerIsCorrect] = useState(true);
    const [answerExplanation, setAnswerExplanation] = useState(null);

    const onAnswerSubmit = () => {
        props.getNextStep();
    };

    const onAnswerIsGiven = (answerIsCorrect, explanation) => {
        setAnswerIsGiven(true);
        setAnswerIsCorrect(answerIsCorrect);
        setAnswerExplanation(explanation);
    };

    return (
        <Box mb={5}>
            <Box mb={2} style={props.theme.testStepContent} dangerouslySetInnerHTML={{ __html: props.data.theory }} />
            {!(props.data.question.type === 'empty' && props.answerIsComplete) && (
                <Paper elevation={10}>
                    <Box px={3} py={1.5}>
                        {props.data.question.type !== 'empty' && (
                            <Box style={props.theme.h6} mb={2}>
                                Ваш ответ:
                            </Box>
                        )}
                        {props.data.question.type === 'checkbox' && (
                            <CheckboxGroup
                                data={props.data}
                                onAnswerSubmit={onAnswerSubmit}
                                onAnswerIsGiven={onAnswerIsGiven}
                                answerIsComplete={props.answerIsComplete}
                            />
                        )}
                        {props.data.question.type === 'radiobutton' && (
                            <RadioButtonGroup
                                data={props.data}
                                onAnswerSubmit={onAnswerSubmit}
                                onAnswerIsGiven={onAnswerIsGiven}
                                answerIsComplete={props.answerIsComplete}
                            />
                        )}
                        {props.data.question.type === 'free' && (
                            <FreeTextInput
                                data={props.data}
                                onAnswerSubmit={onAnswerSubmit}
                                onAnswerIsGiven={onAnswerIsGiven}
                                answerIsComplete={props.answerIsComplete}
                            />
                        )}
                        {props.data.question.type === 'empty' && (
                            <EmptyQuestion
                                data={props.data}
                                onAnswerSubmit={onAnswerSubmit}
                                onAnswerIsGiven={onAnswerIsGiven}
                                answerIsComplete={props.answerIsComplete}
                            />
                        )}
                    </Box>
                </Paper>
            )}
            {answerIsGiven && answerExplanation && (
                <Box
                    style={props.theme.testStepContent}
                    borderLeft={2}
                    borderColor={answerIsCorrect ? 'primary.main' : 'error.main'}
                    my={3}
                    pl={3}
                    py={1}
                >
                    {answerExplanation}
                </Box>
            )}
        </Box>
    );
};

export default withTheme(TestStep);
