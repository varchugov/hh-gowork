import React, { useState, useCallback, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Api from 'src/api';

const EmptyQuestion = (props) => {
    const [disabled, setDisabled] = useState(props.answerIsComplete);

    useEffect(() => {
        if (props.answerIsComplete) {
            props.onAnswerIsGiven(true, props.data.answersExplanations.correct);
        }
    }, [props]);

    const onSubmit = useCallback(() => {
        setDisabled(true);
        Api.getAnswerExplanation('')
            .then(() => {
                props.onAnswerIsGiven(true, props.data.answersExplanations.correct);
                props.onAnswerSubmit();
            })
            .catch();
    }, [props]);

    return (
        <React.Fragment>
            {!props.answerIsComplete && (
                <Box my={1}>
                    <Button variant={'contained'} color={'primary'} onClick={onSubmit} disabled={disabled}>
                        {props.data.question.button || 'Ответить'}
                    </Button>
                </Box>
            )}
        </React.Fragment>
    );
};

export default EmptyQuestion;
