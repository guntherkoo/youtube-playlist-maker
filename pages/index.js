import React, { Component } from 'react';
import 'styles/styles.scss';
import styles from './index.scss';

// import components
import YoutubePlayer from 'components/youtube-player';

class Index extends Component {
	static getInitialProps ({ req }) {
		const isServer = !!req
		let page_url = req.protocol + '://' + req.get('host') + req.originalUrl;

		return {
			page_url
		}
	}

	render() {
		return (
			<div className={styles('container')}>
				<YoutubePlayer page_url={this.props.page_url}/>
			</div>
		)
	}
}

export default Index;
