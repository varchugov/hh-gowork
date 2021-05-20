import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const GolearnCard = styled(Card)`
    margin: 25px auto;
    padding: 15px;
    min-width: 240px;
    max-width: 440px;
    background-color: #0e4da4;
`;

const GolearnCardContent = styled(CardContent)`
    color: #fff;
`;

const GolearnCardActions = styled(CardActions)`
    display: flex;
    justify-content: space-around;
`;

function Golearn() {
    const iLesson = 1;
    const countLessons = 11;

    return (
        <GolearnCard>
            <GolearnCardContent>
                <Typography gutterBottom>
                    Урок {iLesson} из {countLessons}
                </Typography>
                <Typography variant="h6" component="h2" align="center">
                    Как искать и находить <br /> работу мечты
                </Typography>
            </GolearnCardContent>
            <GolearnCardActions>
                <Button size="large" variant="contained">
                    Учиться
                </Button>
            </GolearnCardActions>
        </GolearnCard>
    );
}

export default Golearn;
