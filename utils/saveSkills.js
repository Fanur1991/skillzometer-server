import Skills from '../models/Skills.js';

async function saveSkills(skills) {
  const savedSkills = await Promise.all(
    skills.map(async (skill) => {
      const newSkill = new Skills({
        name: skill.name,
        desc: skill.desc,
        details: skill.details,
      });
      await newSkill.save();
      return newSkill._id;
    })
  );
  return savedSkills;
}

export default saveSkills;
