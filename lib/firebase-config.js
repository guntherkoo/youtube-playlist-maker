import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyDpVWlilIPMC9zaUN__jwMaz3WrMUUqeR0',
    authDomain: 'project-next-9a61d.firebaseapp.com',
    databaseURL: 'https://project-next-9a61d.firebaseio.com',
    projectId: 'project-next-9a61d',
    storageBucket: '',
    messagingSenderId: '385281575648',
    appId: '1:385281575648:web:be76b3b351eecb2f'
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;