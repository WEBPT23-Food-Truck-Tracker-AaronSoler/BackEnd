# BackEnd# Back-End

## Schema

#### diners

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_ and _unique_            |
| first_name | string  | _required_                       |
| last_name | string  | _required_                        |
| current_location| string | _optional_                   |

#### operators

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_ and _unique_            |
| first_name | string  | _required_                       |
| last_name | string  | _required_                        |

#### trucks

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| truck_image    | string  | _optional_                   |
| cuisine_type | string  | _required_                     |
| location | string  | _optional_                         |
| departure_time | string  | _optional_                   |
| operator_id | integer  | _required_                     |

#### menu_items

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| item_description | string  | _required_                 |
| item_name | string  | _required_                        |
| item_price | float  | _required_                        |
| truck_id | integer  | _required_                     |

#### diners_menu_items_ratings

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| menu_item_id | integer  | _required_                    |
| diner_id | integer  | _required_                        |
| rating | integer  | _required_                          |

#### diners_truck_ratings

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| truck_id | integer  | _required_                    |
| diner_id | integer  | _required_                        |
| rating | integer  | _required_                          |


#### POST /api/diner/register

request data:

```json
{
  "email": "username@email.com",
  "password": "password",
  "username": "Name",
  "first_name: "first name",
  "last_name": "last name"
}
```

response data:

```json
{
    "id": 1,
    "username": "username",
    "password": "hashed password",
    "email": "someone@email.com",
    "first_name": "first name",
    "last_name": "last name"
}

```

#### POST api/diner/login

request data:

```json
{
  "username": "username",
  "password": "password"
}
```

response data:

```json
{
    "message": "Welcome, ${username}",
    "token": "really.long.token"
}
```

#### POST /api/operator/register

request data:

```json
{
  "email": "username@email.com",
  "password": "password",
  "username": "Name",
  "first_name: "First Name",
  "last_name": "Last Name"
}
```

response data:

```json
{
    "id": 1,
    "username": "username",
    "password": "hashed password",
    "email": "someone@email.com",
    "first_name": "first name",
    "last_name": "last name"
}

```

#### POST api/operator/login

request data:

```json
{
  "username": "username",
  "password": "password"
}
```

response data:

```json
{
    "message": "Welcome, ${username}",
    "token": "really.long.token"
}
```
