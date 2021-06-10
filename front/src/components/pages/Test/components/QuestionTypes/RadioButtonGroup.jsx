import React, { useCallback, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Api from 'src/api';

const RadioButtonGroup = (props) => {
    const [radioGroupValue, setRadioGroupValue] = useState(null);
    const [answerIsCorrect, setAnswerIsCorrect] = useState(true);
    const [disabled, setDisabled] = useState(props.disabled);

    const handleChange = useCallback((event) => {
        setRadioGroupValue(event.target.value);
    }, []);

    const onAnswerCheck = (response) => {
        let newAnswerIsCorrectValue = true;
        if (radioGroupValue !== response.data[0].id.toString()) {
            newAnswerIsCorrectValue = false;
            setAnswerIsCorrect(newAnswerIsCorrectValue);
        }

        props.onAnswer(newAnswerIsCorrectValue, response.data[0].explanation);
    };

    const onSubmit = () => {
        setDisabled(true);
        Api.checkAnswer().then(onAnswerCheck).catch();
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={radioGroupValue} onChange={handleChange}>
                {props.data.question.answers.map((option) => (
                    <FormControlLabel
                        value={option.id.toString()}
                        disabled={disabled}
                        key={option.id}
                        control={
                            <Radio
                                color={'primary'}
                                style={
                                    radioGroupValue === option.id.toString() && !answerIsCorrect ? { color: 'red' } : {}
                                }
                            />
                        }
                        label={option.answer}
                    />
                ))}
                {!disabled && (
                    <Box mt={2}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            onClick={onSubmit}
                            disabled={radioGroupValue === null}
                        >
                            Ответить
                        </Button>
                    </Box>
                )}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioButtonGroup;
