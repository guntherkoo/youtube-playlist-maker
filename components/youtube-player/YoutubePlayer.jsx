import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';
import ProgressBar from 'components/progress-bar';
import Controls from 'components/controls';
import { CSSTransition } from 'react-transition-group';

import styles from './YoutubePlayer.scss';


const YoutubePlayer = ({
	currentTitle,
	current,
	progress,
	playState,
	playlist,
	player,
	selectPlaylistItem = () => {},
	setCurrentTitle = () => {},
	_onProgressChange = () => {},
	_onReady = () => {},
	_prev = () => {},
	_next = () => {},
	_onStateChange = () => {},
}) => {
	const opts = {
		height: '100%',
		width: '100%',
		playerVars: {
			autoplay: 1,
			rel: 0,
			fs: 0,
			playsinline: 1,
			enablejsapi: 1,
			controls: 0,
			origin: 'http://localhost:8888'
		}
	};

	return (
		<div className={styles('video-container')}>
			{current && 
				<div className={styles('current-title')}>
					<h1>
						{current.title}
					</h1>
				</div>
			}
			{current && current.source === 'youtube' && (
				<div className={styles('video-player')}>
					<YouTube
						videoId={current.uid}
						opts={opts}
						onReady={_onReady}
						onStateChange={_onStateChange}
					/>
				</div>
			)}
			<ProgressBar
				progress={progress}
				_onProgressChange={_onProgressChange}
			/>
			<Controls
				playState={playState}
				playlist={playlist}
				player={player}
				_prev={_prev}
				_next={_next}
			/>
		</div>
	);
}

YoutubePlayer.propTypes = {
	currentTitle: PropTypes.string,
	current: PropTypes.object,
	progress: PropTypes.string,
	playState: PropTypes.number,
	playlist: PropTypes.array,
	player: PropTypes.object,
	selectPlaylistItem: PropTypes.func,
	setCurrentTitle: PropTypes.func,
	_onReady: PropTypes.func,
	_prev: PropTypes.func,
	_next: PropTypes.func,
	_onStateChange: PropTypes.func,
	_onProgressChange: PropTypes.func,
}

export default YoutubePlayer;
