import React, { useState } from 'react';
import PropType from 'prop-types';
import InputText from 'components/input-text';
import Button from 'components/controls/Button';
import MenuBtn from 'components/icons/player-list-add.svg';
import AddBtn from 'components/icons/circle-plus.svg';
import CloseBtn from 'components/icons/close.svg';
import { CSSTransition } from 'react-transition-group';

import styles from './Playlist.scss';

const Playlist = ({
	playlist,
	inputValue,
	onInputChange = () => {},
	onKeyDown = () => {},
	selectPlaylistItem = () => {},
	onDeleteItem = () => {},
	addPlaylistItem = () => {},
}) => {
	const [toggleMenu, setToggleMenu] = useState(false);

	return (
		<React.Fragment>
			<CSSTransition
		        in={toggleMenu}
		        timeout={500}
		        classNames='loading'
		        unmountOnExit
		        onEnter={() => setToggleMenu(true)}
		        onExited={() => setToggleMenu(false)}
		      >
				<div className={styles('background')} onClick={() => setToggleMenu(false)} />
			</CSSTransition>
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
				{playlist && (
					<div className={styles('playlist')}>
						{playlist.map((item, i) => {
							const { title } = item;

							return (
								<div
									className={styles('playlist-item', {
										'playing': i === 0
									})}
									key={i}
								>
									<div className={styles('item')} onClick={() => selectPlaylistItem(item, i)}>
										<img src={`//img.youtube.com/vi/${item.uid}/0.jpg`} width='100' />
										<div className={styles('info')}>
											{i === 0 && (
												<p className={styles('now-playing')}>
													Now Playing...		
												</p>
											)}
											<p className={styles('title')}>
												{title}
											</p>
										</div>
									</div>

									<div className={styles('delete')}>
										<button type='button' onClick={() => onDeleteItem(item.uid, item.id)}>
											<CloseBtn />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}
				<InputText
					className={styles('input-url')}
					inputValue={inputValue}
					onInputChange={onInputChange}
					onKeyDown={onKeyDown}
					placeholder='Paste a YouTube URL'
				/>
				<button type='button' className={styles('add-url')} onClick={() => addPlaylistItem()}>
					<AddBtn />
				</button>
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
	onDeleteItem: PropType.func.isRequired,
	addPlaylistItem: PropType.func.isRequired,
}

export default Playlist;
