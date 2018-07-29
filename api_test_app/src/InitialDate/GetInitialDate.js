import React from 'react';

const GetInitialDate = (props) => {
	return (
		<div style={props.style}>
			<p>The service first ran on {props.val}</p>
		</div>
	)
}

export default GetInitialDate;