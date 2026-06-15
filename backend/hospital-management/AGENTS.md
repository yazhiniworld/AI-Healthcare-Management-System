# AI Healthcare Management System - Backend Agent Guide

## Quick Start

**Stack**: Spring Boot 3.5.14 + Spring Data JPA + MySQL  
**Build**: `mvn clean install` | **Run**: `mvn spring-boot:run` | **Test**: `mvn test`  
**Port**: 8080 | **DB**: MySQL on localhost:3306 (auto-schema via Hibernate)

## Architecture

**3-Tier Pattern**: Controllers → Services → Repositories  
**Three Core Modules**: Patient, Doctor, Appointment (each with full CRUD flow)

```
src/main/java/hospital_management/
├── controller/      (REST endpoints)
├── service/         (business logic & validation)
├── entity/          (JPA entities)
└── repository/      (Spring Data interfaces)
```

**Zero redundancy** — strict adherence to pattern across all modules.

## Key Conventions

- **Service layer**: Contains all business logic (e.g., `AppointmentService` validates appointment conflicts)
- **Repository pattern**: `CrudRepository` with custom query methods (e.g., `findBySpecialization()`)
- **Entity design**: Simple POJOs with relationships (@OneToMany, @ManyToOne)
- **No DTOs yet** — entities serialized directly (planned improvement)
- **No authentication** — designed but not implemented (planned feature)

## Documentation Map

Link to before diving into code:
- [System Architecture](docs/System_Architecture.md) — high-level design
- [Database Design](docs/DatabaseDesign.md) — schema and relationships
- [API Documentation](docs/API_Documentation.md) — endpoint reference
- [Project Analysis](docs/Project_Analysis.md) — requirements and roadmap

## Implementation Status & TODOs

| Feature | Status | Notes |
|---------|--------|-------|
| Patient CRUD | ✅ Done | Missing address field in entity |
| Doctor CRUD | ✅ Done | Specialization & experience filtering works |
| Appointment CRUD | ✅ Done | Conflict detection implemented |
| **Authentication** | ⏳ Planned | Security priority |
| **Error Handling** | ⏳ Planned | No custom exceptions yet |
| **Validation** | ⏳ Planned | Lombok imported but not used |
| **DTOs** | ⏳ Planned | API currently exposes entities directly |
| DateTime handling | ⚠️ Incomplete | Using String instead of LocalDateTime |

## Common Tasks

**Add a new REST endpoint**: 
1. Create method in Controller
2. Implement business logic in Service
3. Use Repository for queries

**Debug failing tests**: `mvn test -X` for verbose output  
**Rebuild only**: `mvn clean compile` (skip tests)  
**Check dependencies**: `mvn dependency:tree`

## Known Pitfalls

- **DB Connection**: Ensure MySQL is running on localhost:3306 with credentials in `application.properties`
- **Cascade operations**: Patient/Doctor deletion cascades to Appointments (by design)
- **String dates**: API currently accepts/returns dates as Strings — upgrade to LocalDateTime in progress

## Quick Wins for Contributors

1. Add `@Data` annotation from Lombok to entities (eliminate getter/setter boilerplate)
2. Implement `GlobalExceptionHandler` for centralized error handling
3. Add `@Transactional` to service methods
4. Create DTOs for request/response decoupling

---

**Last updated**: 2025-06 | **Project version**: 0.0.1-SNAPSHOT (Early stage)
