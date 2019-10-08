import { h, Component } from 'preact';
import { Youtube } from 'preact-feather';
import VideoCard from '../../components/videoCard';

import * as hobbiesData from '../../assets/content/hobbies';

export default class Hobbies extends Component {

	// 1 to 2 layout
	// general info 1
	// music 2

	render() {
		return (
			<div class="hobbies">
				<div class="hobbies__small">
					<h2 class="hobbies-title">
						{hobbiesData.first.title}
					</h2>
					<div class="hobbies__interests">
						{hobbiesData.first.interests && hobbiesData.first.interests.map((int) => {
							return <p>{int}</p>
						})}
					</div>
				</div>
				<div class="hobbies__large">
					<h2 class="hobbies-title">
						{hobbiesData.second.title} <Youtube />
					</h2>
					<h5>{hobbiesData.second.subtitle}</h5>
					<div class="hobbies__music">
						{hobbiesData.second.music && hobbiesData.second.music.map((song) => {
							return <VideoCard title={song.title} subtitle={song.subtitle} imgSrc={song.imgSrc} />
						})}
					</div>
				</div>
			</div>
		);
	}
}
