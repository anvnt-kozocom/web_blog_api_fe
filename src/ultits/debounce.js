import { useEffect, useState } from "react";

export default function useDebounce(value, timeout) {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handle = setTimeout(() => {
			setDebouncedValue(value);
		}, timeout);
		return () => {
			clearTimeout(handle);
		};
	}, [value, timeout]);
	return debouncedValue;
}
