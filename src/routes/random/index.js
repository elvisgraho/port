import { h, Component } from 'preact';

import * as data from '../../assets/content/random';

export default class Random extends Component {

	//todo
	//george carlin quote generator
	//about this website
	// 2 to 1 layout (george 2 about 1)

	constructor() {
		super();

		this.state = {
			currentQuote: this.randomQuote("", data.large.quotes)
		}

		this.setRandomQuote = this.setRandomQuote.bind(this);
	}

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

	render() {
		return (
			<div class="random">
				<div class="random__large">
					<h2>{data.large.headline}</h2>
					<h5>{data.large.subheadline}</h5>
					<div class="random__quote">
						<p>{`"${this.state.currentQuote}"`}</p>
						<button onClick={this.setRandomQuote}>{data.large.btnText}</button>
					</div>
				</div>
				<div class="random__small">
					hs
				</div>
			</div>
		);
	}
}
