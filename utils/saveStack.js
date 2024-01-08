import Stacks from '../models/Stacks.js';
import saveCategory from './saveCategory.js';

// При это конфигурации в БД данные перезаписываются
async function saveStack(stack) {
  stack.categories.sort((a, b) => a.categoryId - b.categoryId);

  // способ 1 при этом способе сортировка не работает, так как промис не выполняется синхронно для каждой категории, а они по объему информации все разные поэтому выполнятеются с разной длительностью
  // const categoryIds = await Promise.all(
  //   stack.categories.map(async (category) => {
  //     return await saveCategory(category);
  //   })
  // );

  // Способ 2 сортировка работает, но сам способ слишком простой))
  // const categoryIds = [];
  // for (const category of stack.categories) {
  //   const categoryId = await saveCategory(category);
  //   categoryIds.push(categoryId);
  // }

  // Способ 3 сортировка категорий работает на ура
  const categoryIds = await stack.categories.reduce(
    async (accumulatorPromise, category) => {
      const accumulator = await accumulatorPromise;
      const categoryId = await saveCategory(category);
      accumulator.push(categoryId);
      return accumulator;
    },
    Promise.resolve([])
  );

  const query = { url: stack.url };
  const update = {
    name: stack.name,
    desc: stack.desc,
    categories: categoryIds,
    url: stack.url,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  return await Stacks.findOneAndUpdate(query, update, options);
}

export default saveStack;
