
Anleitung zum einrichten mehrerer Domain auf einer Maschine:
https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-16-04


1. `cp /etc/nginx/sites-available/default /etc/nginx/sites-available/berthelsdorf.de`
2. `/etc/nginx/sites-available/berthelsdorf.de`
3. `sudo ln -s /etc/nginx/sites-available/berthelsdorf.de /etc/nginx/sites-enabled/`

Datei /etc/nginx/sites-available/berthelsdorf.de:

server {
        listen 80;
        listen [::]:80;

        root /var/www/berthelsdorf.de;
        index index.html index.htm index.nginx-debian.html;

        server_name berthelsdorf.de www.berthelsdorf.de;

        location / {
                try_files $uri $uri/ =404;
        }
}




server {
        listen 80;
        listen [::]:80;

        root /var/www/theresienstadt-film.net;
        index index.html index.htm index.nginx-debian.html;

        server_name theresienstadt-film.net www.theresienstadt-film.net;

        location / {
                try_files $uri $uri/ =404;
        }
}


# Domain in der hosts.conf hinzufügen
 `sudo vi /etc/hosts`
185.25.252.55 berthelsdorf.de www.berthelsdorf.de
185.25.252.55 theresienstadt-film.net www.theresienstadt-film.net
