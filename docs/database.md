# Database Schema

## Core Tables

### tasks

| Column       | Type       | Constraints                          |
|--------------|------------|--------------------------------------|
| id           | UUID       | PRIMARY KEY, DEFAULT gen_random_uuid() |
| title        | VARCHAR(255) | NOT NULL                           |
| description  | TEXT       | -                                  |
| status       | VARCHAR(20) | NOT NULL, CHECK                     |
| priority     | VARCHAR(20) | NOT NULL, CHECK                     |
| due_date     | TIMESTAMP  | -                                  |
| assigned_to  | UUID       | FOREIGN KEY                         |
| created_by   | UUID       | NOT NULL                            |
| created_at   | TIMESTAMP  | DEFAULT NOW()                       |
| updated_at   | TIMESTAMP  | DEFAULT NOW()                       |

### activities

| Column       | Type       | Constraints                          |
|--------------|------------|--------------------------------------|
| id           | UUID       | PRIMARY KEY, DEFAULT gen_random_uuid() |
| type         | VARCHAR(20) | NOT NULL, CHECK                      |
| title        | VARCHAR(255) | NOT NULL                             |
| description  | TEXT       | -                                   |
| contact_id   | UUID       | FOREIGN KEY                           |
| company_id   | UUID       | FOREIGN KEY                            |
| date         | TIMESTAMP  | NOT NULL                              |
| duration     | INTEGER    | -                                   |
| created_by   | UUID       | NOT NULL                              |
| created_at   | TIMESTAMP  | DEFAULT NOW()                         |

### contacts

| Column       | Type       | Constraints                          |
|--------------|------------|--------------------------------------|
| id           | UUID       | PRIMARY KEY, DEFAULT gen_random_uuid() |
| first_name   | VARCHAR(100) | NOT NULL                           |
| last_name    | VARCHAR(100) | NOT NULL                           |
| email        | VARCHAR(255) | NOT NULL, UNIQUE                    |
| phone        | VARCHAR(50)  | -                                  |
| company_id   | UUID       | FOREIGN KEY                          |
| custom_fields| JSONB      | -                                   |
| created_at   | TIMESTAMP  | DEFAULT NOW()                        |
| updated_at   | TIMESTAMP  | DEFAULT NOW()                        |

### companies

| Column       | Type       | Constraints                          |
|--------------|------------|--------------------------------------|
| id           | UUID       | PRIMARY KEY, DEFAULT gen_random_uuid() |
| name         | VARCHAR(255) | NOT NULL                           |
| website      | VARCHAR(255) | -                                  |
| industry     | VARCHAR(100) | -                                  |
| address      | TEXT       | -                                   |
| custom_fields| JSONB      | -                                   |
| created_at   | TIMESTAMP  | DEFAULT NOW()                        |
| updated_at   | TIMESTAMP  | DEFAULT NOW()                        |

### task_dependencies

| Column              | Type       | Constraints            |
|---------------------|------------|------------------------|
| predecessor_task_id | UUID       | NOT NULL, FOREIGN KEY  |
| successor_task_id   | UUID       | NOT NULL, FOREIGN KEY  |
| dependency_type     | VARCHAR(20)| NOT NULL, CHECK        |
