FROM nginx:alpine

# Copiar archivos al directorio de nginx
COPY . /usr/share/nginx/html

# Crear script de inicio que configure el puerto dinámico
RUN echo $'#!/bin/sh\n\
cat > /etc/nginx/conf.d/default.conf <<EOF\n\
server {\n\
    listen ${PORT:-80};\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    \n\
    location / {\n\
        try_files \\$uri \\$uri/ /index.html;\n\
    }\n\
}\n\
EOF\n\
nginx -g "daemon off;"\n\
' > /start.sh && chmod +x /start.sh

# Exponer el puerto
EXPOSE 80

# Ejecutar script de inicio
CMD ["/start.sh"]