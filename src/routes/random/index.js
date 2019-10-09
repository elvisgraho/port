import { h, Component } from 'preact';
import { Code, Sun } from 'preact-feather';

import * as data from '../../assets/content/random';

export default class Random extends Component {

	//todo
	//george carlin quote generator
	//about this website
	// 2 to 1 layout (george 2 about 1)

	constructor() {
		super();

		this.state = {
			currentQuote: this.randomQuote("", data.large.quotes),
			spinIcon: undefined,
			shakeIcon: undefined
		}

		this.setRandomQuote = this.setRandomQuote.bind(this);
	}

	timeoutSpinId;
	timeoutShakeId;

	randomQuote(currentQuote, list) {
		let newList = [...list];
		let index = newList.indexOf(currentQuote);
		if (index > -1) {
			newList.splice(index, 1);
		}
		return newList[Math.floor((Math.random() * newList.length))];
	}

	setRandomQuote() {
		if (data.large.quotes) {
			this.setState((state) => ({ currentQuote: this.randomQuote(state.currentQuote, data.large.quotes) }));
		}
	}

	spinAnimHandler = () => {
		if (!this.state.spinIcon) {
			this.setState((state) => ({ spinIcon: "spin-icon" }));
			this.timeoutSpinId = setTimeout(() => {
				this.setState((state) => ({ spinIcon: undefined }));
			}, 1000);
		}
	}

	shakeAnimHandler = () => {
		if (!this.state.shakeIcon) {
			this.setState((state) => ({ shakeIcon: "shake-icon" }));
			this.timeoutShakeId = setTimeout(() => {
				this.setState((state) => ({ shakeIcon: undefined }));
			}, 1000);
		}
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutSpinId);
		clearTimeout(this.timeoutShakeId);
	}

	render() {
		return (
			<div class="random">
				<div class="random__large">
					<h3>{data.large.headline}</h3>
					<h5>{data.large.subheadline}</h5>
					<div class="random__quote">
						<p>{`"${this.state.currentQuote}"`}</p>
						<button onClick={this.setRandomQuote}>{data.large.btnText}</button>
					</div>
				</div>
				<div class="random__small">
					<h3>{data.small.title}</h3>

					<div class="random__info">
						<div>
							<Code onClick={this.shakeAnimHandler} class={this.state.shakeIcon ? this.state.shakeIcon : ""} />
							<p>{data.small.stack}</p>
						</div>
						<div>
							<Sun onClick={this.spinAnimHandler} class={this.state.spinIcon ? this.state.spinIcon : ""} />
							<p>{data.small.further}</p>
						</div>
					</div>

				</div>
			</div>
		);
	}
}
