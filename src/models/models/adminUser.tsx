import { TextFieldProps } from "@mui/material";
import { MRT_Cell } from "material-react-table";
import ResponseDefaultGet from "./default";

export interface AdminUser {
	id: number;
	full_name: string;
	nik: string;
	date_of_birth: string;
	gender: string;
	phone_number: string;
	nip: string;
	position: string;
	email: string;
	username: string;
}

export interface AdminUserData extends AdminUser {
	created_at: string;
	updated_at: string;
	deleted_at: string;
}

export type AdminUserRes = ResponseDefaultGet & {
	data: AdminUserData[];
};

export const columnsList: AdminUserData[] | Object[] = [
	{
		header: "ID",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.id,
		size: 5,
	},
	{
		header: "Nama Lengkap",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.full_name,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
	{
		header: "NIK",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.nik,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "number",
		}),
		size: 5,
	},
	{
		header: "Tanggal Lahir",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.date_of_birth,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
	{
		header: "Jenis Kelamin",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.gender,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
	{
		header: "Nomor telepon",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.phone_number,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
	{
		header: "NIP",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.nip,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
	{
		header: "Jabatan",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.position,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
	{
		header: "Email",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.email,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
	{
		header: "Username",
		Cell: ({ row }: MRT_Cell<AdminUserData>) => row.original.username,
		muiTableBodyCellEditTextFieldProps: ({
			cell,
		}: {
			cell: MRT_Cell<AdminUserData>;
		}): TextFieldProps => ({
			type: "text",
		}),
		size: 5,
	},
];
