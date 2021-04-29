import React from 'react';
import { LinearProgress } from '@material-ui/core';

const Test = () => {
    const progressPercentage = 25;

    return <LinearProgress variant="determinate" value={progressPercentage} />;
};

export default Test;
