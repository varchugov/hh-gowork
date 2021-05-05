import React from 'react';
import { Paper, Box } from '@material-ui/core';
import { withTheme } from '@material-ui/core/styles';

const TestStep = (props) => (
    <Box mb={5}>
        <Box mt={2} mb={2} fontSize={11} fontWeight="fontWeightBold">
            Задание {props.number}
        </Box>
        <Box mb={2} fontSize={11} dangerouslySetInnerHTML={{ __html: props.data.question.html }}></Box>
        <Paper elevation={10}>
            <Box px={3} py={1.5}>
                <Box style={props.theme.h6}>Ваш ответ:</Box>
            </Box>
        </Paper>
    </Box>
);

export default withTheme(TestStep);
