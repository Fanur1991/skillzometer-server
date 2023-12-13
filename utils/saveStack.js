import Stacks from '../models/Stacks.js';
import saveCategory from './saveCategory.js';

async function saveStack(stack) {
  const categoryIds = await Promise.all(
    stack.categories.map(async (category) => {
      return await saveCategory(category);
    })
  );

  const newStack = new Stacks({
    name: stack.name,
    desc: stack.desc,
    categories: categoryIds,
    url: stack.url,
  });
  return await newStack.save();
}

export default saveStack;
