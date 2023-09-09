# Maintainers

- [Anton Bachykin](https://github.com/DenyingTheTruth)

# Ticket Workflow Admin Web Console

Manage your ticket workflows effortlessly with our intuitive web-based admin console.

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Table of Contents

- [About](#about)
- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Run Locally](#run-locally)
  - [Run in Docker](#run-in-docker)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## About

The Ticket Workflow Admin Web Console is a powerful tool designed to streamline and simplify the management of ticket workflows. It provides an intuitive user interface for administrators to create, update, and monitor ticket workflows, ensuring efficient and organized ticket handling.

## Demo

Explore our live demo to see the Ticket Workflow Admin Web Console in action: [Demo Link](https://your-demo-url.com)

## Features

- Create and manage ticket workflows.
- Assign tickets to workflows.

## Getting Started

To get started with the Ticket Workflow Admin Web Console, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SpanningCloudApps/hackathon-ai.git
   ```

   Make sure that AI_HOME environment variable is set;
   ```bash
    export AI_HOME=/absolute_path_to_project
   ```

### Run locally

1. Install dependencies using node 18+:
    ```bash
    nvm use 18
    cd /admin/client
    npm install
    ```
2. Start dev environment
   ```bash
   npm run dev
   ```

### Run in docker

1. Start client in docker using by script:
  ```bash
  ./scripts/run-service-local --admin-client
  ```

Access the admin console in your web browser at http://localhost:3000.

**Usage**

Once the Ticket Workflow Admin Web Console is set up, you can start using it to manage your ticket workflows. Here are some common tasks:

**Linking ticket to Workflow:**

1. Log in to the admin console.
2. Navigate to the "Tickets" section.
3. Click on `Clasify` on `Unclassified Tickets` table to select Workflow
4. You can select `Other` tab to create a new Workflow or select `Don't Know` if there is no needed workflow.
5. Use search input to find ticket by title, description, createdBy or workflow.

**Managing Workflow:**

1. Navigate to the "Workflows" section.
2. Add, delete workflow using the intuitive interface.
3. Use search input to find workflows by name or description.

Please review our [Contribution Guidelines](CONTRIBUTING.md) for more details.

**License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Acknowledgements**

We would like to express our gratitude to the creators and contributors of the following open-source projects and libraries that have been instrumental in making the Ticket Workflow Admin Web Console possible:

- [antd](https://www.npmjs.com/package/antd) - A popular React UI library that provided essential components and styles for our admin console.
- [axios](https://www.npmjs.com/package/axios) - A versatile HTTP client for making API requests, essential for data communication in our application.
- [dayjs](https://www.npmjs.com/package/dayjs) - A lightweight and modern date utility library used for handling date and time-related operations.
- [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component) v6.1.0 - A React component that enabled us to implement infinite scrolling efficiently.
- [react](https://reactjs.org/) - The core library for building user interfaces in our web console.
- [react-dom](https://reactjs.org/) - A necessary companion to React for rendering our UI components in the DOM.
- [react-intl](https://www.npmjs.com/package/react-intl) - A library for internationalization that helped us provide multilingual support.
- [react-router](https://www.npmjs.com/package/react-router) - A routing library for React, enabling seamless navigation within our web application.
- [react-router-dom](https://www.npmjs.com/package/react-router-dom) - The DOM bindings for React Router, essential for web-based routing.
- [zustand](https://www.npmjs.com/package/zustand) - A state management library that simplified global state management in our application.
- [express](https://www.npmjs.com/package/express) - A fast, unopinionated web framework for Node.js, used to build the backend of our admin console.
- [flat](https://www.npmjs.com/package/flat) - A library for flattening and unflattening nested objects, aiding in data manipulation.

These remarkable projects significantly contributed to the development and functionality of our Ticket Workflow Admin Web Console. We extend our thanks to their authors and maintainers.

Thank you for using the Ticket Workflow Admin Web Console. We hope it simplifies your ticket management process.
