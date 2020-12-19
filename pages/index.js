import React, { useState, Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Meta from 'components/meta';
import YouTubeLogo from 'components/icons/youtube.svg';
import 'styles/styles.scss';
import styles from './index.scss';

// import components
import MainPlayer from 'components/main-player';

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyDTGR66CD0xRNaPEQn3ZT4GJe70fCcVSt4',
		authDomain: 'ytmusicplaylist-2468f.firebaseapp.com',
		projectId: 'ytmusicplaylist-2468f',
		storageBucket: 'ytmusicplaylist-2468f.appspot.com',
		messagingSenderId: '444727308983',
		appId: '1:444727308983:web:bf4cb91b810d118ef21332',
		measurementId: 'G-T3J4J5JKDM'
	});
}

class Index extends Component {
	// static getInitialProps ({ req }) {
	// 	const isServer = !!req

	// 	return {}
	// }
	state = {
		isSignedIn: false,
	}

	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccess: () => false
		}
	}

	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				isSignedIn: !!user
			})
		});
	}

	render() {
		return (
			<div className={styles('container')}>
				<Meta />
				{this.state.isSignedIn ? (
					<MainPlayer />
					) : (
					<div className={styles('sign-in')}>
						<YouTubeLogo />
						<h2>
							Create your own playlist
						</h2>
						<StyledFirebaseAuth
							className={styles('sign-in-ui')}
							uiConfig={this.uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					</div>
				)}
			</div>
		)
	}
}

export default Index;
