import { IColorState } from "./state";
import { IColorAction } from "./action"

const initialState: IColorState = {
		primaryColor: "#4c3c4c",
        secondaryColor: "#eee"
};

export const colorReducer = (
	state: IColorState = initialState,
	actions: IColorAction
) => {
	switch (actions.type) {
		case "@@COLOR/SETCOLORS":
            return { 
                primaryColor: actions.primaryColor,
                secondaryColor: actions.secondaryColor 
            };
		default:
			return state;
	}
};
