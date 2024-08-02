# Usa una imagen base de Node.js 21
FROM node:21

# Establece el directorio de trabajo en la imagen
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY backend/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY backend/src ./src
COPY backend/tsconfig*.json ./

# Compila el proyecto
RUN npm run build

# Exponer el puerto que la aplicación usará (esto es informativo)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
