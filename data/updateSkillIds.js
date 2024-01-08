import { readFileSync, writeFileSync } from 'fs';

// Чтение JSON-файла
let rawData = readFileSync('frontendDev.json');
let data = JSON.parse(rawData);

// Счетчик для ID
let idCounter = 1;

// Обход всех категорий и навыков
data.stack.categories.forEach((category) => {
  category.skills.forEach((skill) => {
    // Обновление skillId
    skill.skillId = idCounter++;
  });
});

// Сохранение обновленных данных обратно в файл
let updatedData = JSON.stringify(data, null, 2);
writeFileSync('frontendDev.json', updatedData);

console.log('Skill IDs обновлены.');

// Код для запуска этого скрипта в терминале открытом в данной директории
// node updateSkillIds.js
