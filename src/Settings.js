import { useContext } from 'react';
import ReactSlider from 'react-slider';
import BackButton from './BackButton';
import PageContext from './PageContext';
import './slider.css'

function Settings(){
    const settingsInfo = useContext(PageContext);
    return(
        <div style={{textAlign:'left'}}>
            <label>Work: {settingsInfo.workMinutes}:00</label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label>Break: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider
                className={'slider red'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakMinutes}
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                min={1}
                max={120}
            />
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
            </div>
        </div>
    );
}

export default Settings;