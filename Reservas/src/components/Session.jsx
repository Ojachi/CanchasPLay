// context/session.js
import { createContext, useState } from "react";

const SessionContext = createContext();

const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({});

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionProvider, SessionContext };
