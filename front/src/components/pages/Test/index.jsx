import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import withTheme from '@material-ui/core/styles/withTheme';

import TestStep from 'src/components/pages/Test/components/TestStep';

import Header from 'src/components/shared/Header';
import SharedNav from 'src/components/shared/Nav';
import UserSettings from 'src/components/shared/UserSettings';

import store from 'src/store';

import Api from 'src/api';

const getCurrentData = (chapters) => {
    for (const chapter of chapters) {
        if (chapter.current !== null && chapter.currentStep !== null) {
            return [chapter.id, chapter.currentStep, chapter.name];
        }
    }

    return null;
};

const Test = observer((props) => {
    const [currentParagraph, setCurrentParagraph] = useState(null);
    const [currentChapterId, setCurrentChapterId] = useState(null);
    const [currentChapterName, setCurrentChapterName] = useState(null);
    const [currentStepId, setCurrentStepId] = useState(null);
    const [chapterProgressPercentage, setChapterProgressPercentage] = useState(0);

    const onGetCurrentStepResponse = (response) => {
        const data = response.data;

        setCurrentParagraph(data[data.length - 1]);
    };

    const onGetParagraphs = (response, currentStep) => {
        let currentStepNumber = 0;
        const paragraphSteps = response.data
            .map((paragraph) => paragraph.steps)
            .reduce((acc, cur) => acc.concat(cur), []);

        while (paragraphSteps[currentStepNumber] && paragraphSteps[currentStepNumber].id !== currentStep) {
            currentStepNumber += 1;
        }

        setChapterProgressPercentage((currentStepNumber / paragraphSteps.length) * 100);
    };

    const onGetContentResponse = useCallback((response) => {
        store.menuSetContent(response.data);
        const currentIds = getCurrentData(store.menuContent);

        setCurrentChapterId(currentIds[0]);
        setCurrentStepId(currentIds[1]);
        setCurrentChapterName(currentIds[2]);
        Api.getParagraphs(currentIds[0])
            .then((response) => onGetParagraphs(response, currentIds[1]))
            .catch();
        Api.getCurrentStep(currentIds[0], currentIds[1]).then(onGetCurrentStepResponse).catch();
    }, []);

    const getContent = useCallback(() => {
        Api.getContent().then(onGetContentResponse).catch();
    }, [onGetContentResponse]);

    useEffect(() => {
        getContent();
    }, [getContent]);

    const onGetNextStep = () => {
        Api.getNextStep(currentStepId).then(getContent).catch();
    };

    return (
        <React.Fragment>
            <Header UserSettings={UserSettings} TestNav={SharedNav} />
            <LinearProgress variant="determinate" value={chapterProgressPercentage} />
            <Container>
                <Box style={props.theme.h5} color={'#A1A1A1'} fontWeight="fontWeightBold" mt={5}>
                    {`§ ${currentChapterName}`}
                </Box>
                {currentParagraph && (
                    <React.Fragment>
                        <Box style={props.theme.h6} fontWeight="fontWeightBold" mt={2} mb={2}>
                            {`${currentChapterId}.${currentParagraph.id} ${currentParagraph.name}`}
                        </Box>
                        {currentParagraph.steps.map((step) => (
                            <TestStep
                                key={step.id}
                                data={step}
                                getNextStep={onGetNextStep}
                                answerIsComplete={step.id !== currentStepId}
                            />
                        ))}
                    </React.Fragment>
                )}
            </Container>
        </React.Fragment>
    );
});

export default withTheme(Test);
