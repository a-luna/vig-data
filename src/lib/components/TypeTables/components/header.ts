export const header = {
	removeOriginalThead: (): void => {
		setTimeout(() => {
			const thead = document.querySelector<HTMLElement>(
				'.datatable table thead'
			)
			if (thead !== null) {
				const originHeight = thead.getBoundingClientRect().height
				// const tableContainer = document.querySelector('section.datatable .dt-table')
				// const scrollXHeight = tableContainer.offsetHeight - tableContainer.clientHeight
				// - (scrollXHeight > 5 ? scrollXHeight + 10 : 1)
				const theadParent = thead.parentNode as HTMLElement
				theadParent.style.marginTop = '-' + originHeight + 'px'
				thead.style.visibility = 'hidden'
			}
		}, 50)
	},
	getOrginalTHeadClassList: (): string => {
		const thead = document.querySelector('.datatable table thead')
		return thead !== null ? thead.className : ''
	},
}
