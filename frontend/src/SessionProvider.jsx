import React, { createContext, useContext, useState } from 'react';

// Opprett en kontekst for sesjonen
const SessionContext = createContext();

// Opprett en kontekstleverandør for å håndtere sesjonstilstanden
const SessionProvider = ({ children }) => {
  // Tilstand for å holde sesjonstilstanden
  const [session, setSession] = useState({
    userId: null,
    isLoggedIn: false
  });

  // Funksjoner for å endre sesjonstilstanden (login og logout)
  const login = (userId, isLoggedIn) => {
    setSession({ userId, isLoggedIn });
  };

  const logout = () => {
    setSession({ userId: null, isLoggedIn: false });
  };

  // Leverer kontekstverdien til barna
  return (
    <SessionContext.Provider value={{ session, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

// Tilpasset hook for å enkelt få tilgang til sesjonskonteksten
const useSession = () => {
  return useContext(SessionContext);
};

// Eksporter både kontekst og leverandør for bruk andre steder i appen
export { SessionProvider, useSession, SessionContext };