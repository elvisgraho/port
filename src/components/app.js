import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import ContactBox from './contactBox';
import Stage from './stage';

// Code-splitting is automated for routes
import About from '../routes/about';
import Skills from '../routes/skills';

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
						<About path="/" />
						<Skills path="/skills" user="skills" />
						<Skills path="/hobbies" user="hobbies" />
						<Skills path="/random" user="random" />
					</Router>
				</div>

				<ContactBox />
			</div>
		);
	}
}
