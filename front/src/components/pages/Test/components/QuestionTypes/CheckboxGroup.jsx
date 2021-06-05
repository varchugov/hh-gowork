import React, { useCallback, useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import Api from 'src/api';

const CheckboxGroup = (props) => {
    const [checkboxCheckedStates, setCheckboxCheckedStates] = useState(
        props.answerIsComplete
            ? props.data.userAnswer
            : props.data.question.answers.reduce((answer, cur) => ({ ...answer, [cur.id]: false }), {})
    );
    const [checkboxValidatedStyles, setCheckboxValidatedStyles] = useState({});
    const [disabled, setDisabled] = useState(props.answerIsComplete);

    const handleChange = useCallback(
        (event) => {
            setCheckboxCheckedStates({ ...checkboxCheckedStates, [event.target.value]: event.target.checked });
        },
        [checkboxCheckedStates]
    );

    const onAnswerCheck = useCallback(
        (data) => {
            const answerResponse = data.reduce((answer, cur) => ({ ...answer, [cur.id]: cur.explanation }), {});
            let answerIsCorrect = true;

            for (const checkboxId in checkboxCheckedStates) {
                const checkboxIsInvalid =
                    (answerResponse.hasOwnProperty(checkboxId) && checkboxCheckedStates[checkboxId] === false) ||
                    (!answerResponse.hasOwnProperty(checkboxId) && checkboxCheckedStates[checkboxId] === true);

                if (checkboxIsInvalid) {
                    answerIsCorrect = false;
                }

                setCheckboxValidatedStyles((checkboxValidatedStyles) => ({
                    ...checkboxValidatedStyles,
                    [checkboxId]: checkboxIsInvalid ? { color: 'red' } : {},
                }));
            }

            props.onAnswer(answerIsCorrect, data[0].explanation);
        },
        [props, checkboxCheckedStates]
    );

    useEffect(() => {
        if (props.answerIsComplete) {
            onAnswerCheck(props.data.answersExplanations);
        }
    }, [props, onAnswerCheck]);

    const onSubmit = () => {
        setDisabled(true);
        Api.getAnswerExplanation(checkboxCheckedStates)
            .then((response) => {
                onAnswerCheck(response.data);
            })
            .catch();
    };

    return (
        <FormControl component="fieldset">
            <FormGroup>
                {props.data.question.answers.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        control={
                            <Checkbox
                                checked={checkboxCheckedStates[option.id]}
                                disabled={disabled}
                                onChange={handleChange}
                                value={option.id.toString()}
                                color={'primary'}
                                style={checkboxValidatedStyles[option.id]}
                            />
                        }
                        label={option.answer}
                    />
                ))}
                {!disabled && (
                    <Box mt={2}>
                        <Button variant={'contained'} color={'primary'} onClick={onSubmit}>
                            Ответить
                        </Button>
                    </Box>
                )}
            </FormGroup>
        </FormControl>
    );
};

export default CheckboxGroup;
