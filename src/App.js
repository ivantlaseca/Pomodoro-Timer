import './App.css';
import Settings from './Settings';
import Progress from './Progress';
import Timer from './Timer'
import { useState } from 'react';
import PageContext from './PageContext';
import Topics from './Topics';

function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(22);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [showProgress, setShowProgress] = useState(false);
  const [showTopics, setShowTopics] = useState(false);

  return (
    <main>
      <PageContext.Provider value={{
        showSettings,
        setShowSettings,
        showProgress,
        setShowProgress,
        showTopics,
        setShowTopics,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings />
        : showProgress ? <Progress /> 
        : showTopics ? <Topics />
        : <Timer />} 
      </PageContext.Provider> 
    </main>
  );
}

export default App;
