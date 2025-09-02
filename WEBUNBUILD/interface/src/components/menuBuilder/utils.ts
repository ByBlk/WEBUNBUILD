export const formatNumberForDollar = (value: number) => {
	return new Intl.NumberFormat("de-DE", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
		currencyDisplay: "narrowSymbol",
	}).format(value);
};

export const setArrayLength = (array: any[], target: number) => {
	const _array = [...array];
	for (let i = array.length; i <= target - 1; i++) {
		_array.push({ isPlaceholder: true });
	}
	return _array;
};
