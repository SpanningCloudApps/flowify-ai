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
- Finally, the RPS for the `admin-server` and `admin-client` services is configured at 1,000.

## AWS details

### EC2

Selecting the best EC2 instance type for Flowify services depends on various factors such as the expected workload, resource requirements, and budget constraints.

Here's a general guideline for choosing EC2 instance types based on the services:

1. admin-server (Java, Docker):

Since Java applications can be resource-intensive, consider an instance type with a good balance of CPU and memory.
Instances from the "M5" or "C5" families are often suitable for Java-based services.
For example, "m5.large" or "c5.large" can be a good starting point.

2. admin-client (React, Nginx, Docker):

Nginx and React applications are generally less resource-intensive than backend services.
Instances from the "T2" or "T3" families, which offer burstable performance, might be suitable for the admin-client.
A "t3.micro" or "t3.small" could suffice for lower to moderate loads.

3. core-server (Node.js 18, Docker):

Node.js applications typically benefit from a good balance of CPU and memory.
Instances from the "M5" or "C5" families could work well here, similar to what we might choose for the admin-server.

4. core-ui (MaterialUI chat, Docker):

Like the admin-client, the core-ui might not require very high-end resources.
Consider "T2" or "T3" instances for this service, especially if the chat usage is not extremely high.

5. worker (TypeScript CLI, Docker):

The resource requirements for workers can vary widely based on the intensity of the work they perform.
If workers are processing heavy tasks, you might opt for instances from the "M5" or "C5" families, similar to the admin-server and core-server.
However, if they are primarily I/O bound, consider instances with higher I/O performance, like "I3" or "I4."

Let's assume you have the following EC2 instance types running 24/7 for a month:

1. admin-server and core-server: "m5.large" (2 vCPUs, 8 GB RAM)
- On-Demand Price: Approximately $0.096 per hour per instance
- Monthly Cost (per instance): $0.096 x 24 hours/day x 30 days = $69.12 per instance

2. admin-client and core-ui: "t3.micro" (2 vCPUs, 1 GB RAM)
- On-Demand Price: Approximately $0.0108 per hour per instance
- Monthly Cost (per instance): $0.0108 x 24 hours/day x 30 days = $7.78 per instance

3. worker: "m5.large" (2 vCPUs, 8 GB RAM) or "i3.large" (2 vCPUs, 15.25 GB RAM) depending on the workload

Monthly Cost (per "m5.large" instance):
- On-Demand Price: Approximately $0.096 per hour per instance
- Monthly Cost (per instance): $0.096 x 24 hours/day x 30 days = $69.12 per instance

Monthly Cost (per "i3.large" instance):
- On-Demand Price: Approximately $$0.15 per hour per instance
- Monthly Cost (per instance): $$0.15 x 24 hours/day x 30 days = $108 per instance

**RPS: Request Per Second**

1.`core-ui`, `core-server` RPS is 5000

- Monthly cost for each instance (as calculated earlier): $69.12
- Total monthly cost for Core-UI and Core-Server: $69.12 x 2 = $138.24

Scaling: `core-ui`: 3 instances, `core-server`: from 3 to 15
- Total monthly cost for Core-UI: $69.12 * 3 = $207.36
- Total monthly cost for Core-Server: $69.12 * 15 = $1036.8

2. `worker` scaled based on SQS messages

- Monthly cost for each instance (as calculated earlier): $69.12 (m5.large)
- Total monthly cost for worker: $69.12 (m5.large) * 20 = $1382.4

3. `admin-server`, `admin-client` RPS is 1000

- Monthly cost for each instance (as calculated earlier): $7.78
- Total monthly cost for admin-server and Admin-Client: $7.78 x 2 = $15.56

Scaling: `admin-client`: 3 instances, `admin-server`: from 3 to 5
- Total monthly cost for Core-UI: $69.12 * 3 = $207.36
- Total monthly cost for Core-Server: $69.12 * 5 = $345.6

**Year: ($1036.8 + $1382.4 + $207.36 + $345.6) * 12 = 35,665.92$**

### SQS

4 SQS queue with 1 million messages per month in total.

`Total Requests Per Month = 1 million messages/queue x 4 queues = 4 million requests`

**Total request cost**

The first 1 million SQS requests per month are typically free (AWS Free Tier).
Beyond the free tier, the cost is $0.0000004 per request.

- Total Request Cost Per Month = (4 million - 1 million free requests) x $0.0000004/request
- Total Request Cost Per Month = 3 million x $0.0000004 = $1.20

**Year: $1.20 * 12 = 14.4$**

### RDS

**Database Instance**

Determine the instance type we plan to use for PostgreSQL database. This will have a significant impact on the cost.
Let's assume we choose a "db.m5.large" instance for this calculation.
The On-Demand price for a "db.m5.large" instance can vary depending on the AWS region, but for this example, let's assume it's approximately $0.175 per hour.

**Storage Volume**

The cost of storing 100GB of data in Amazon RDS depends on the storage class we choose. For Standard Magnetic storage (which is less expensive), the cost is around $0.115 per GB-month.

- Storage Cost Per Month = 100GB x $0.115/GB-month
- Storage Cost Per Month = $11.50

**Database Instance Cost**

Calculate the monthly cost for running the "db.m5.large" instance 24/7.

- Instance Cost Per Month = Hourly Price x Hours in a Day x Days in a Month
- Instance Cost Per Month = $0.175 x 24 hours/day x 30 days
- Instance Cost Per Month = $126 per instance per month

**Total Monthly Cost**

- Total Monthly Cost = Instance Cost Per Month + Storage Cost Per Month = $126 + $11.50 = $137.50

**Year: $137.50 * 12 = 1650$**

## OpenAI API

OpenAI's GPT-3 API with a billing rate of $0.0015 per 1,000 tokens for 4 million requests per month.

**4,000 Tokens = 4,000 units of texts or a sequences of characters that a language model reads and processes**

- Total Tokens = 4,000,000 requests x 4,000 tokens per request (4K context)
- Token Increments = Total Tokens / 1,000
- Cost for Token Increments = Token Increments * $0.0015 / 1,000 tokens
- Cost per Request = Cost for Token Increments / 4,000,000 requests

**Calculation**

- Total Tokens = 4,000,000 requests x 4,000 tokens per request = 16,000,000,000 tokens
- Token Increments = 16,000,000,000 tokens / 1,000 = 16,000,000 increments
- Cost for Token Increments = 16,000,000 increments * $0.0015 / 1,000 tokens = $24,000

- Cost per Request = $24,000 / 4,000,000 requests = $6 per request

- Monthly Cost = $6 per request x 4,000,000 requests per month = $24,000 per month
- Annual Cost = Monthly Cost x 12 months = $24,000 per month x 12 months = $288,000 per year

**Year: $24,000 * 12 = $288,000**

**BAD WAY: TO EXPENSIVE**

## Tensorflow

**Year: $0**

**GREAT WAY: SOLD**

# Final Yearly Price

**EC2**

- Year: ($1036.8 + $1382.4 + $207.36 + $345.6) * 12 = 35,665.92$

**SQS**

- Year: $1.20 * 12 = 14.4$

**RDS Postgres**

- Year: $137.50 * 12 = 1650$

**TENSORFLOW**

- Year: $0

---

**WORST when EC2 works 24/7 without autoscaling**

- **TOTAL:** 35,665.92$ + 14.4$ + 1650$ = 37,330.32$

**AVERAGE when EC2 works 24/7 with autoscaling**

- **TOTAL:** 17,836.96$ + 14.4$ + 1650$ = 19,501.36$
