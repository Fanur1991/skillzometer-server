import Skills from '../models/Skills.js';
// import crypto from 'crypto';

// Хэш функция для создания постоянного ip при одинаковых входных данных
// function generateHash(name, desc) {
//   return crypto
//     .createHash('md5')
//     .update(name + desc)
//     .digest('hex');
// }

// При это конфигурации в БД данные перезаписываются
async function saveSkills(skill) {
  // const hashId = generateHash(skill.name, skill.desc);
  const query = { skillId: skill.skillId };
  const update = {
    name: skill.name,
    desc: skill.desc,
    details: skill.details,
    skillId: skill.skillId,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const updatedSkill = await Skills.findOneAndUpdate(query, update, options);
  return updatedSkill._id;
}
export default saveSkills;
