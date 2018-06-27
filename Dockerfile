FROM bwyono/node-project-nginx:latest

WORKDIR /var/app/dist
COPY dist ./

RUN npm install

RUN useradd -ms /bin/bash admin
RUN echo 'admin:admin123' | chpasswd
RUN usermod -aG sudo admin
USER admin