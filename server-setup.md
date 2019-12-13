

# Domain einrichten
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
        	proxy_pass http://localhost:3000;
        	proxy_http_version 1.1;
        	proxy_set_header Upgrade $http_upgrade;
        	proxy_set_header Connection 'upgrade';
        	proxy_set_header Host $host;
        	proxy_cache_bypass $http_upgrade;
    }
}


**Domain in der hosts.conf hinzufügen**
 `sudo vi /etc/hosts`
185.25.252.55 berthelsdorf.de www.berthelsdorf.de
185.25.252.55 theresienstadt-film.net www.theresienstadt-film.net



# Server einrichten
Requirements: git, npm, node, forever

* Clone the repository: `git clone https://github.com/nise/theresienstadt-explained`
* Copy it to the domain root folder: `sudo cp -r ./theresienstadt-explained/* /var/www/theresienstadt-film.net/`
* Go into the domain root folder: `cd /var/www/theresienstadt-film.net`
* Install server dependencies: `npm install`
* Go into the client folder `cd client`
* Install client dependencies `npm install`
* return to the rrot folder: `cd ..`
* Test it: `node server` You should be able to enter the domain in your browser and you should see the app. 
* git fetch --all && git reset --hard origin/master
* Run server.js forever: `sudo forever start -l forever.log -a -o terezin-out.log -e terzin-err.log server.js`
* TODO: configure restart of `forever` after server reboot

**setup Let's encrypt**
* `sudo wget https://dl.eff.org/certbot-auto -O /usr/sbin/certbot-auto`
* `sudo chmod a+x /usr/sbin/certbot-auto`
* `sudo certbot-auto --nginx -d theresienstadt-film.net  -d www.theresienstadt-film.net`
* TODO: add to cromntab: `0 2 * * * sudo /usr/sbin/certbot-auto -q renew`
* I had solv this issue first: https://github.com/certbot/certbot/issues/2883
* 




sudo ufw enable

