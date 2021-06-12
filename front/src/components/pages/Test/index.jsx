import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

import withTheme from '@material-ui/core/styles/withTheme';

import TestStep from 'src/components/pages/Test/components/TestStep';

import Header from 'src/components/shared/Header';
import SharedNav from 'src/components/shared/Nav';
import UserSettings from 'src/components/shared/UserSettings';

import store from 'src/store';

import Api from 'src/api';

const getParagraphIndex = (paragraphs, currentStep) => {
    for (const [paragraphIndex, paragraph] of paragraphs.entries()) {
        for (const step of paragraph.steps) {
            if (Number(step.id) === Number(currentStep)) {
                return paragraphIndex + 1;
            }
        }
    }

    return null;
};

const Test = observer((props) => {
    const [currentParagraph, setCurrentParagraph] = useState(null);
    const [currentParagraphIndex, setCurrentParagraphIndex] = useState(null);
    const [currentChapterId, setCurrentChapterId] = useState(null);
    const [currentChapterName, setCurrentChapterName] = useState(null);
    const [currentStepId, setCurrentStepId] = useState(null);
    const [chapterProgressPercentage, setChapterProgressPercentage] = useState(0);
    const [nextstepIsLoading, setNextstepIsLoading] = useState(false);

    const loaderRef = useRef();
    const searchParams = new URLSearchParams(props.location.search);
    const chapterQueryId = searchParams.get('chapter');
    const paragraphQueryId = searchParams.get('paragraph');
    const queryParametersArePresent = chapterQueryId && paragraphQueryId;

    const getCurrentData = useCallback(
        (chapters) => {
            for (const chapter of chapters) {
                if (queryParametersArePresent /* && chapter.id.toString() === chapterQueryId*/) {
                    return {
                        id: chapterQueryId,
                        currentStep: chapter.currentStep,
                        name: chapter.name,
                    };
                } else if (chapter.current !== null && chapter.currentStep !== null) {
                    return {
                        id: chapter.id,
                        currentStep: chapter.currentStep,
                        name: chapter.name,
                    };
                }
            }

            return null;
        },
        [chapterQueryId, queryParametersArePresent]
    );

    const onGetCurrentStepResponse = useCallback(
        (response) => {
            const data = response.data;

            setCurrentParagraph(data[(paragraphQueryId || data.length) - 1]);
        },
        [paragraphQueryId]
    );

    const onGetParagraphs = useCallback(
        (response, currentStep) => {
            let currentStepNumber = 0;
            const paragraphSteps = response.data
                .map((paragraph) => paragraph.steps)
                .reduce((acc, cur) => acc.concat(cur), []);

            setCurrentParagraphIndex(paragraphQueryId || getParagraphIndex(response.data, currentStep));

            while (paragraphSteps[currentStepNumber] && paragraphSteps[currentStepNumber].id !== currentStep) {
                currentStepNumber += 1;
            }

            setChapterProgressPercentage((currentStepNumber / paragraphSteps.length) * 100);
            setNextstepIsLoading(false);
        },
        [paragraphQueryId]
    );

    const onGetContentResponse = useCallback(
        (response) => {
            store.menuSetContent(response.data);
            const currentIds = getCurrentData(store.menuContent);

            setCurrentChapterId(currentIds.id);
            setCurrentStepId(currentIds.currentStep);
            setCurrentChapterName(currentIds.name);
            Api.getParagraphs(currentIds.id, null)
                .then((response) => onGetParagraphs(response, currentIds.currentStep))
                .catch();
            Api.getParagraphs(currentIds.id, currentIds.currentStep)
                .then(onGetCurrentStepResponse)
                .catch()
                .finally(() => {
                    setNextstepIsLoading(false);
                });
        },
        [onGetCurrentStepResponse, getCurrentData, onGetParagraphs]
    );

    const getContent = useCallback(() => {
        setNextstepIsLoading(true);
        Api.getContent().then(onGetContentResponse).catch();
    }, [onGetContentResponse]);

    useEffect(() => {
        getContent();
    }, [getContent]);

    useEffect(() => {
        if (loaderRef.current && !queryParametersArePresent) {
            loaderRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentParagraph, queryParametersArePresent]);

    const onGetNextStep = () => {
        setNextstepIsLoading(true);
        Api.getNextStep(currentStepId).then(getContent).catch();
    };

    return (
        <React.Fragment>
            <Header UserSettings={UserSettings} TestNav={SharedNav} />
            <LinearProgress variant="determinate" value={chapterProgressPercentage} />
            <Container>
                {currentParagraph && (
                    <React.Fragment>
                        {currentChapterName && (
                            <Box style={props.theme.h5} color={'#A1A1A1'} fontWeight="fontWeightBold" mt={4}>
                                {`§ ${currentChapterName}`}
                            </Box>
                        )}
                        {currentChapterId && currentParagraphIndex && (
                            <Box style={props.theme.h6} fontWeight="fontWeightBold" mt={2} mb={2}>
                                {`${currentChapterId}.${currentParagraphIndex} ${currentParagraph.name}`}
                            </Box>
                        )}
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
                {nextstepIsLoading && (
                    <Box display="flex" justifyContent="center" my={2} ref={loaderRef}>
                        <CircularProgress />
                    </Box>
                )}
            </Container>
        </React.Fragment>
    );
});

export default withRouter(withTheme(Test));
