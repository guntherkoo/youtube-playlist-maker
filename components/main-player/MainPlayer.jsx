import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import getYoutubeTitle from 'get-youtube-title';
import YoutubePlayer from 'components/youtube-player';
import Playlist from 'components/playlist';

import styles from './MainPlayer.scss';


const playlistItems = [
	{
		source: 'youtube',
		uid: 'jkBfGvb7NzM'
	},
	{
		source: 'youtube',
		uid: 'G4JuopziR3Q'
	},
	{
		source: 'youtube',
		uid: 'UBhlqe2OTt4'
	},
	{
		source: 'youtube',
		uid: '4iLVoEg9aLk'
	}
];


const MainPlayer = () => {
	const [playlist, setPlaylist] = useState(playlistItems);
	const [player, setPlayer] = useState();
	const [current, setCurrent] = useState(playlist[0]);
	const [currentTitle, setCurrentTitle] = useState('');
	const [progress, setProgress] = useState('0');
	const [playState, setPlayState] = useState(0);
	const [duration, setDuration] = useState(0);
	const [inputValue, setInputValue] = useState('');

	const _nextSong = () => {
		const current_song = playlist.shift();
		const new_playlist = playlist.concat(current_song);

		setPlaylist(new_playlist);
		setCurrent(playlist[0]);
		setProgress('0');
	};

	const _prevSong = () => {
		const prev_song = playlist[playlist.length - 1];
		playlist.unshift(prev_song);
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
			_nextSong();
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

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			let yt_id = inputValue.split('v=')[1];
			const split_param = yt_id.indexOf('&');
			if (split_param != -1) {
				yt_id = yt_id.substring(0, split_param);
			}

			getYoutubeTitle(yt_id, function (err, title) {
				setPlaylist((playlist) => [
					...playlist,
					{
						source: 'youtube',
						uid: yt_id,
						title: title
					}
					]);
			});
			setInputValue('');
		}
	};

	const selectPlaylistItem = (item, i) => {
		const selected_remaining = playlist.slice(i);
		playlist.splice(i, playlist.length);

		const new_playlist = [...selected_remaining, ...playlist];

		setPlaylist(new_playlist);
		setCurrent(new_playlist[0]);
		setProgress('0');
	}

	useEffect(() => {
		setCurrentTitle('');

		setTimeout(() => {
			getYoutubeTitle(playlist[0].uid, function (err, title) {
				setCurrentTitle(title);
			});
		}, 1000);

		return () => clearTimeout();
	}, [playlist]);

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

	return (
		<React.Fragment>
			<div className={styles('profile')}>
				<p>
					Welcome, {firebase.auth().currentUser.displayName}
				</p>
				<button
					className={styles('sign-out')}
					type='button'
					onClick={() => firebase.auth().signOut()}
				>
					Sign Out
				</button>
			</div>
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
				_prevSong={_prevSong}
				_nextSong={_nextSong}
				_onStateChange={_onStateChange}
				_onProgressChange={_onProgressChange}
			/>
			<Playlist
				playlist={playlist}
				inputValue={inputValue}
				onInputChange={onInputChange}
				onKeyDown={onKeyDown}
				selectPlaylistItem={selectPlaylistItem}
			/>
		</React.Fragment>
	);
}

export default MainPlayer;
