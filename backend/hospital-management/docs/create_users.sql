-- Create users table
CREATE TABLE users (
  user_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50)
);

-- Sample inserts (plaintext passwords: consider hashing in production)
INSERT INTO users (username, email, password, role) VALUES ('Admin', 'admin@gmail.com', 'admin123', 'ADMIN');
INSERT INTO users (username, email, password, role) VALUES ('Dr. Ashwin', 'doctor@gmail.com', 'doctor123', 'DOCTOR');
INSERT INTO users (username, email, password, role) VALUES ('Reception', 'receptionist@gmail.com', 'recept123', 'RECEPTIONIST');
