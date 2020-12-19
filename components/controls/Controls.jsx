import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

import PreviousBtn from 'components/icons/chevron-left.svg';
import NextBtn from 'components/icons/chevron-right.svg';
import PlayBtn from 'components/icons/player-play.svg';
import PauseBtn from 'components/icons/player-pause.svg';
import VolumeOn from 'components/icons/volume-high.svg';
import VolumeOff from 'components/icons/volume-off.svg';

import styles from './Controls.scss';

const Controls = ({
	playState,
	player,
	selectPlaylistItem = () => {},
	_prevSong = () => {},
	_nextSong = () => {},
}) => {
	return (
		<div className={styles('container')}>
			<Button onClick={_prevSong}>
				<PreviousBtn />
			</Button>
			{playState === 1 ? (
				<Button onClick={() => player.pauseVideo()}>
					<PauseBtn />
				</Button>
				) : (
				<Button onClick={() => player.playVideo()}>
					<PlayBtn />
				</Button>
			)}
			<Button onClick={_nextSong}>
				<NextBtn />
			</Button>
			{player && player.isMuted() === true ? (
				<Button onClick={() => player.unMute()}>
					<VolumeOff />
				</Button>
				) : (
				<Button onClick={() => player.mute()}>
					<VolumeOn />
				</Button>
				)
			}
		</div>
	);
}

Controls.propTypes = {
	playState: PropTypes.number,
	player: PropTypes.object,
	selectPlaylistItem: PropTypes.func,
	_prevSong: PropTypes.func,
	_nextSong: PropTypes.func,
}

export default Controls;
