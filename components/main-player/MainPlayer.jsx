import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { CSSTransition } from 'react-transition-group';
import getYoutubeTitle from 'get-youtube-title';
import YoutubePlayer from 'components/youtube-player';
import Playlist from 'components/playlist';
import Profile from 'components/profile';

import styles from './MainPlayer.scss';

const MainPlayer = () => {
	const [playlist, setPlaylist] = useState([]);
	const [player, setPlayer] = useState();
	const [current, setCurrent] = useState({});
	const [currentTitle, setCurrentTitle] = useState('');
	const [progress, setProgress] = useState('0');
	const [playState, setPlayState] = useState(0);
	const [duration, setDuration] = useState(0);
	const [inputValue, setInputValue] = useState('');
	const [showNoPlaylist, setShowNoPlaylist] = useState(false);

	useEffect(() => {
		const { uid } = firebase.auth() && firebase.auth().currentUser;

		firebase.database().ref().child('users/' + uid).once('value', snapshot => {
			let playlist = [];

			let exists = (snapshot.val() !== null);

			if (exists) {
				Object.entries(snapshot.val().playlist).forEach((item, i) => 
					playlist.push({
						id: item[0],
						...item[1],
					})
				);
			}

			let array = [...playlist];

			if (array.length === 0) {
				setShowNoPlaylist(true);
			}

			setPlaylist(array);
			setCurrent(array[0]);
		});
	}, []);

	const _next = () => {
		const current_item = playlist.shift();
		const new_playlist = playlist.concat(current_item);

		setPlaylist(new_playlist);
		setCurrent(playlist[0]);
		setProgress('0');
	};

	const _prev = () => {
		const prev_item = playlist[playlist.length - 1];
		playlist.unshift(prev_item);
		playlist.pop();
		setCurrentTitle('');

		setPlaylist(playlist);
		setCurrent(playlist[0]);
		setProgress('0');
	};

	const _onStateChange = (e) => {
		const current_state = e.target.getPlayerState();
		const current_duration = e.target.getDuration();

		setPlayState(current_state);
		setDuration(current_duration);
		// next on playlist when ended
		if (current_state === 0) {
			_next();
		}
	};

	const _onReady = (e) => {
		setPlayer(e.target);
	};

	const opts = {
		height: '100%',
		width: '100%',
		playerVars: {
			autoplay: 1,
			rel: 0,
			enablejsapi: 1,
			controls: 0,
			origin: 'http://localhost:8888'
		}
	};

	const _onProgressChange = (e) => {
		const duration = player.getDuration();
		// on change percent / 100% * duration
		const current = Number((e.target.value / 100) * duration);
		setProgress(e.target.value);
		player.seekTo(current);
		player.playVideo();
	};

	const progress_styles = {
		width: `${progress}%`
	};

	const onInputChange = (e) => {
		let input = e.target.value;
		setInputValue(input);
	};

	const writeNewPlaylist = (yt_id, title) => {
		const {
			displayName,
			uid,
		} = firebase.auth().currentUser;

		// A post entry.
		const postData = {
			source: 'youtube',
			uid: yt_id,
			title: title,
		};

		// Get a key for a new Post.
		const newPostKey = firebase.database().ref().child('users/' + uid).push().key;

		// Write the new post's data simultaneously in the posts list and the user's post list.
		const updates = {};
  		updates[`/users/${uid}/playlist/${newPostKey}`] = postData;

		return firebase.database().ref().update(updates);
	}

	const deletePlaylistItem = key_id => {
		const { uid } = firebase.auth().currentUser;

		let userRef = firebase.database().ref().child(`/users/${uid}/playlist/${key_id}`);
    	userRef.remove();
	}

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			addPlaylistItem();
		}
	};

	const addPlaylistItem = () => {
		if ((inputValue.length !== 0 && inputValue.indexOf('youtu') !== -1)) {
			let yt_id = (inputValue.split('v=')[1] || inputValue.split('youtu.be/')[1]);
			const split_param = yt_id.indexOf('&');
			if (split_param != -1) {
				yt_id = yt_id.substring(0, split_param);
			}

			const exist = playlist.filter(item => item.uid.includes(yt_id));

			if (exist.length === 0) {
				getYoutubeTitle(yt_id, (err, title) => {
					writeNewPlaylist(yt_id, title);

					setPlaylist(playlist => [
						...playlist,
						{
							source: 'youtube',
							uid: yt_id,
							title: title
						}
					]);
				});
			}

			if (showNoPlaylist) {
				setShowNoPlaylist(false);
			};

			setInputValue('');
		}
	}

	const selectPlaylistItem = (item, i) => {
		const selected_remaining = playlist.slice(i);
		playlist.splice(i, playlist.length);

		const new_playlist = [...selected_remaining, ...playlist];

		setPlaylist(new_playlist);
		setCurrent(new_playlist[0]);
		setProgress('0');
	}

	const onDeleteItem = (uid, key_id) => {
		const filtered_playlist = playlist.filter(item =>  item.uid !== uid);

		setPlaylist(filtered_playlist);
		deletePlaylistItem(key_id);
	}

	useEffect(() => {
		let interval;
		if (player && playState === 1) {
			interval = setInterval(() => {
				let currentTime = player.getCurrentTime();
				let percentage = ((currentTime / duration) * 100).toFixed(2);
				setProgress(percentage);
			}, 100);
		}
		return () => clearInterval(interval);
	}, [playState, duration, progress]);

	useEffect(() => {
		if (playlist.length > 0) {
			setCurrent(playlist[0]);
		}
	}, [playlist])

	return (
		<React.Fragment>
			<CSSTransition
		        in={showNoPlaylist}
		        timeout={1000}
		        classNames='loading'
		        unmountOnExit
		        onEnter={() => setShowNoPlaylist(true)}
		        onExited={() => setShowNoPlaylist(false)}
		      >
				<div className={styles('no-playlist')}>
					<h1>
						You don't have any videos!
					</h1>
					<h2>
						Start saving some videos!
					</h2>
				</div>
		   	</CSSTransition>
			<Profile />
			<YoutubePlayer
				currentTitle={currentTitle}
				current={current}
				progress={progress}
				playState={playState}
				playlist={playlist}
				player={player}
				selectPlaylistItem={selectPlaylistItem}
				setCurrentTitle={setCurrentTitle}
				_onReady={_onReady}
				_prev={_prev}
				_next={_next}
				_onStateChange={_onStateChange}
				_onProgressChange={_onProgressChange}
			/>
			<Playlist
				playlist={playlist}
				inputValue={inputValue}
				onInputChange={onInputChange}
				onKeyDown={onKeyDown}
				selectPlaylistItem={selectPlaylistItem}
				onDeleteItem={onDeleteItem}
				addPlaylistItem={addPlaylistItem}
			/>
		</React.Fragment>
	);
}

export default MainPlayer;
