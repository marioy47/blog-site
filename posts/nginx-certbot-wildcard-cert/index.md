---
title: Create a wildcard certificate and install it in nginx

---

# Create a wildcard certificate and install it in nginx

https://antonputra.com/letsencrypt-wildcard-certificate/

```bash
sudo certbot certonly --manual
```

Use `*.wp01.dazzet.co`

Log in cloudfare

Create a new record

- Record type: `TXT`
- Domain: `_acme-challenge.wp01.dazzet.co`
- Value: `F_7Cpkmr1v-meVf_mhc0BwLP4Dn7AyrA2Y20Dau13ws`

Open a new window a run dig untile the record is valid:

```bash
dig -t txt acme-challenge.wp01.dazzet.co
```

You can test that the certificate exists with

```bash
sudo certbot certificates
```
There should be one with the name `wp01.dazzet.co` and domain `*.wp01.dazzet.co`.

Go to `/etc/nginx/sites-available` and create 


