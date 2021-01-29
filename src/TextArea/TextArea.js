import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../';

export function TextArea({ rows = 4, ...props }) {
	return <Input rows={rows} multiline {...props} />;
}

TextArea.propTypes = {
	rows: PropTypes.number,
};
