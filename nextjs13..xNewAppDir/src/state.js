import { createContext, useContext, useState } from 'react';

export const AppContext = createContext();

export function AppWrapper({ children }) {
  
  const [calcData, setCalcData] = useState([]);
  const [gearsData, setGearsData] = useState([]);
  const [carSpecsData, setCarSpecsData] =useState([]); 
  return (
    <AppContext.Provider value={{calcData, setCalcData, gearsData, setGearsData, carSpecsData, setCarSpecsData}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}