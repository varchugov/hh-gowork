import React, { useCallback, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withTheme from '@material-ui/core/styles/withTheme';

import Api from 'src/api';

const RadioButtonGroup = (props) => {
    const [radioGroupValue, setRadioGroupValue] = useState(props.data.userAnswer);
    const [disabled, setDisabled] = useState(props.answerIsComplete);

    const onAnswerCheck = useCallback(() => {
        let newAnswerIsCorrectValue = true;
        if (!props.data.correctAnswers.includes(Number(radioGroupValue))) {
            newAnswerIsCorrectValue = false;
        }

        props.onAnswerIsGiven(
            newAnswerIsCorrectValue,
            props.data.answersExplanations[newAnswerIsCorrectValue ? 'correct' : 'wrong']
        );
    }, [props, radioGroupValue]);

    useEffect(() => {
        if (props.answerIsComplete) {
            onAnswerCheck();
        }
    }, [props, onAnswerCheck]);

    const handleChange = useCallback((event) => {
        setRadioGroupValue(event.target.value);
    }, []);

    const onSubmit = () => {
        setDisabled(true);
        Api.getAnswerExplanation(radioGroupValue)
            .then(() => {
                onAnswerCheck();
                props.onAnswerSubmit();
            })
            .catch();
    };

    const getRadioButtonStyle = (option) => {
        if (props.data.userAnswer) {
            return {
                color: props.data.correctAnswers.includes(Number(option.id.toString()))
                    ? props.theme.palette.primary.main
                    : props.theme.palette.error.main,
            };
        }
        return {};
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={radioGroupValue} onChange={handleChange}>
                {props.data.question.answers.map((option) => (
                    <FormControlLabel
                        value={option.id.toString()}
                        disabled={disabled}
                        key={option.id}
                        control={<Radio color={'primary'} style={getRadioButtonStyle(option)} />}
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
                            {props.data.question.button || 'Ответить'}
                        </Button>
                    </Box>
                )}
            </RadioGroup>
        </FormControl>
    );
};

export default withTheme(RadioButtonGroup);
