
# KEEPA-INSIGHT-PLATFORM

This application allows users to enter an ASIN code and view the product details on the website.

### Getting started
1.Clone this repository

2.Install dependencies:

    cd keepa-insight-platform
    npm install
    cd backend
    npm install

3.Install the Redis Server.

    https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/

4.Start the server

    cd keepa-insight-platform
    npm start dev
    cd backend
    node server.js

5.Open https://localhost:8080

### Usage
Enter an ASIN in the search bar and click "Search". The product details will be displayed below.

-Product Image

-Product Title

-Bullet Point Features

-Rating Count and Average Rating

-Average buy box price for the last 30, 90 and 180 days.

-Graph for sale rank and category.