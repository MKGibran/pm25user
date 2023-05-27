import { TextFieldProps } from "@mui/material";
import { MRT_Cell } from "material-react-table";
import { optionsDate } from "../../utils/helper/dateHelper";
import ToTitleCase from "../../utils/helper/ToTitleCase";
import { ResponseGetAllDefault } from "./default";
import { PlaceRes, VillageRes } from "./regional";

export interface PostHotspotProps {
	date: string;
	value: number;
	village_code: string;
}

export interface HotspotData {
	id: number;
	date: string;
	value: string;
	created_at: string;
	updated_at: string;
	village: VillageRes;
	district: PlaceRes;
	city: PlaceRes;
	province: PlaceRes;
}

export interface HotspotQueryProps extends Object {
	size: 5 | 10 | 15 | 20 | 25 | 30 | 35 | 50 | 100;
	page: number;
	timezone?: "Asia/Jakarta" | "Asia/Brunei" | "Asia/Seoul";
	startDate?: string;
	endDate?: string;
	exactDate?: string;
	villageCode?: string;
	districtCode?: string;
	cityCode?: string;
	provinceCode?: string;
	minValue?: number;
	exactValue?: number;
	maxValue?: number;
	sortBy: "date" & HotspotColumnName;
	sortOrder: "asc" | "desc";
}

export type HotspotRes = ResponseGetAllDefault & {
	data: {
		data: HotspotData[];
	};
};

export type HotspotColumnName =
	| "province"
	| "city"
	| "district"
	| "village"
	| "value";

export const columnsList: HotspotData[] | Object[] = [
	{
		header: "Tanggal",
		accessorKey: "date",
		Cell: ({ row }: MRT_Cell<HotspotData>) =>
			new Date(row.original.date as string).toLocaleDateString(
				"id-ID",
				optionsDate
			),
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<HotspotData>;
		}): TextFieldProps => ({
			type: "date",
		}),
		size: 5,
	},
	{
		header: "Hotspot",
		accessorKey: "value",
		minSize: 1,
	},
	{
		header: "Provinsi",
		accessorKey: "province.id",
		Cell: ({ row }: MRT_Cell<HotspotData>) =>
			ToTitleCase(row.original.province.name as string),
		size: 5,
	},
	{
		header: "Kab/Kota",
		accessorKey: "city.id",
		Cell: ({ row }: MRT_Cell<HotspotData>) =>
			ToTitleCase(row.original.city.name as string),
		size: 1,
	},
	{
		header: "Kecamatan",
		accessorKey: "district.id",
		Cell: ({ row }: MRT_Cell<HotspotData>) =>
			ToTitleCase(row.original.district.name as string),
		size: 5,
	},
	{
		header: "Kelurahan/Desa",
		accessorKey: "village.id",
		Cell: ({ row }: MRT_Cell<HotspotData>) =>
			ToTitleCase(row.original.village.name as string),
		size: 5,
	},
];
