import React, { createContext, ReactNode } from "react";
import { AppContextProps } from "./dataTypes";
import { useAppStateMgtHook } from "./AppStateMgtHook";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  
  const AppStateManager: AppContextProps = useAppStateMgtHook();

  return (
    <AppContext.Provider
      value={AppStateManager}
      
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStateMgtContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
