import React from 'react';
import firebase from 'firebase/app';

import styles from './Profile.scss';

const Profile = () => {
	const {
		displayName,
		photoURL,
	} = firebase.auth().currentUser;

	return (
		<div className={styles('profile')}>
			<div className={styles('display')}>
				<img src={photoURL} alt='Profile Picture' />
				<p>
					Welcome, {displayName}
				</p>
			</div>
			<button
				className={styles('sign-out')}
				type='button'
				onClick={() => firebase.auth().signOut()}
			>
				Sign Out
			</button>
		</div>
	);
}

export default Profile;
