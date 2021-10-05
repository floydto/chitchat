import { ILoadingState } from './state'
import { ILoadingActions } from './action';


const initialState:ILoadingState = {
    isLoading:  false,
}


export const loadingReducer = (state:ILoadingState = initialState, actions: ILoadingActions)=>{
    switch(actions.type){
        case "@@LOADING/LOADING_ON":
            return {...state, isLoading: true}
        case "@@LOADING/LOADING_OFF":
            return{ ...state, isLoading: false}
        default:
            return state
    }
}