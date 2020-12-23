import React, { useState, Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { CSSTransition } from 'react-transition-group';

import Meta from 'components/meta';
import Spinner from 'components/spinner';
import YouTubeLogo from 'components/icons/youtube-logo.svg';
import 'styles/styles.scss';
import styles from './index.scss';

// import components
import MainPlayer from 'components/main-player';

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyDTGR66CD0xRNaPEQn3ZT4GJe70fCcVSt4',
		authDomain: 'ytmusicplaylist-2468f.firebaseapp.com',
		projectId: 'ytmusicplaylist-2468f',
		databaseURL: "https://ytmusicplaylist-2468f-default-rtdb.firebaseio.com",
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
		isDoneLoading: false,
		isSignedIn: false,
	}

	uiConfig = {
		signInFlow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false
		}
	}

	writeUserData = (userId, name, email) => {
		firebase.database().ref().child('users/' + userId).once('value', snapshot => {
			let exists = (snapshot.val() !== null);

			if (!exists) {
				console.log('User does not exist');
				firebase.database().ref('users/' + userId).set({
					username: name,
					email: email,
					playlist: '',
				});
			}
			console.log('User does exist');
		});
	}

	componentDidMount = () => {
		setTimeout(() => {
			this.setState({ isDoneLoading: true });
		}, 3000);

		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			if (user) {
				const {
					uid,
					displayName,
					email,
				} = firebase.auth().currentUser;
				
				this.writeUserData(uid, displayName, email);
			}

			this.setState({ isSignedIn: !!user });
		});
	}

	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {
		return (
			<React.Fragment>
				<CSSTransition
			        in={!this.state.isDoneLoading}
			        timeout={500}
			        classNames='loading'
			        unmountOnExit
			        onEnter={() => this.setState({isDoneLoading: false})}
			        onExited={() => this.setState({isDoneLoading: true})}
			      >
			      <Spinner />
			    </CSSTransition>
				<CSSTransition
			        in={this.state.isDoneLoading}
			        timeout={500}
			        classNames='loading'
			        unmountOnExit
			        onEnter={() => this.setState({isDoneLoading: true})}
			        onExited={() => this.setState({isDoneLoading: false})}
			      >
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
				</CSSTransition>
			</React.Fragment>
		)
	}
}

export default Index;
