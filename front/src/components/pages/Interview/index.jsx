import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';

import withTheme from '@material-ui/core/styles/withTheme';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import Header from 'src/components/shared/Header';
import UserSettings from 'src/components/shared/UserSettings';

const Interview = observer((props) => {
    const [cameraIsAllowed, setCameraIsAllowed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [videoIsRecording, setVideoIsRecording] = useState(false);
    const [videoIsPlaying, setVideoIsPlaying] = useState(false);
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const videoPlayer = useRef(null);
    const mediaRecorder = useRef(null);
    const recordedBlobs = useRef(null);
    const streamRef = useRef(null);

    const setVideoPlayerRecordProperties = () => {
        videoPlayer.current.src = null;
        videoPlayer.current.srcObject = streamRef.current;
        videoPlayer.current.controls = false;
        videoPlayer.current.muted = true;
    };

    const startCamera = async (constraints) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            setErrorMessage(null);
            setCameraIsAllowed(true);

            streamRef.current = stream;
            setVideoPlayerRecordProperties();
        } catch (e) {
            setErrorMessage('Предоставьте доступ к камере');
        }
    };

    const onCameraStart = async () => {
        const constraints = {
            audio: {
                echoCancellation: { exact: true },
            },
            video: true,
        };

        await startCamera(constraints);
    };

    const handleDataAvailable = (event) => {
        if (event.data && event.data.size > 0) {
            recordedBlobs.current.push(event.data);
            setVideoIsPlaying(true);
        }
    };

    const onRecordStart = () => {
        setVideoIsPlaying(false);
        setVideoIsRecording(true);
    };

    const onRecordStop = () => {
        mediaRecorder.current.stop();
        setVideoIsRecording(false);
    };

    useEffect(() => {
        if (videoIsPlaying && recordedBlobs.current) {
            const superBuffer = new Blob(recordedBlobs.current, { type: 'video/webm' });
            videoPlayer.current.srcObject = null;
            videoPlayer.current.src = window.URL.createObjectURL(superBuffer);
            videoPlayer.current.controls = true;
            videoPlayer.current.muted = false;
            videoPlayer.current.play();
        }
    }, [videoIsPlaying]);

    useEffect(() => {
        if (videoIsRecording && !videoIsPlaying) {
            setVideoPlayerRecordProperties();
            recordedBlobs.current = [];

            try {
                mediaRecorder.current = new MediaRecorder(streamRef.current, { mimeType: 'video/webm' });
                setErrorMessage(null);
            } catch (e) {
                setErrorMessage('Произошла ошибка');
            }

            mediaRecorder.current.ondataavailable = handleDataAvailable;
            mediaRecorder.current.start();
        }
    }, [videoIsRecording, videoIsPlaying]);

    const renderIntro = () => (
        <React.Fragment>
            <Box style={props.theme.paragraph}>
                Поздравляю! Вы закончили блок теории, пришло время приступить к практике!
            </Box>
            <Box style={props.theme.paragraph}>
                В этом блоке мы будем учиться на практике проходить реальные видео собеседования.
                <br />
                Сервис будет записывать ваши ответы на вопросы, которые вы не знаете заранее.
                <br />
                После этого мы вместе с вами сможем посмотреть на ваши ответы и дать комментарии о том, что можно
                улучшить.
            </Box>
            <Box style={props.theme.paragraph}>Предоставьте доступ к камере, что бы мы могли начать практику.</Box>
            <Button variant={'contained'} color={'primary'} onClick={onCameraStart}>
                Далее
            </Button>
            {errorMessage && (
                <Box color={'error.main'} my={2}>
                    {errorMessage}
                </Box>
            )}
        </React.Fragment>
    );

    const renderPlayerControls = () => (
        <React.Fragment>
            <Button variant={'contained'} color={'primary'} onClick={onRecordStart}>
                Перезаписать
            </Button>
        </React.Fragment>
    );

    const renderRecorderControls = () => (
        <React.Fragment>
            {videoIsRecording ? (
                <Button variant={'contained'} color={'primary'} onClick={onRecordStop}>
                    Остановить запись
                </Button>
            ) : (
                <Button variant={'contained'} color={'primary'} onClick={onRecordStart}>
                    Начать запись
                </Button>
            )}
        </React.Fragment>
    );

    const interviewSteps = [
        'Расскажите о себе',
        'Кем вы видите себя через несколько лет?',
        'Какие ваши сильные стороны?',
        'Какие ваши слабые стороны?',
        'Расскажите о своих неудачах',
        'Какими будут ваши первые шаги на новом месте работы?',
        'Что вы больше всего цените в коллективе?',
        'Что вы надеетесь получить от этой работы?',
        'Почему вы ушли с прошлой работы?',
        'Какой уровень зарплаты вас устроит?',
    ];

    const renderMainContent = () => (
        <React.Fragment>
            <Box style={props.theme.paragraph}>
                Нажмите кнопку &quot;Начать запись&quot; и ответьте на следующие вопросы:
            </Box>
            <Box style={props.theme.paragraph}>{interviewSteps[activeStep]}</Box>
            <MobileStepper
                steps={interviewSteps.length}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === interviewSteps.length - 1}>
                        дальше
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        назад
                    </Button>
                }
            />
            {errorMessage && (
                <Box color={'error.main'} my={2}>
                    {errorMessage}
                </Box>
            )}
            <video style={props.theme.videoPlayer} ref={videoPlayer} playsInline={true} autoPlay={true}></video>
            {videoIsPlaying ? renderPlayerControls() : renderRecorderControls()}
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Header UserSettings={UserSettings} progressPercentage={0} />
            <Container>
                <Box style={props.theme.h5} color={'#A1A1A1'} fontWeight="fontWeightBold" my={3}>
                    {`§ Собеседование`}
                </Box>
                {cameraIsAllowed ? renderMainContent() : renderIntro()}
            </Container>
        </React.Fragment>
    );
});

export default withTheme(Interview);
