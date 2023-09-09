# Maintainers

- [Anton Bachykin](https://github.com/DenyingTheTruth)

# Ticket Workflow Admin Web Console

The Ticket Workflow Admin Web Console is a powerful tool designed to streamline and simplify the management of ticket workflows.
It provides an intuitive user interface for administrators to create, update, and monitor ticket workflows, ensuring efficient and organized ticket handling.

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

## Usage

Once the Ticket Workflow Admin Web Console is set up, you can start using it to manage your ticket workflows. Here are some common tasks:

### Linking ticket to Workflow

1. Log in to the admin console.
2. Navigate to the "Tickets" section.
3. Click on `Clasify` on `Unclassified Tickets` table to select Workflow
4. You can select `Other` tab to create a new Workflow or select `Don't Know` if there is no needed workflow.
5. Use search input to find ticket by title, description, createdBy or workflow.

### Managing Workflow

1. Navigate to the "Workflows" section.
2. Add, delete workflow using the intuitive interface.
3. Use search input to find workflows by name or description.
