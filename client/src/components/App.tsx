/**
 * App structure, session fetch, socket listeners
 */
import { Component, createContext, onMount, Show } from 'solid-js';
import { createStore, SetStoreFunction, Store } from 'solid-js/store';
import { Router } from '@solidjs/router';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import Routes from '@src/Routes';
import CssBaseline from '@suid/material/CssBaseline';
import Container from '@suid/material/Container';

const functionURL = 'https://pugsllc-com-b3us3jciya-uw.a.run.app';

const v1GetMyUser = async (): Promise<string> => {
  const url = import.meta.env.PROD ? functionURL : 'http://localhost:2222';
  const path = '/v1/me';
  const results = await fetch(`${url}${path}`, {
    method: 'GET',
    credentials: 'include',
  });
  return await results.text();
};

interface DefaultValuesI {
  sessionID: string;
}

type StoreT = [Store<DefaultValuesI>, SetStoreFunction<DefaultValuesI>];

const defaultValues: DefaultValuesI = {
  sessionID: '',
};

export type AppContextT = DefaultValuesI;
export const AppContext = createContext<AppContextT>();

const App: Component = () => {
  const [state, setState]: StoreT = createStore(defaultValues);

  onMount(async () => {
    const sessionID = await v1GetMyUser();
    setState('sessionID', () => sessionID);
  });

  return (
    <>
      <CssBaseline />
      <AppContext.Provider value={state}>
        <Show when={true}>
          <Router>
            <Container maxWidth="md">
              <Header />
              <Navigation />
              <Routes />
              <Footer />
            </Container>
          </Router>
        </Show>
      </AppContext.Provider>
    </>
  );
};

export default App;
