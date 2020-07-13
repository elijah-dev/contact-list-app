import React, { useReducer } from 'react';
import AuthorizationScreen from './components/AuthorizationScreen';
import ContactsScreen from './components/ContactsScreen';
import LoadingBackdrop from './components/LoadingBackdrop';
import initialState from './data/initialState';
import { rootReducer as reducer } from './reducers';
import { StateContext, DispatchContext } from './Context';

// Я использую useReducer хук вместе с React.createContext и useContext
// для создания единого стейта, к которому имеют доступ все компоненты
// Это необходимо в основном для возможности окрытия формы создания/редактирования
// из разных мест приложения и возможности обновления списка контактов данными формы

// Доступ к списку контактов возможен только если переменная currentUser.isAuthorized истинна
// что возможно только после авторизации на AuthorizationScreen

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <LoadingBackdrop />
        {state.currentUser.isAuthorized ? (
          <ContactsScreen />
        ) : (
          <AuthorizationScreen />
        )}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
