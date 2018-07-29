import React from 'react';

const UptimeDisplay = (props) => {
	return (
		<div>
			<p onChange={props.changed}>Python application has been running for {props.runTime}</p>
		</div>
	)
}

export default UptimeDisplay;