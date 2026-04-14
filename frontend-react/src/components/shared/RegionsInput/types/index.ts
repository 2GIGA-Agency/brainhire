export interface AreasSuggestsResponse {
	items: AreaSuggest[];
}

export interface AreaSuggest {
	id: string;
	text: string;
	url: string;
}

export interface AreaResponse {
	areas: AreaResponse[];
	id: string;
	name: string;
	parent_id: string | null;
}
