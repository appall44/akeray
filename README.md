# Akeray Property Management System (APMS)

## Overview

The Akeray Property Management System (APMS) is a cloud-based platform designed to streamline property management operations. It provides a centralized solution for property owners, tenants, and admins to manage leasing, unit management, payments, maintenance requests, and notifications. This project is built with a modern web stack and prioritizes security, scalability, and efficiency.

### Core Features

- **User Management**: Admin CRUD operations for Owners, Tenants, and Admins with role-based access control (RBAC).
- **Property Management**: Create, view, and manage property units (status, pricing).
- **Lease Management**: Track lease terms, expiry dates, and generate agreements.
- **Payment Processing**: Record payments and generate invoices.
- **Notifications**: Automated SMS alerts via Geez SMS API for lease expirations and payment confirmations.
- **Maintenance Requests**: Tenants submit requests; admins assign tasks.

### Technology Stack

| Layer         | Technology                                          |
| ------------- | --------------------------------------------------- |
| Frontend      | ReactJS (v18)                                       |
| Backend       | NestJS (v9+)                                        |
| Database      | PostgreSQL (v14)                                    |
| Deployment    | Docker, Linux VPS (Ubuntu 22.04 LTS), NGINX         |
| Notifications | Geez SMS API                                        |
| Security      | JWT Authentication, RBAC, HTTPS, Input Sanitization |

## Prerequisites

- **Node.js**: v20+
- **PostgreSQL**: v14
- **Docker**: Latest stable version
- **NGINX**: Optional for HTTPS termination
- **Geez SMS API Key**: Obtain from Geez SMS provider
- **Git**: For version control

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/[your-repo]/akeray-pms.git
cd akeray-pms
```
