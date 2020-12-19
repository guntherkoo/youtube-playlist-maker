import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({
	placeholder,
	inputValue,
	className,
	onInputChange = () => {},
	onKeyDown = () => {},
}) => {
	return (
		<input
			className={className}
			type='text'
			value={inputValue}
			onChange={onInputChange}
			onKeyDown={onKeyDown}
			placeholder={placeholder}
		/>
	);
}

InputText.propTypes = {
	placeholder: PropTypes.string.isRequired,
	inputValue: PropTypes.string.isRequired,
	className: PropTypes.string,
	onInputChange: PropTypes.func.isRequired,
	onKeyDown: PropTypes.func.isRequired,
};

export default InputText;
