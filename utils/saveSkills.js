import crypto from 'crypto';
import Skills from '../models/Skills.js';

// В данной конфигурации при сохранении в БД существующая там инфа не обновляется, а просто сверху еще допом сохраняется
// async function saveSkills(skills) {
//   const savedSkills = await Promise.all(
//     skills.map(async (skill) => {
//       const newSkill = new Skills({
//         name: skill.name,
//         desc: skill.desc,
//         details: skill.details,
//         propId: uuid(),
//       });
//       await newSkill.save();
//       return newSkill._id;
//     })
//   );
//   return savedSkills;
// }

// export default saveSkills;

// При это конфигурации в БД данные перезаписываются
function generateHash(name, desc) {
  return crypto
    .createHash('md5')
    .update(name + desc)
    .digest('hex');
}

async function saveSkills(skills) {
  const savedSkills = await Promise.all(
    skills.map(async (skill) => {
      const hashId = generateHash(skill.name, skill.desc);

      const query = { hashId: hashId };
      const update = {
        name: skill.name,
        desc: skill.desc,
        details: skill.details,
        hashId: hashId,
      };
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };

      const updatedSkill = await Skills.findOneAndUpdate(
        query,
        update,
        options
      );
      return updatedSkill._id;
    })
  );
  return savedSkills;
}

export default saveSkills;
