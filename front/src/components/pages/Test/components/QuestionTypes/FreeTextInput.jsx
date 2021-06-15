import React, { useState, useCallback, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Api from 'src/api';

const RadioButtonGroup = (props) => {
    const [textAreaValue, setTextAreaValue] = useState(props.data.userAnswer || '');
    const [disabled, setDisabled] = useState(props.answerIsComplete);

    const handleChange = useCallback((event) => {
        setTextAreaValue(event.target.value);
    }, []);

    useEffect(() => {
        if (props.answerIsComplete) {
            props.onAnswerIsGiven(true, props.data.answersExplanations.correct);
        }
    }, [props]);

    const onSubmit = useCallback(() => {
        setDisabled(true);
        Api.getAnswerExplanation(textAreaValue)
            .then(() => {
                props.onAnswerIsGiven(true, props.data.answersExplanations.correct);
                props.onAnswerSubmit();
            })
            .catch();
    }, [props, textAreaValue]);

    return (
        <React.Fragment>
            <TextareaAutosize
                rowsMin={3}
                placeholder="Введите ответ текстом"
                style={{ fontSize: '14px', width: '100%' }}
                onChange={handleChange}
                value={textAreaValue}
                disabled={disabled}
            />
            {!disabled && (
                <Box mt={2}>
                    <Button variant={'contained'} color={'primary'} onClick={onSubmit} disabled={textAreaValue === ''}>
                        {props.data.question.button || 'Ответить'}
                    </Button>
                </Box>
            )}
        </React.Fragment>
    );
};

export default RadioButtonGroup;
