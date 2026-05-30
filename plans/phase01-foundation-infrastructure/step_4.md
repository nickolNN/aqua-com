# Step 4: Core GORM Models

4.1 Implement User model with fields: id, email, password_hash, role, created_at, updated_at
4.2 Implement Company model with fields: id, name, industry, website, address, custom_fields
4.3 Implement Contact model with fields: id, first_name, last_name, email, phone, company_id, custom_fields
4.4 Implement Task model with fields: id, title, description, status, priority, due_date, assigned_to, custom_fields
4.5 Implement Activity model with fields: id, type, title, description, contact_id, date, duration, custom_fields
4.6 Implement task_dependencies model for predecessor/successor relationships
