import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { active } from "../../../api/auth";
import { useNavigate } from "react-router-dom";

Active.propTypes = {};

function Active(props) {
	const navigate = useNavigate();
	const params = useParams();
	useEffect(() => {
		active(params, navigate);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<h1>Kiểm tra thông tin xác thực</h1>
		</div>
	);
}

export default Active;
