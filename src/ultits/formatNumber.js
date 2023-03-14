export function formatNumber(numbers) {
	return String(numbers).replace(/(.)(?=(\d{3})+$)/g, "$1,");
}
