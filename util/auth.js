import { ref, firebaseAuth } from '../lib/firebase-config';

export const Auth = {
	authentication: (email, pw) => {
		return firebaseAuth().createUserWithEmailAndPassword(email, pw).then(saveUser);
	},

	logout: () => {
	    return firebaseAuth().signOut()
	},

	login: (email, pw) => {
	    return firebaseAuth().signInWithEmailAndPassword(email, pw)
	},

	resetPassword: (email) => {
	    return firebaseAuth().sendPasswordResetEmail(email)
	},

	saveUser: (user) => {
	    return ref.child(`users/${user.uid}/info`)
	    .set({
	        email: user.email,
	        uid: user.uid
	    })
	    .then(() => user)
	}
};