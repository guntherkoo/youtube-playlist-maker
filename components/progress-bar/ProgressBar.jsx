import React from 'react';
import PropTypes from 'prop-types';

import styles from './ProgressBar.scss';

const ProgressBar = ({
	progress,
	_onProgressChange = () => {},
}) => {
	return (
		<input
			className={styles('progress-bar')}
			type='range'
			value={progress}
			onChange={_onProgressChange}
			min='0'
			max='100'
			step='0.01'
		/>
	);
}

ProgressBar.propTypes = {
	progress: PropTypes.string,
	_onProgressChange: PropTypes.func,
};

export default ProgressBar;
