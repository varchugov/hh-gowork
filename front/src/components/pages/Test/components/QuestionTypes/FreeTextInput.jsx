import React, { useState, useCallback } from 'react';

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

    const onSubmit = useCallback(() => {
        setDisabled(true);
        Api.getAnswerExplanation(textAreaValue)
            .then(() => {
                props.onAnswer(true, 'Спасибо за ответ!');
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
            />
            {!disabled && (
                <Box mt={2}>
                    <Button variant={'contained'} color={'primary'} onClick={onSubmit} disabled={textAreaValue === ''}>
                        Ответить
                    </Button>
                </Box>
            )}
        </React.Fragment>
    );
};

export default RadioButtonGroup;
