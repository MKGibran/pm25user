import { format } from "date-fns";
import {
	currentDate,
	dateMonthBehind,
	DATE_FORMAT,
} from "../../utils/helper/dateHelper";

export default interface ResponseDefaultGet extends Object {
	status: String;
	message: String;
}

export interface ResponseGetAllDefault extends ResponseDefaultGet {
	data: {
		current_page: number;
		first_page_url: string;
		from: number;
		last_page: 1;
		next_page_url?: string;
		path: string;
		per_page: number;
		prev_page_url?: string;
		to: number;
		total: number;
	};
}

export interface metaGetDataSliceProps extends Object {
	from: number;
	to: number;
	last_page: number;
	total: number;
}

export const initialQueryGetData = {
	size: 10,
	page: 1,
	startDate: format(dateMonthBehind, DATE_FORMAT),
	endDate: format(currentDate, DATE_FORMAT),
	sortOrder: "desc",
};
