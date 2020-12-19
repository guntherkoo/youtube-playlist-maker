import React from 'react';
import PropTypes from 'prop-types';

import styles from './Controls.scss';

const Button = ({
	children,
	className,
	onClick = () => {},
}) => (
	<button className={className} onClick={onClick}>
		{children}
	</button>
);

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
}

export default Button;
