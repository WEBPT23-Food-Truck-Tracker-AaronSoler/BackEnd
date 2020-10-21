# BackEnd# Back-End

## Schema

#### diners

| Field            | Type    | Notes                              |
| ---------------- | ------- | ---------------------------------- |
| id               | integer | _primary key_ and _autoincrements_ |
| email            | string  | _required_ and _unique_            |
| password         | string  | _required_                         |
| username         | string  | _required_ and _unique_            |
| first_name       | string  | _required_                         |
| last_name        | string  | _required_                         |
| current_location | string  | _optional_                         |

#### operators

| Field      | Type    | Notes                              |
| ---------- | ------- | ---------------------------------- |
| id         | integer | _primary key_ and _autoincrements_ |
| email      | string  | _required_ and _unique_            |
| password   | string  | _required_                         |
| username   | string  | _required_ and _unique_            |
| first_name | string  | _required_                         |
| last_name  | string  | _required_                         |

#### trucks

| Field          | Type    | Notes                              |
| -------------- | ------- | ---------------------------------- |
| id             | integer | _primary key_ and _autoincrements_ |
| truck_image    | string  | _optional_                         |
| cuisine_type   | string  | _required_                         |
| location       | string  | _optional_                         |
| departure_time | string  | _optional_                         |
| operator_id    | integer | _required_                         |

#### menu_items

| Field            | Type    | Notes                              |
| ---------------- | ------- | ---------------------------------- |
| id               | integer | _primary key_ and _autoincrements_ |
| item_description | string  | _required_                         |
| item_name        | string  | _required_                         |
| item_price       | float   | _required_                         |
| truck_id         | integer | _required_                         |

#### diners_menu_items_ratings

| Field        | Type    | Notes                              |
| ------------ | ------- | ---------------------------------- |
| id           | integer | _primary key_ and _autoincrements_ |
| menu_item_id | integer | _required_                         |
| diner_id     | integer | _required_                         |
| rating       | integer | _required_                         |

#### diners_truck_ratings

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| truck_id | integer | _required_                         |
| diner_id | integer | _required_                         |
| rating   | integer | _required_                         |

#### diner_favorite_trucks

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| truck_id | integer | _required_                         |
| diner_id | integer | _required_                         |

#### POST /api/diner/register

request data:

```json
{
	"email": "username@email.com",
	"password": "password",
	"username": "Name",
	"first_name": "first name",
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
	"password": "password",
	"location": {
		"longitude": -74.0618995,
		"latitude": 40.74179804
	}
}
```

response data:

```json
{
	"message": "Welcome, ${username}",
	"token": "really.long.token",
	"id": "User ID"
}
```

#### POST /api/operator/register

request data:

```json
{
	"email": "username@email.com",
	"password": "password",
	"username": "Name",
	"first_name": "First Name",
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
	"token": "really.long.token",
	"id": "User ID"
}
```

#### GET api/restricted/diner/:userId/dashboard?radius=1

Radius should be plus 1 for each half mile of distance, ie 1 = .5 mile, 2 = 1 mile, 3 = 1.5 miles, etc.
request data:

response data:

```json
[
	{
		"id": 1,
		"truck_name": "Pancho Villas",
		"truck_image": null,
		"cuisine_type": "Mexican",
		"location": "{\"longitude\":-74.00676748,\"latitude\":40.7202806}",
		"departure_time": null,
		"operator_id": 1
	},
	{
		"id": 2,
		"truck_name": "Mike's PizzaTruck",
		"truck_image": null,
		"cuisine_type": "Pizza",
		"location": "{\"longitude\":-74.0618995,\"latitude\":40.74179804}",
		"departure_time": null,
		"operator_id": 1
	}
]
```

#### PUT api/restricted/diner/:userId

request data:
Only the fields being changed need to be sent... changed passwords will be automatically rehashed.

```json
{
            "id": 1,
            "username": "user1",
            "password": "password",
            "email": "someone@email.com",
            "first_name": "John",
            "last_name": "Doe",
            "current_location": "{\"longitude\":-74.00909759,\"latitude\":40.71789583}"
        },
```

response data:

```json
{
	"message": "Update-- Success!",
	"data": {
		"id": 1,
		"username": "user1",
		"password": "$2a$10$yVd8d4eU0dJT1XgByHsEdus3LUUCAzAxJ59USc/6MgYPPgrY2zNMK",
		"email": "someone@email.com",
		"first_name": "Jonny",
		"last_name": "Doe",
		"current_location": "{\"longitude\":-74.00909759,\"latitude\":40.71789583}"
	}
}
```
