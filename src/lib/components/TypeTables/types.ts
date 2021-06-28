export type BlockOptions = {
	searchInput?: boolean;
	paginationButtons?: boolean;
	paginationRowCount?: boolean;
};
export type LabelOptions = {
	search?: string;
	filter?: string;
	noRows?: string;
	info?: string;
	previous?: string;
	next?: string;
};
export type TableOptions = {
	sortable?: boolean;
	pagination?: boolean;
	rowPerPage?: number;
	columnFilter?: boolean;
	scrollY?: boolean;
	css?: boolean;
	labels?: LabelOptions;
	blocks?: BlockOptions;
};
export type Column = {
	index: number;
	html: string;
	key: (x: RowData) => string;
	sort: string;
	classList: string[];
	minWidth: number;
};
export type TableDimensions = {
	parentWidth: number;
	parentHeight: number;
	width: number;
	height: number;
	top: string;
	right: string;
	bottom: string;
	left: string;
};
export type RowData = string | number | boolean | null | RowData[] | { [key: string]: RowData };
export type TableFilter = { key: string; value: RowData[] };
