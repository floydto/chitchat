export const SETCOLORS = "@@COLOR/SETCOLORS"

/* Colors Actions */
export const setColors = (primaryColor:any, secondaryColor:any) => {
    return {
        type: SETCOLORS as typeof SETCOLORS,
            primaryColor,
            secondaryColor
    };
};


type actionCreators = typeof setColors
export type IColorAction = ReturnType<actionCreators>