import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './Controls.scss';

const Button = ({
	children,
	className,
	onClick = () => {},
}) => {
	const [ripple, setRipple] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setRipple(false);
		}, 500);

		return () => clearTimeout();
	}, [ripple]);

	return (
		<button
			className={classnames(
				styles('button', {
				'ripple': ripple
			}),
				className,
			)}
			onClick={onClick}
			onMouseDown={() => setRipple(true)}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Button;
