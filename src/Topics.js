import { useContext } from 'react';
import PageContext from './PageContext';
import BackButton from './BackButton';
import EditList from './EditList';

function Topics(){

    function addTopic(){

    }

    function removeTopic(){

    }

    const settingsInfo = useContext(PageContext);
    return(
        <div style={{textAlign: 'left'}}>
            <div style={{textAlign: 'center'}}>
                <h1>Coming Soon</h1>
                {/* <EditList /> */}
            </div>
            <div style={{textAlign:'center', marginTop:'20px'}}>
                <BackButton onClick={() => settingsInfo.setShowTopics(false)} />
            </div>
        </div>
    );
}

export default Topics;