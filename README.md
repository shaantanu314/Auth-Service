# DFS Auth Service

## Description

DFS Auth Service is a centralized, secure authentication service for all DFS projects, ensuring seamless access and enhanced security

## Usage Documentation

You can visit the following pages to read the documentation of the APIs

- [User Registration](./documentation/userRegistration.md)
- [User Login](./documentation/userLogin.md)
- [User Email Verification ](./documentation/emailVerification.md)

## Installation and Setup DFS-Auth

To install DFS-Auth, follow these steps:

### Clone the repository

```bash
git clone git@github.com:shaantanu314/DFS_Auth-Service.git
```

### Install npm packages

Install all the npm packages

```bash
npm i
```

### Setting up

Create a `.env` and copy the content of `.env.example`

```bash
cp .env.example .env
```

Setup mailing creds for `nodemailer`. We use google OAuth2 credentials to authorize the nodemailer client to send mails on behalf of us.

Visit the youtube video linked below to setup your google account to generate these four keys which will be added in `.env`

```bash
GOOGLE_USER_EMAIL = "example@gmail.com"
GOOGLE_CLIENT_ID = "XXXX"
GOOGLE_CLIENT_SECRET = "XXXX"
GOOGLE_REFRESH_TOKEN = "XXXX"
```

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/18qA61bpfUs/0.jpg)](https://www.youtube.com/watch?v=18qA61bpfUs)

### Setup `mysql`

Database and User creation

```bash
# Login to your `sql` cli using sudo account
mysql -u root -p

# Create a database for this project
CREATE DATABASE DFSAuth;

# You can create a database of any name but make sure the user and database name are properly set in .env

# Create a user specific for this project and grant all permissions on this newly created database
CREATE USER 'dfs-auth'@'localhost' IDENTIFIED  BY 'password';
GRANT PRIVILEGE ON DFSAuth.* TO 'dfs-auth'@'localhost';
```

Setup Tables

Copy the contents of `src/db/setup.sql` and paste it in the `mysql` cli.

### Setup keys for JWT (JSON web token) generation

Inside root of your repository

```bash
mkdir keys

# Generate Private Key
ssh-keygen -t rsa -b 2048 -m PEM -f keys/rsa.key

# Generate the Public Key
openssl rsa -in keys/rsa.key -pubout -outform PEM -out keys/rsa.key.pub
```

### Run Auth Server

```bash
npm start
```

---

### Testing API (Optional)

1. Install Insomnia on your PC by following the instructions [here](https://docs.insomnia.rest/insomnia/install).

2. Import the collection in your insomnia panel from `testingAPI.insomnia.json`.
