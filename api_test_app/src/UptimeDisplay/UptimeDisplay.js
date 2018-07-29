import React from 'react';

const UptimeDisplay = (props) => {
	return (
		<div style={props.style}>
			<p onChange={props.changed}>Python application has been running for {props.runTime}</p>
		</div>
	)
}

export default UptimeDisplay;