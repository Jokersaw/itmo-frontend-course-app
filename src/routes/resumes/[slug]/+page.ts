import type { PageLoad } from './$types';
import { getMyPersonById } from '$lib/connectionToDataBase';

// import { db, get, ref } from '../../../../firebaseConfig';

export const load: PageLoad = async ({ params }) => {
	try {
		// const response = await fetch('https://railway-strapi-production-7054.up.railway.app/api/persons?populate=*');// await get(ref(db, `resumes/${params.slug}`));
		//
		// const { data } = await response.json();
		//
		// Находим конкретного пользователя по documentId из params.slug
		// const userData = data.find(user => `${user.id}` === params.slug);
		//
		// if (!userData) {
		// 	throw new Error('User not found');
		// }
		//
		// Преобразование educations
		// const educations = Education.list(
		// 	...userData.educations.map(edu => [
		// 		edu.education_name,
		// 		edu.education_level,
		// 		new TimeRange(parseInt(edu.educate_start), parseInt(edu.educate_end))
		// 	])
		// );

		// Преобразование skills
		// const skills = Skill.list(
		// 	userData.skills.reduce((acc: Record<string, number>, skill) => {
		// 		acc[skill.skill_name] = skill.skill_percent;
		// 		return acc;
		// 	}, {})
		// );

		return {
			author: getMyPersonById(parseInt(params.slug))
		};
	} catch (error) {
		console.error('Error loading resume:', error);
		throw error;
	}
};