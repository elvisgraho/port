import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<nav>
			<Link activeClassName={style.active} href="/">About</Link>
			<Link activeClassName={style.active} href="/skills">Skills</Link>
			<Link activeClassName={style.active} href="/hobbies">Hobbies</Link>
			<Link activeClassName={style.active} href="/random">Random</Link>
		</nav>
	</header>
);

export default Header;
