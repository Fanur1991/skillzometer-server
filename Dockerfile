# Определите базовый образ
FROM node:16-alpine

# Создайте директорию приложения
WORKDIR /usr/src/app

# Копируйте файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Установите зависимости проекта
RUN npm install

# Если вы разрабатываете приложение в режиме разработки, используйте
# RUN npm install --only=development

# Копируйте исходный код приложения
# COPY . .

# Откройте порт, на котором запустится ваше приложение
EXPOSE 3001

# Определите команду для запуска приложения
CMD [ "node", "index.js" ]
