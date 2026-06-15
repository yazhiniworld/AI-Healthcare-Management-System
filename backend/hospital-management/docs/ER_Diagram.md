# ER Diagram

## Entities

### User

* id (PK)
* name
* email
* password
* role

### Patient

* patient_id (PK)
* patient_name
* age
* gender
* phone

### Doctor

* doctor_id (PK)
* doctor_name
* specialization
* experience
* phone

### Appointment

* appointment_id (PK)
* patient_id (FK)
* doctor_id (FK)
* appointment_date
* appointment_time
* status

## Relationships

One Patient can have Many Appointments.

One Doctor can have Many Appointments.

Appointment acts as a bridge between Patient and Doctor.
