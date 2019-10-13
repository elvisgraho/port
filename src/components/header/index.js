import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Header extends Component {

	state = {
		class: ''
	}

	timeoutId;

	componentDidMount() {
		this.timeoutId = setTimeout(() => { this.setState(() => ({ class: 'header--mounted' })); }, 10);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
	}

	render() {
		return (
			<header class={`header ${this.state.class}`}>
				<nav>
					<Link activeClassName={'active'} href="/">Skills</Link>
					<Link activeClassName={'active'} href="/hobbies">Hobbies</Link>
					<Link activeClassName={'active'} href="/random">Random</Link>
				</nav>
			</header>
		);
	}
}