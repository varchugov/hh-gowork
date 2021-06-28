import React, { useState, useEffect, useCallback, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import withTheme from '@material-ui/core/styles/withTheme';

import TestStep from 'src/components/pages/Test/components/TestStep';

import Header from 'src/components/shared/Header';
import SharedNav from 'src/components/shared/Nav';
import UserSettings from 'src/components/shared/UserSettings';

import store from 'src/store';

import Api from 'src/api';

const Test = observer((props) => {
    const [currentParagraph, setCurrentParagraph] = useState(null);
    const [currentParagraphIndex, setCurrentParagraphIndex] = useState(null);
    const [currentChapterId, setCurrentChapterId] = useState(null);
    const [currentChapterName, setCurrentChapterName] = useState(null);
    const [currentStepId, setCurrentStepId] = useState(null);
    const [chapterProgressPercentage, setChapterProgressPercentage] = useState(0);
    const [nextstepIsLoading, setNextstepIsLoading] = useState(false);

    const bottomRef = useRef();
    const searchParams = new URLSearchParams(props.location.search);
    const chapterQueryId = searchParams.get('chapter');
    const paragraphQueryId = searchParams.get('paragraph');
    const queryParametersArePresent = chapterQueryId && paragraphQueryId;

    const getCurrentData = useCallback((chapters) => {
        for (const chapter of chapters) {
            if (chapter.current !== null && chapter.currentStep !== null) {
                return {
                    id: chapter.id,
                    currentStep: chapter.currentStep,
                    name: chapter.name,
                    totalSteps: chapter.totalSteps,
                    currentParagraph: chapter.currentParagraph,
                };
            }
        }

        return null;
    }, []);

    const scrollToBottom = useCallback(() => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const onGetCurrentStepResponse = useCallback(
        (response) => {
            const data = response.data;

            setCurrentParagraph(data[(paragraphQueryId || data.length) - 1]);

            if (!queryParametersArePresent) {
                scrollToBottom();
            }
        },
        [queryParametersArePresent, paragraphQueryId, scrollToBottom]
    );

    const onGetContentResponse = useCallback(
        (response) => {
            store.menuSetContent(response.data);
            const currentIds = getCurrentData(store.menuContent);
            const chapterId = chapterQueryId || currentIds.id;

            setCurrentChapterId(chapterId);
            setCurrentStepId(currentIds.currentStep);
            setCurrentChapterName(currentIds.name);
            setCurrentParagraphIndex(paragraphQueryId || currentIds.currentParagraph);
            setChapterProgressPercentage((currentIds.currentStep / currentIds.totalSteps) * 100);
            Api.getParagraphs(chapterId, currentIds.currentStep)
                .then(onGetCurrentStepResponse)
                .catch()
                .finally(() => {
                    setNextstepIsLoading(false);
                });
        },
        [onGetCurrentStepResponse, getCurrentData, chapterQueryId, paragraphQueryId]
    );

    const getContent = useCallback(() => {
        setNextstepIsLoading(true);
        Api.getContent().then(onGetContentResponse).catch();
    }, [onGetContentResponse]);

    useEffect(() => {
        getContent();
    }, [getContent]);

    const onGetNextStep = useCallback(() => {
        setNextstepIsLoading(true);
        scrollToBottom();
        Api.getNextStep(currentStepId).then(getContent).catch();
    }, [currentStepId, getContent, scrollToBottom]);

    return (
        <React.Fragment>
            <Header UserSettings={UserSettings} TestNav={SharedNav} progressPercentage={chapterProgressPercentage} />
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
                    <Box display="flex" justifyContent="center" my={2}>
                        <CircularProgress />
                    </Box>
                )}
            </Container>
            <div ref={bottomRef} />
        </React.Fragment>
    );
});

export default withRouter(withTheme(Test));
