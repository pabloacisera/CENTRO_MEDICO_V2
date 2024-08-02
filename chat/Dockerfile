# Usa una imagen base de Node.js
FROM node:21

# Establece el directorio de trabajo en la imagen
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json del chat
COPY chat/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del chat
COPY chat/src ./src
COPY chat/tsconfig*.json ./

# Compila el proyecto si es necesario
# RUN npm run build

# Exponer el puerto que el chat usará (ajústalo según tu configuración)
EXPOSE 3001

# Comando para iniciar el chat
CMD ["npm", "run", "start"]
