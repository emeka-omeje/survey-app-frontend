import React, { createContext, ReactNode } from "react";
import { AppContextProps } from "./dataTypes";
import { useAppStateManager } from "./AppStateManager";
// interface AppContextProps {
//   createNavBTNLabel: string;
//   setCreateNavBTNLabel: React.Dispatch<React.SetStateAction<string>>;
//   frameCall: boolean;
//   setFrameCall: React.Dispatch<React.SetStateAction<boolean>>;
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [createNavBTNLabel, setCreateNavBTNLabel] =
  //   React.useState<string>("Builder");
  // const [frameCall, setFrameCall] = React.useState<boolean>(false);
  // const [isOpen, setIsOpen] = React.useState<boolean>(false);
  // const [publishingStatus, setPublishingStatus] = React.useState<'Idle' | 'Publishing' | 'Published' | 'Error' | 'Offline'>('Idle');
  
  const AppStateManager: AppContextProps = useAppStateManager();

  return (
    <AppContext.Provider
      value={AppStateManager}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
