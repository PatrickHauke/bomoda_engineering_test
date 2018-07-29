import React from 'react';

const TotalEndpoints = (props) => {
	return (
		<div style={props.style}>
			<p>Since application deployment, the route <b>/status</b> has been hit a total of {props.val} times.</p>
		</div>
	)
}

export default TotalEndpoints;