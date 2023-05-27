import ResponseDefaultGet from "./default";

export interface Coordinate extends Object {
	lat: string;
	long: string;
}

export interface MetaVillage extends Coordinate {
	pos: string;
}

export interface VillageRes extends Object {
	code: string;
	name: string;
	meta: MetaVillage;
}

export interface PlaceRes extends Object {
	code: string;
	meta: Coordinate;
	name: string;
}

export interface RegionalRes extends ResponseDefaultGet {
	data: PlaceRes[];
}
