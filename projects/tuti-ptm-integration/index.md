---
title: PTM & Tuti Soap Integration
cover: tuti-ptm-homepage.png
date: 2020-02-15
client: Tronex
tags: wordpress, soap, javascript, php, bitbucket, git, unittest
summary: Tuti.com.co Ecommerce and PTM integration using Soap so the e-commerce could sell phone plans.
---

# PTM & Tuti Soap Integration

This is one of the more complex projects that I've built for a client.

The main idea of the project was to integrate [Tuti's](https://tuti.com.co) e-commerce with the [PTM](https://ptm.com.co) service.

Tronex is a local company that provisions small neighborhood stores with products like milk, eggs, batteries, lighters, snacks, etc. without the need of the store owner to contact hundreds of providers.

Tuti is an e-commerce created by Tronex so this store owners could make quotes and orders in an e-commerce like environment with the main difference that the payment was done offline. Also, this e-commerce can only be accessed by pre-registered store owners.

One of the products that this small owners sell very frequently is "talk minutes". So a client can purchase something like "10 minuts of talk time on my phone" and that's where PTM comes in. PTM allows any kind of store to sell minutes to any kind of client.

For a store owner to be able to sell "minute plans" he/she needs to recharge a balance using an special document with personal barcode.

The main idea of this integration was to sell _PTM minute plans_ directly in _Tuti's e-commerce_.

The initial requirements for this project where:

- Display PTM's products inside Tuti's e-commerce like regular Woocommerce products
- Display only aproved PTM's products in tuti.com.co
- Each store owner has a balance with PTM. Only store owners with available balance could make sells.
- Show available balance for every store owner once logged in.
- On PTM's products show an inline form that allows the store owner to sell "minute plans"
- Before each minute purchase was done, the store owner should be able to see his/her balance.
- The e-commerce should be able to create the barcode document for each store owner.

## Technologies used

For the development environment I  used Ubunto 18.04 installed in a virtual machine using vagrant

I created a test wordpress environment with wp-cli

Also configured Visual Studio Code with PHP Sniffer

This project followed WordPress coding standards almots to a 100%. I used the following packages for PHP CS:
- `dealerdirect/phpcodesniffer-composer-installer`
- `phpcompatibility/php-compatibility`
- `phpcompatibility/phpcompatibility-wp`
- `sirbrillig/phpcs-variable-analysis`
- `wp-coding-standards/wpcs`

For testing I used
- `vlucas/phpdotenv`
- `phpunit/phpunit`

For the SOAP integration I needed to use `wsdl2phpgenerator/wsdl2phpgenerator` so the SOAP calls could be mapped to regular PHP objects.

For the PDF generation I used `mpdf/mpdf` since it allows you to create PDF files from correctly formatted html.

For the HTML generation inside the PDF I needed a template system. Since the client had experience with _Shopify's Liquid_ I used `liquid/liquid` template system.

Also, the PDF file needed custom barcode that needed to change from store owner to store owner. For that I used `picqer/php-barcode-generator`. Which generates a PNG file that could be embedded in the PDF

Finally, I used `indibeast/currency-formatter` version 1.0 to display balances in currency format.

## Screenshots

### Settings Page

The settings page for this project was somewhat long since you needed to configure the following:

- The _SOAP_ end point to make the requests and send the charges information
- The proxy if any was used for the SOAP server
- The auth credentials for querying for information
- On which page the _Refill_ form should be displayed
- A selection box to chose which products of all the available will be offered in the e-commerce
- A template for the generation of a PDF with barcode information

![Settings Page](tuti-ptm-settings-page.png)

