# Database Design

## Users Table

| Column   | Type         |
| -------- | ------------ |
| id       | INT          |
| name     | VARCHAR(100) |
| email    | VARCHAR(100) |
| password | VARCHAR(255) |
| role     | VARCHAR(20)  |

---

## Doctors Table

| Column         | Type         |
| -------------- | ------------ |
| doctor_id      | INT          |
| doctor_name    | VARCHAR(100) |
| specialization | VARCHAR(100) |
| experience     | INT          |
| phone          | VARCHAR(15)  |

---

## Patients Table

| Column       | Type         |
| ------------ | ------------ |
| patient_id   | INT          |
| patient_name | VARCHAR(100) |
| age          | INT          |
| gender       | VARCHAR(10)  |
| phone        | VARCHAR(15)  |

---

## Appointments Table

| Column           | Type        |
| ---------------- | ----------- |
| appointment_id   | INT         |
| patient_id       | INT         |
| doctor_id        | INT         |
| appointment_date | DATE        |
| appointment_time | TIME        |
| status           | VARCHAR(20) |

---

## Relationships

One Doctor → Many Appointments

One Patient → Many Appointments
