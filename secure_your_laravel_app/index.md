While fixing a client project in which the database was deleting itself according to him. If you are a developer, you are already aware that 

mysql -uroot -p#Mqlbzay@144 diapoo_db 
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=diapoo
DB_USERNAME=diapoo
DB_PASSWORD="$2y$10$lEp7ZkVts6"


## TODO
- [ ] 2. 
- [ ] 3. Le mail pour modifier le mot de passe ne fonctionne pas
- [ ] 4. Problème avec ce lien https://fr.diapoo.org/panel/admin/donations

Report of what I did:
- backup current version of server
```bash
ssh alioune@vps148886.vps.ovh.ca
Al#Fe@20?sv144
tar --exclude vendor --exclude node_modules --exclude storage/logs  --exclude storage/framework --exclude .git -zcvf site.tar.gz .
exit
scp user@server:/var/www/html/site/site.tar.gz .
```
- change mysql root password
```bash
# Connect with root
mysql -uroot -p

ALTER USER 'root'@'localhost' IDENTIFIED BY 'ouC4dyf8+OFCPeQIBUI';
CREATE DATABASE diapoo CHARSET utf8 COLLATE utf8_general_ci;
CREATE USER diapoo@localhost identified with mysql_native_password by 'XMEg*$_+ZOtuVdouC4d';
GRANT ALL PRIVILEGES on diapoo.* to diapoo@localhost;

# Bash
adduser diapoo
# Now connect using diapoo
```
- create fresh new user for app
- change ssh password for vps
- add user for server to limit scope and access
This will avoid any attacker to land as root on your server in case of breach.
- disallow root authentication

I am suspecting a credentials leaks. We will monitor the access from now on to see


server -> immeuble
lamda site -> etage
problem: same key

# Change password
```bash
passwd
```

host: vps148886.vps.ovh.ca
## SSH accesses
user: root
password: =,~:Tqhk7r9%KWFj
    
user: alioune
password: [;-n*]a[/7jhH^u8

user: diapoo
password: Se2RNAL'<&'[UgrY



add your ssh key to ~/.ssh/authorized_keys

```bash
echo ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCcE/O7cD+ziXg/BGQxq9f/YBbQThxOI5N2nM97gxU1jikWXynV1bp+QaPT6wYe7p7Pjr0ynqOeTGlSHZhIJxQvWAJvht1XvPAG1PNTAlFRLH/z8MsIImFoXPeeg4LWpnampGSHlMoJSbNjQGjiATu7Z/kFsj004GsDMLT8QmZdwQzgV95M5MHN/UPPDSRxpT9iSa2AhV2DabE29HN0AZPuxjU/+4x4gN0J9/WSZMMs1B6hQmcSUoQuUdgzwbo2nOBsxotm6DI9s5JZDCidusbr6NNXlkt101Jxyw8xw7XgWI4V1YG3U3i1Wfjurl3/LQ+AwvLAlyouI2ol2oNleyDCGtDzgUFmJLI7C1Nig4XV+K7VaBmdowgf0lbRHhFkX1KPqpWP+XmfgqWvfjTEA9UsueMOLw0UQKPZ7R4gcBRrzv2JVDiXxFUN7QrATXU5XRcrhDdqnj/iy1Lv6rKJVN6mQoZ9c/vnq81S34kWOk/kzQG35QJXjuuPbD8wxW4fd4nY4qdYyaMdr2WnDiZK2XYBVCPZ57CZdcxutzNMjO0eQ6VHoH+0luY+CicXSTiiqjovL3tkjcYRLVfyWQKV5PQLRw/h9ZYHLS3XInJZhOzyUxgzlf8p7A5RALE9WZSYeQVblFQZ7xGBAFtlRc9tulCJy4xE8DOKFnFvnPVg08IptQ== bcdbuddy@EnvyPrime | tee -a ~/.ssh/authorized_keys
```

chmod 755 -R .
chmod -R o+w ./storage


mysql -uroot -p
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=diapoo
DB_USERNAME=diapoo
DB_PASSWORD=XMEg*$_+ZOtuVdouC4d


mysqldump -uroot -p diapoo_db > diapoo.sql
scp diapoo@vps148886.vps.ovh.ca:/var/www/html/diapoo/diapoo.sql .

scp -r public diapoo@vps148886.vps.ovh.ca:/var/www/html/diapoo/public

