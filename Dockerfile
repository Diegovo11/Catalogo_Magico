FROM nginx:alpine

# Copiar archivos al directorio de nginx
COPY . /usr/share/nginx/html

# Crear configuración de nginx para Railway (puerto dinámico)
RUN echo 'server { listen ${PORT:-80}; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/templates/default.conf.template

# Exponer el puerto
EXPOSE 80

# Iniciar nginx (automáticamente sustituye variables de entorno)
CMD ["nginx", "-g", "daemon off;"]