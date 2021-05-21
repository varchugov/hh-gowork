import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const CheckboxGroup = (props) => {
    const data = props.data.question.answers.reduce((data, cur) => ({ ...data, [cur.id]: false }), {});
    const [state, setState] = useState(data);
    const [disabled, setDisabled] = useState(false);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const answerIsCorrect = () => {
        const optionIds = [];
        for (const optionId in state) {
            if (state[optionId]) {
                optionIds.push(optionId);
            }
        }

        return props.data.answer.correctId.sort().join(',') === optionIds.sort().join(',');
    };

    const onSubmit = () => {
        setDisabled(true);
        props.onAnswer(answerIsCorrect());
    };

    return (
        <FormControl component="fieldset">
            <FormGroup>
                {props.data.question.answers.map((option) => (
                    <FormControlLabel
                        key={option.id}
                        control={
                            <Checkbox
                                checked={state[option.answer]}
                                disabled={disabled}
                                onChange={handleChange}
                                name={option.id.toString()}
                                color={'primary'}
                            />
                        }
                        label={option.answer}
                    />
                ))}
                <Box mt={2}>
                    <Button variant={'contained'} color={'primary'} onClick={onSubmit} disabled={disabled}>
                        Ответить
                    </Button>
                </Box>
            </FormGroup>
        </FormControl>
    );
};

export default CheckboxGroup;
