import { h, Component } from 'preact';
import style from './style';
import SkillCard from '../../components/skillCard';

import * as skillsData from '../../assets/content/skills';

export default class Skills extends Component {

	render() {
		return (
			<div class={style.skills}>
				{skillsData.skills.map((skill) => {
					return <SkillCard title={skill.title} text={skill.text} skills={skill.skills} />
				})}
			</div>
		);
	}
}
