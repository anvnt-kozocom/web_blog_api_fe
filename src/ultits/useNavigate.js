import { useHistory } from "react-router-dom";

function useNavigate() {
	const history = useHistory();
	return (path) => {
		history.push(path);
	};
}

export default useNavigate;
