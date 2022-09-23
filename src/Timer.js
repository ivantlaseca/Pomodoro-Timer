import { useContext, useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import PageContext from './PageContext';
import ViewProgressButton from './ViewProgressButton';
import BackToTopicsButton from './BackToTopicsButton';
import sound from './alarm-clock-loop-90916.mp3'

const red = '#f54e4e';
const green = '#4aec8c';

function Timer() {
    const pageInfo = useContext(PageContext);
    
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    const alarmClockSound = new Audio(sound);

    function beep(){
        alarmClockSound.play();
        setTimeout(() =>{
            alarmClockSound.pause();
        },1500)
    }

    function switchMode(){
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? pageInfo.workMinutes : pageInfo.breakMinutes) * 60;
        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    }

    function initTimer() {
        secondsLeftRef.current = pageInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);
    }

    function tick(){
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {
        initTimer();

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0){
                beep();
                return switchMode();
            }
            tick();
        },1000);

        return () => clearInterval(interval);
    }, [pageInfo]);

    const totalSeconds = mode === 'work' 
    ? pageInfo.workMinutes * 60 
    : pageInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div>
            <CircularProgressbar 
                value={percentage} 
                text={minutes + ':' + seconds} 
                styles={buildStyles({
                textColor:'#fff',
                pathColor: mode === 'work' ? green : red,
                tailColor:'rgba(255,255,255,.2)',
            })} />
            <div style={{marginTop:'20px'}}>
                {isPaused 
                ? <PlayButton onClick={() => { setIsPaused(false); isPausedRef.current = false; }} /> 
                : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true; }} />}                
            </div>
            <div style={{marginTop:'20px'}}>
                <ViewProgressButton onClick={() => pageInfo.setShowProgress(true)}/>
            </div>
            <div style={{marginTop:'20px'}}>
                <BackToTopicsButton onClick={() => pageInfo.setShowTopics(true)} />
            </div>
            <div style={{marginTop:'20px'}}>
                <SettingsButton onClick={() => pageInfo.setShowSettings(true)} />
            </div>
        </div>
    );
}

export default Timer;