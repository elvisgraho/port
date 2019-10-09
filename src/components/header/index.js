import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

export default class Header extends Component {

	state = {
		class: ""
	}

	timeoutId;

	componentDidMount() {
		this.timeoutId = setTimeout(() => { this.setState(() => ({ class: "header--mounted" })) }, 0);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutId);
	}

	render() {
		return (
			<header class={`header ${this.state.class}`}>
				<nav>
					<Link activeClassName={style.active} href="/">Skills</Link>
					<Link activeClassName={style.active} href="/hobbies">Hobbies</Link>
					<Link activeClassName={style.active} href="/random">Random</Link>
				</nav>
			</header>
		)
	}
}