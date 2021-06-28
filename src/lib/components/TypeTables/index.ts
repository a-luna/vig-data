import ColumnFilterInputs from './ColumnFilterInputs.svelte'
import Datatable from './Datatable.svelte'
import PaginationButtons from './PaginationButtons.svelte'
import PaginationRowCount from './PaginationRowCount.svelte'
import SearchInput from './SearchInput.svelte'
import { rows } from './stores/data'
import type {
	BlockOptions,
	Column,
	LabelOptions,
	RowData,
	TableDimensions,
	TableFilter,
	TableOptions,
} from './types'

export {
	Datatable,
	PaginationButtons,
	PaginationRowCount,
	SearchInput,
	ColumnFilterInputs,
	rows,
}
export type {
	BlockOptions,
	LabelOptions,
	TableOptions,
	Column,
	TableDimensions,
	RowData,
	TableFilter,
}
