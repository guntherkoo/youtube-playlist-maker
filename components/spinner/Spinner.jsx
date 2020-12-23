import React from 'react';
import styles from './Spinner.scss';

const Spinner = () => {
	return (
		<div className={styles('container')}>
			<div className={styles('spinner')} />
		</div>
	);
};

export default Spinner;
