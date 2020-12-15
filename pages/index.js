import React, { Component } from 'react';
import GlobalStyles from 'styles/styles.scss';

class Index extends Component {
	static getInitialProps ({ req }) {
		const isServer = !!req

		return {}
	}

	render() {
		return (
			<div>
				Hello World
			</div>
		)
	}
}

export default Index;
