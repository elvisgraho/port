import { h, Component } from 'preact';
import { Youtube } from 'preact-feather';

import VideoCard from '../../components/videoCard';

import * as hobbiesData from '../../assets/content/hobbies';

export default class Hobbies extends Component {

	constructor() {
		super();

		try {
			this.state = {
				galleryShift: 0,
				galleryCount: hobbiesData.second.music.length - 1,
				defaultWidth: 280,
				currentAnimation: ""
			}
		} catch (e) {
			// hobbiesData is undefined or whatever
			console.error(e);
		}
	}

	timeoutId;

	// 1 to 2 layout
	// general info 1
	// music 2

	clickLeft = () => {
		if (this.state.galleryShift > 0) {
			this.setState((state) => {
				return { galleryShift: state.galleryShift - state.defaultWidth }
			})
		} else {
			//no more shift animation left
			this.applyAnimation("anim-left");
		}
	}

	clickRight = () => {
		if (this.state.galleryShift < this.state.galleryCount * this.state.defaultWidth) {
			this.setState((state) => {
				return { galleryShift: state.galleryShift + state.defaultWidth }
			})
		} else {
			//no more shift animation right
			this.applyAnimation("anim-right");
		}
	}

	applyAnimation(animName) {
		//no more shift animation left
		if (this.state.currentAnimation === animName) {
			this.setState((state) => { return { currentAnimation: "" } });
			clearTimeout(this.timeoutId);
			this.timeoutId = setTimeout(() => {
				this.setState((state) => { return { currentAnimation: animName } }, 50);
			})
		} else {
			this.setState((state) => {
				return { currentAnimation: animName }
			})
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
	}


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

					<div class="hobbies-arrow hobbies-arrow--left" onClick={this.clickLeft}></div>
					<div class={`hobbies__music ${this.state.currentAnimation}`} style={`left: -${this.state.galleryShift}px;`}>
						{hobbiesData.second.music && hobbiesData.second.music.map((song) => {
							return <VideoCard title={song.title} subtitle={song.subtitle} imgSrc={song.imgSrc} />
						})}
					</div>
					<div class="hobbies-arrow hobbies-arrow--right" onClick={this.clickRight}></div>
				</div>
			</div>
		);
	}
}