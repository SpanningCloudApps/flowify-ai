# Flowify Billing Model

## Infrastructure details for Flowify

Flowify is on AWS using Docker. Additionally, using PostgreSQL version 15 or higher and have configured 4 SQS queues.

Furthermore, it can be integrated with OpenAI with specific billing details: 4,000 context tokens cost $0.0015, and 1,000 tokens are billed at $0.002.

Here's a breakdown of the services within Flowify:

- **admin-server**: Developed in Java and containerized with Docker.
- **admin-client**: Developed using React, Nginx, and Docker.
- **core-server**: Built on NodeJS version 18 and deployed as a Docker container.
- **core-ui**: Utilizing MaterialUi for the chat interface and hosted in a Docker container.
- **worker**: Developed in TypeScript CLI and containerized using Docker.

---

- The Request Per Second (RPS) for the `core-ui` and `core-server` services is set at 5,000,
- The `worker` service dynamically scales based on the incoming messages from the 4 SQS queues, ensuring all processing tasks are completed within a 24-hour timeframe.
- Finally, the RPS for the `admin-service` and `admin-client services` is configured at 1,000.

## AWS details

Selecting the best EC2 instance type for Flowify services depends on various factors such as the expected workload, resource requirements, and budget constraints.

Here's a general guideline for choosing EC2 instance types based on the services:

1. admin-service (Java, Docker):

Since Java applications can be resource-intensive, consider an instance type with a good balance of CPU and memory.
Instances from the "M5" or "C5" families are often suitable for Java-based services.
For example, "m5.large" or "c5.large" can be a good starting point.

2. admin-client (React, Nginx, Docker):

Nginx and React applications are generally less resource-intensive than backend services.
Instances from the "T2" or "T3" families, which offer burstable performance, might be suitable for the admin-client.
A "t3.micro" or "t3.small" could suffice for lower to moderate loads.

3. core-server (Node.js 18, Docker):

Node.js applications typically benefit from a good balance of CPU and memory.
Instances from the "M5" or "C5" families could work well here, similar to what we might choose for the admin-service.

4. core-ui (MaterialUI chat, Docker):

Like the admin-client, the core-ui might not require very high-end resources.
Consider "T2" or "T3" instances for this service, especially if the chat usage is not extremely high.

5. worker (TypeScript CLI, Docker):

The resource requirements for workers can vary widely based on the intensity of the work they perform.
If workers are processing heavy tasks, you might opt for instances from the "M5" or "C5" families, similar to the admin-service and core-server.
However, if they are primarily I/O bound, consider instances with higher I/O performance, like "I3" or "I4."

