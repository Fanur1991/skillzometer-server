import Skills from '../models/Skills.js';
// import crypto from 'crypto';

// Хэш функция для создания постоянного ID при одинаковых входных данных
// function generateHash(title, desc) {
//   return crypto
//     .createHash('md5')
//     .update(title + desc)
//     .digest('hex');
// }

// При это конфигурации в БД данные перезаписываются
async function saveSkills(skill) {
  // const hashId = generateHash(skill.title, skill.desc);
  const query = { skillId: skill.skillId };
  const update = {
    title: skill.title,
    desc: skill.desc,
    details: skill.details,
    skillId: skill.skillId,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const updatedSkill = await Skills.findOneAndUpdate(query, update, options);
  return updatedSkill._id;
}
export default saveSkills;
