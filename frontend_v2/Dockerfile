# Usa una imagen base de Node.js
FROM node:20 AS builder

# Establece el directorio de trabajo en la imagen
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json del frontend
COPY frontend_v2/package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del frontend
COPY frontend_v2/ ./

# Construye el proyecto
RUN npm run build --prod

# Usa una imagen de Nginx para servir el frontend
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
