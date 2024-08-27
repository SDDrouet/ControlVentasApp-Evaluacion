# Usamos una imagen base de Node.js
FROM node:20

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiamos el package.json y package-lock.json
COPY package*.json ./

# Instalamos las dependencias de la aplicación
RUN npm install --production

# Copiamos el resto de la aplicación al contenedor
COPY . .

# Exponemos el puerto en el que corre la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
