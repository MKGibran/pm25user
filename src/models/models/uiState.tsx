import { AlertColor } from "@mui/material/Alert";

export type SnackbarProps = {
	state: boolean;
	message: string;
	severity?: AlertColor | undefined;
};

export default interface UiStateModel extends Object {
	snackbar: SnackbarProps;
	dialog: boolean;
}

export const InitialUiStateModel: UiStateModel = {
	snackbar: {
		state: false,
		message: "",
		severity: "info",
	},
	dialog: false,
};

export function isSnackbarProps(obj: any): obj is SnackbarProps {
	return "state" in obj && "message" in obj;
}
