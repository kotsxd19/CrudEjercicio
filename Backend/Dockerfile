# 1. Imagen base oficial de Node.js con Alpine Linux (ligera y segura)
FROM node:20-alpine

# 2. Definir el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar únicamente los manifiestos de dependencias primero
COPY package*.json ./

# 4. Instalar las dependencias dentro del contenedor
RUN npm install --omit=dev

# 5. Copiar el resto del código fuente del proyecto
COPY . .

# 6. Informar el puerto que escuchará la aplicación
EXPOSE 3000

# 7. Comando de arranque al iniciar el contenedor
CMD ["npm", "start"]