export const LOADING_OFF = "@@LOADING/LOADING_OFF"
export const LOADING_ON = "@@LOADING/LOADING_ON"

export const loadingON = () => {
    return {
        type: LOADING_ON as typeof LOADING_ON,
    }
}

export const loadingOFF = () => {
    return {
        type: LOADING_OFF as typeof LOADING_OFF,
    }
}


type actionCreators = typeof loadingOFF |  typeof loadingON

export type ILoadingActions = ReturnType<actionCreators>