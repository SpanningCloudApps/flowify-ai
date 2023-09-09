# Admin Web Console Server

**Admin Server is a server for Admin web console UI.**

## Authors
Ruslan Zianevich

The Admin Web Console Server is the backend component that powers the admin web console for managing ticket workflows.

## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Server](#running-the-server)
  - [Running Locally](#running-locally)
  - [Running in Docker](#running-in-docker)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

The Admin Server is a backend component designed for the Admin web console UI. It provides functionality for managing ticket workflows.

## Getting Started

To set up and run the Admin Web Console Server, follow these instructions:

### Prerequisites
Before you begin, ensure you have set the **AI_HOME** environment variable to the absolute path of the `hackathon AI` project.

Up postgresql db using script from root project folder ():
```bash
cd ${AI_HOME}
./scripts/run-service-local --db-init
```

Use the following command to build the project:

```shell
${AI_HOME}/admin/server
./mwnw clean package
```

## Running the Server

### Running Locally

To run the server locally, execute the following commands:

```shell
cd ${AI_HOME}/admin/server
./mvnw clean spring-boot:run -Dspring-boot.run.profiles=dev
```

### Running in Docker

To run the server in a Docker container, use the following command:

```bash
cd ${AI_HOME}
./scripts/run-service-local --admin-server
```


## Environment Variables
<table>
    <thead>
        <tr>
            <th colspan=4><h1>Environment Variables</h1></th>
        </tr>
        <tr>
            <th>Variable</th>
            <th>Description</th>
            <th>Type</th>
            <th>Default</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>AI_LOG_LEVEL</td>
            <td>Overrides logging level.</td>
            <td>String</td>
            <td>info</td>
        </tr>
        <tr>
            <td>AI_HOME</td>
            <td>Root path of project</td>
            <td>String</td>
            <td> - </td>
        </tr>
        <tr>
            <td>AI_INDEX_DB_HOST</td>
            <td>Host to connect to <b>index</b> database</td>
            <td>String</td>
            <td>localhost</td>
        </tr>
        <tr>
            <td>AI_INDEX_DB_PORT</td>
            <td>Port to connect to <b>index</b> database</td>
            <td>String</td>
            <td>7432</td>
        </tr>
        <tr>
            <td>AI_INDEX_DB_NAME</td>
            <td><b>metrics</b> database name</td>
            <td>String</td>
            <td>index</td>
        </tr>
        <tr>
            <td>AI_INDEX_DB_USERNAME</td>
            <td>User to connect to <b>index</b> database</td>
            <td>String</td>
            <td>dev</td>
        </tr>
        <tr>
            <td>AI_INDEX_DB_PASSWORD</td>
            <td>Password to connect to <b>index</b> database</td>
            <td>String</td>
            <td>dev</td>
        </tr>
        <tr>
            <td>AI_IMAGE_NAME</td>
            <td>Overrides docker image name. </br><b>Warning:</b>Must NOT be overriden for local development (Breaks docker-compose)</td>
            <td>String</td>
            <td>ai-admin-server</td>
        </tr>
        <tr>
            <td>AI_IMAGE_TAG</td>
            <td>Overrides docker image tag. </br><b>Warning:</b>Must NOT be overriden for local development (Breaks docker-compose)</td>
            <td>String</td>
            <td>latest git commit hash(7 symbols)</td>
        </tr>
        <tr>
            <td>AI_JWT_SECRET</td>
            <td>Secret used to encode JWT token</td>
            <td>String</td>
            <td>3CXhf?pu):l)xjX=8?yQq^.I;4Xl8OV$.aCR#RU\<tqv4[qzU>.fMnI]1'.n=kH</td>
        </tr>
        <tr>
            <td>AI_CSRF_COOKIE_DOMAIN</td>
            <td>Overrides CSRF cookie's domain.</td>
            <td>String</td>
            <td>localhost</td>
        </tr>
    </tbody>
</table>
