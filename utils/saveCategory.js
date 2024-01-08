import Categories from '../models/Categories.js';
import saveSkills from '../utils/saveSkills.js';

// При это конфигурации в БД данные перезаписываются
async function saveCategory(category) {
  category.skills.sort((a, b) => a.skillId - b.skillId);

  const skillIds = await category.skills.reduce(
    async (accumulatorPromise, skill) => {
      const accumulator = await accumulatorPromise;
      const skillId = await saveSkills(skill);
      accumulator.push(skillId);
      return accumulator;
    },
    Promise.resolve([])
  );

  const query = { categoryId: category.categoryId };
  const update = {
    name: category.name,
    desc: category.desc,
    skills: skillIds,
    categoryId: category.categoryId,
  };

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  const savedCategory = await Categories.findOneAndUpdate(
    query,
    update,
    options
  );
  return savedCategory._id;
}

export default saveCategory;
