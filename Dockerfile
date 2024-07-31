FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./


RUN npm install

COPY backend/ ./backend
COPY src/ ./src
COPY public/ ./public
EXPOSE 3000
EXPOSE 5001
CMD ["npm", "start"]
