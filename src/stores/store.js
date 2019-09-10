import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import createSagaMiddleware from 'redux-saga';
import reducer from "./reducers/reducer";

import { mySaga } from './saga';

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger();

export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);

export default { store, persistor };
