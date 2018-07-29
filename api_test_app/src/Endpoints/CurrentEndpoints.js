import React from 'react';

const CurrentEndpoints = (props) => {
	return (
		<div style={props.style}>
			<p>The route <b>localhost:5000/status</b> has been hit {props.val} times since service restart.</p>
		</div>
	)
}

export default CurrentEndpoints;