export function formatNumber(input, precision = 0) {
	const unformatted = typeof input === 'number' ? input : parseFloat(input);
	return unformatted.toLocaleString('en-US', { minimumFractionDigits: precision, maximumFractionDigits: precision });
}

export function formatPosNegValue(value: number, precision: number): string {
	const isNeg = value < 0;
	const formatted = Math.abs(value).toFixed(precision).toString();
	return isNeg ? `-${formatted}` : formatted;
}

export function formatRateStat(value: string, precision: number): string {
	const rate = parseFloat(value);
	const rate_str = rate.toFixed(precision);
	// Remove leading-zero if value is less than 1.000
	return rate < 1.0 ? rate_str.slice(1) : rate_str;
}

export function formatPercentStat(value: string, precision: number): string {
	const percent = (parseFloat(value) * 100).toFixed(precision);
	return `${percent}%`;
}

export function capitalize(string: string): string {
	return string.charAt(0).toUpperCase() + string.substring(1);
}

export function capitalizeSentence(string: string): string {
	return string
		.split(' ')
		.map((s) => capitalize(s))
		.join(' ');
}

export function shortenPlayerName(name: string): string {
	if (name === '') return '';
	const pieces = name.split(' ');
	if (pieces.length > 1) {
		const firstInitial = pieces[0].slice(0, 1);
		const lastName = pieces.slice(1).join(' ');
		return `${firstInitial} ${lastName}`;
	}
	return name;
}
