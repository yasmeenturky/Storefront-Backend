# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index GET /products
- Show  GET /products/:id
- Create [token required] POST /products
- Update [token required] PUT /products/:id
- Delete [token required] DELETE /products/:id

#### Users
- Index [token required] GET /users
- Show [token required] GET /users/:id
- Create POST /users/:id
- Update [token required] PUt /users/:id
- Delete [token required] DELETE /users/:id
- Authenticate POST /users/auth

#### Orders
- Index [token required] GET /orders
- Show [token required] GET /orders/:id
- Create [token required] POST /orders/:id
- Update [token required] PUt /orders/:id
- Delete [token required] DELETE /orders/:id
- Current Order by user (args: user id)[token required] GET /orders/users/:id

## Data Shapes
#### Product
## Table products
-  id [SERIAL PRIMARY KEY]
- name [VARCHAR]
- price [integer]

#### User
## Table users
- id [SERIAL PRIMARY KEY]
- firstName [VARCHAR]
- lastName [VARCHAR]
- password [VARCHAR]

#### Orders
## Table orders
- id [SERIAL PRIMARY KEY]
- user_id [bigint REFERENCES users(id)]
- status of order (active or complete) [VARCHAR]

## Table order_products
- id [SERIAL PRIMARY KEY]
- id of each product in the order  [bigint REFERENCES products(id)]
- id of order  [bigint REFERENCES orders(id)]
- quantity of each product in the order  [integer]