import React, { useCallback, useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

import Api from 'src/api';

const CheckboxGroup = (props) => {
    const [checkboxCheckedStates, setCheckboxCheckedStates] = useState(
        props.data.question.answers.reduce((answer, cur) => ({ ...answer, [cur.id]: false }), {})
    );
    const [checkboxValidatedStyles, setCheckboxValidatedStyles] = useState({});
    const [disabled, setDisabled] = useState(props.disabled);

    const handleChange = useCallback(
        (event) => {
            setCheckboxCheckedStates({ ...checkboxCheckedStates, [event.target.value]: event.target.checked });
        },
        [checkboxCheckedStates]
    );

    const onAnswerCheck = (response) => {
        const answerResponse = response.data.reduce((answer, cur) => ({ ...answer, [cur.id]: cur.explanation }), {});
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

        props.onAnswer(answerIsCorrect, response.data[0].explanation);
    };

    const onSubmit = () => {
        setDisabled(true);
        Api.checkAnswer().then(onAnswerCheck).catch();
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
