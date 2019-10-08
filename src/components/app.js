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

	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Stage />
				<Header />

				<div class="router-section">
					<Router onChange={this.handleRoute}>
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
