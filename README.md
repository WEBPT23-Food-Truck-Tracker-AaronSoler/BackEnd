# BackEnd# Back-End

## Schema

#### Diners

| Field    | Type    | Notes                              |
| -------- | ------- | ---------------------------------- |
| id       | integer | _primary key_ and _autoincrements_ |
| email    | string  | _required_ and _unique_            |
| password | string  | _required_                         |
| username | string  | _required_ and _unique_            |
| first_name | string  | _required_                       |
| last_name | string  | _required_                        |
| current_location| string | _optional_                   |

