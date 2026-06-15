# Database Requirement Analysis

## Table List

### Users

Stores authentication details.

Columns:

* id
* name
* email
* password
* role

---

### Patients

Stores patient details.

Columns:

* patient_id
* patient_name
* age
* gender
* phone
* address

---

### Doctors

Stores doctor details.

Columns:

* doctor_id
* doctor_name
* specialization
* experience
* phone

---

### Appointments

Stores appointment records.

Columns:

* appointment_id
* patient_id
* doctor_id
* appointment_date
* appointment_time
* status

---

### Notifications

Stores user notifications.

Columns:

* notification_id
* user_id
* message
* created_at

---

## Relationships

One Patient can have many Appointments.

One Doctor can have many Appointments.
