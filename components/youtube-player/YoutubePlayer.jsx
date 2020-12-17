import React, { useState, useEffect } from 'react';
import getYoutubeTitle from 'get-youtube-title';
import YouTube from 'react-youtube';
import styles from './YoutubePlayer.scss';


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


const YoutubePlayer = ({
	page_url
}) => {
	const [playlist, setPlaylist] = useState(playlistItems);
	const [player, setPlayer] = useState();
	const [current, setCurrent] = useState(playlist[0]);
	const [progress, setProgress] = useState(0);
	const [playState, setPlayState] = useState(0);
	const [duration, setDuration] = useState(0);
	const [inputValue, setInputValue] = useState('');


	const _nextSong = () => {
		const current_song = playlist.shift();
		const new_playlist = playlist.concat(current_song);

		setPlaylist(new_playlist);
		setCurrent(playlist[0]);
		setProgress(0);
	};

	const _prevSong = () => {
		const prev_song = playlist[playlist.length - 1];
		playlist.unshift(prev_song);
		playlist.pop();

		setPlaylist(playlist);
		setCurrent(playlist[0]);
		setProgress(0);
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

		getYoutubeTitle(playlist[0].uid, function (err, title) {
			console.log(title);
		});
	// access to player in all event handlers via event.target
	};

	const opts = {
		height: '100%',
		width: '100%',
		playerVars: {
			autoplay: 1,
			rel: 0,
			enablejsapi: 1,
			controls: 0,
			origin: page_url
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

	useEffect(() => {
		console.log(playlist, 'playlist');
	}, [playlist]);

	const selectPlaylistItem = (item, i) => {
		const selected_remaining = playlist.slice(i);
		playlist.splice(i, playlist.length);
		
		const new_playlist = [...selected_remaining, ...playlist];

		setPlaylist(new_playlist);
		setCurrent(new_playlist[0]);
		setProgress(0);
	}

	return (
		<div className={styles('video-container')}>
			{current.source === 'youtube' && (
				<div className={styles('video-player')}>
					<YouTube
						videoId={current.uid}
						opts={opts}
						onReady={_onReady}
						onStateChange={_onStateChange}
					/>
				</div>
			)}
			<div className={styles('controls')}>
				<input
					type='text'
					value={inputValue}
					onChange={onInputChange}
					onKeyDown={onKeyDown}
					placeholder='paste a youtube link'
				/>
				{`${current.source}: ${current.uid}`}
				<button onClick={_prevSong}>Previous</button>
				{playState === 1 ? (
					<button onClick={() => player.pauseVideo()}>Pause</button>
					) : (
					<button onClick={() => player.playVideo()}>Play</button>
				)}
				<button onClick={_nextSong}>Next</button>
				<input
					className='progress-bar'
					type='range'
					value={progress}
					onChange={_onProgressChange}
					min='0'
					max='100'
					step='0.01'
				/>
				{playlist && (
					<div>
						{playlist.map((item, i) => (
							<div key={i} onClick={() => selectPlaylistItem(item, i)}>
								<img src={`https://img.youtube.com/vi/${item.uid}/0.jpg`} width='100' />
								{item.uid}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default YoutubePlayer;
