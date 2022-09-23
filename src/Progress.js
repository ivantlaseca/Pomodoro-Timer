import { useContext } from 'react';
import PageContext from './PageContext';
import BackButton from './BackButton';

function Progress(){
    const settingsInfo = useContext(PageContext);
    return(
        <div style={{textAlign: 'left'}}>
            <div style={{textAlign: 'center'}}>
                <h1>Coming Soon</h1>
            </div>
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowProgress(false)} />
            </div>
        </div>
    );
}

export default Progress;