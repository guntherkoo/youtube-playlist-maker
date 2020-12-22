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
	_prev = () => {},
	_next = () => {},
}) => {
	return (
		<div className={styles('container')}>
			<Button onClick={_prev}>
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
			<Button onClick={_next}>
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
	_prev: PropTypes.func,
	_next: PropTypes.func,
}

export default Controls;
