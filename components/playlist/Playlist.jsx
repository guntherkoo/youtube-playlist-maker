import React, { useState } from 'react';
import PropType from 'prop-types';
import InputText from 'components/input-text';
import Button from 'components/controls/Button';
import MenuBtn from 'components/icons/menu.svg';
import CloseBtn from 'components/icons/close.svg';

import styles from './Playlist.scss';

const Playlist = ({
	playlist,
	inputValue,
	onInputChange = () => {},
	onKeyDown = () => {},
	selectPlaylistItem = () => {},
}) => {
	const [toggleMenu, setToggleMenu] = useState(false);

	return (
		<React.Fragment>
			<Button className={styles('menu')} onClick={() => setToggleMenu(!toggleMenu)}>
				{toggleMenu ? (
					<CloseBtn />
					) : (
					<MenuBtn />
					)
				}
			</Button>
			<div className={styles('container', {
				'show-playlist': toggleMenu
			})}>
				<InputText
					className={styles('input-url')}
					inputValue={inputValue}
					onInputChange={onInputChange}
					onKeyDown={onKeyDown}
					placeholder='Paste a YouTube URL'
				/>
				{playlist && (
					<div className={styles('playlist')}>
						{playlist.map((item, i) => (
							<div
								className={styles('playlist-item', {
									'playing': i === 0
								})}
								key={i} 
								onClick={() => selectPlaylistItem(item, i)}
							>
								<img src={`//img.youtube.com/vi/${item.uid}/0.jpg`} width='100' />
								{i === 0 && (
									<p>
										Now Playing...		
									</p>
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</React.Fragment>
	);
}

Playlist.propTypes = {
	playlist: PropType.array.isRequired,
	inputValue: PropType.string,
	onInputChange: PropType.func,
	onKeyDown: PropType.func,
	selectPlaylistItem: PropType.func.isRequired,

}

export default Playlist;
