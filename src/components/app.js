import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import ContactBox from './contactBox';
import Stage from './stage';

// Code-splitting is automated for routes
import Skills from '../routes/skills';
import Hobbies from '../routes/hobbies';
import Random from '../routes/random';

export default class App extends Component {

	state = {
		class: ''
	}

	timeoutId;

	componentDidMount() {
		this.timeoutId = setTimeout(() => { this.setState(() => ({ class: 'router-section--mounted' })); }, 10);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
	}

	render() {
		return (
			<div id="app">
				<Stage />
				<Header />

				<div class={`router-section ${this.state.class}`}>
					<Router>
						<Skills path="/" />
						<Hobbies path="/hobbies" />
						<Random path="/random" />
					</Router>
				</div>

				<ContactBox />
			</div>
		);
	}
}
