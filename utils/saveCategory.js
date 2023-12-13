import Categories from '../models/Categories.js';
import saveSkills from '../utils/saveSkills.js';

async function saveCategory(category) {
  const skillIds = await saveSkills(category.skills);
  const newCategory = new Categories({
    name: category.name,
    desc: category.desc,
    skills: skillIds,
  });
  return await newCategory.save();
}

export default saveCategory;
