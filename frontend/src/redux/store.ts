import { RouterState, connectRouter, routerMiddleware, CallHistoryMethodAction } from 'connected-react-router';
import { createBrowserHistory } from "history";
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkDispatch as OldThunkDispatch } from "redux-thunk"
import logger from 'redux-logger';
import { IAuthState } from './Auth/state'
import { authReducer } from './Auth/reducer';
import { IAuthActions } from './Auth/action';
import { ILoadingState } from './Loading/state';
import { loadingReducer } from './Loading/reducer';
import { ILoadingActions } from './Loading/action';
import { IChannelState } from './channel/state';
import { channelReducer } from './channel/reducer';
import { IChannelActions } from './channel/action';
export const history = createBrowserHistory();

// #1 IRootState
export interface IRootState {
    router: RouterState
    auth: IAuthState
    isLoading: ILoadingState
    userInfo: IAuthState
    channel: IChannelState
}

// #2 rootReducers
type IRootAction = CallHistoryMethodAction | IAuthActions | ILoadingActions | IChannelActions

// #3 IRootAction
const rootReducer = combineReducers<IRootState>({
    router: connectRouter(history),
    auth: authReducer,
    isLoading: loadingReducer,
    userInfo: authReducer,
    channel: channelReducer
});


declare global {
    /* tslint:disable:interface-name */
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export type ThunkDispatch = OldThunkDispatch<IRootState, null, IRootAction>


export default createStore<IRootState, IRootAction, {}, {}>(
    rootReducer,
    composeEnhancers(applyMiddleware(logger),
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(history)))
)
