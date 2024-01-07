import Categories from '../models/Categories.js';
import saveSkills from '../utils/saveSkills.js';

// В данной конфигурации при сохранении в БД существующая там инфа не обновляется, а просто сверху еще допом сохраняется
// async function saveCategory(category) {
//   const skillIds = await saveSkills(category.skills);
//   const newCategory = new Categories({
//     name: category.name,
//     desc: category.desc,
//     skills: skillIds,
//     propId: category._id,
//   });
//   return await newCategory.save();
// }

// export default saveCategory;

// При это конфигурации в БД данные перезаписываются
async function saveCategory(category) {
  const skillIds = await saveSkills(category.skills);

  const query = { name: category.name };
  const update = {
    name: category.name,
    desc: category.desc,
    skills: skillIds,
    propId: category.propId,
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
