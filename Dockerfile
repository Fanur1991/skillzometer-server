# Определите базовый образ
FROM node:16-alpine

# Создайте директорию приложения
WORKDIR /usr/src/app

# Copy package dependencies
COPY package.json package-lock.json ./

# Установите зависимости проекта
RUN npm install --only=development

# Копируйте исходный код приложения
COPY . .

# Откройте порт, на котором запустится ваше приложение
EXPOSE 3001

ENTRYPOINT ["npm"]

CMD ["run", "server"]