import React from 'react';

const CurrentEndpoints = (props) => {
	return (
		<div>
			<p>The route <b>/status</b> has been hit {props.val} times since service restart.</p>
		</div>
	)
}

export default CurrentEndpoints;