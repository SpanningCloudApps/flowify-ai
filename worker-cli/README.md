# Worker CLI Documentation

## Authors

Andrei Kozel

## Introduction

Worker CLI used for automating user data actions within a workflow.
The CLI interacts with Amazon SQS (Simple Queue Service) to communicate with a client server.
The core functionality involves triggering workflows, publishing data for specific steps, and handling workflow progress, which is stored in a database.

### Workflow Listener Command

The Workflow Listener Command is a command-line tool designed to listen to workflow executions and interact with them.
This command is part of a larger system responsible for workflow automation and management.

## Installation

Before using the Workflow Listener Command, ensure that you have the following prerequisites in place:

- Node.js 18+ and npm installed on your system.
- Properly configured dependencies and services, such as databases and message queues.

## Usage

Running the Workflow Listener Command is straightforward.

Open your terminal and execute the following command:

```bash
export NODE_CONFIG_DIR=${AI_HOME}/worker-cli/config
./bin/run workflow-listener
```

Once executed, the Workflow Listener will start listening to incoming workflow events and manage their execution as per the defined business logic.

## Configuration

The Workflow Listener Command does not require any additional options or flags.
It is designed to be a straightforward and continuous process for listening to workflow executions.

- Ensure that all required services, including TimeScaleDB and SQS, are properly configured and running before starting the Workflow Listener.
- The Workflow Listener should run continuously to ensure it captures and processes incoming workflow events.
- Customization of the Workflow Listener's behavior can be achieved by modifying the underlying code and configuration files to align with your specific workflow automation needs.

## Workflow Progress

Workflow progress tracking is a crucial aspect of managing and automating workflows using Amazon SQS (Simple Queue Service).
This section explains how SQS can be leveraged to monitor and manage workflow progress effectively.

### Overview

SQS is a fully managed message queuing service provided by AWS.
It enables decoupled and distributed communication between various components of your workflow system.

By using SQS, you can achieve the following:

- **Workflow Initiation**: Start a workflow by placing a message in an SQS queue, triggering the workflow processing.
- **Step Execution**: Use SQS to communicate between workflow steps. Each step can send and receive messages, ensuring step-by-step execution.
- **Progress Monitoring**: Monitor the progress of workflows and individual steps by tracking messages in specific queues.
- **Error Handling**: Implement error-handling mechanisms by sending error messages to designated error queues for analysis and resolution.

### Workflow Progress Tracking

Tracking workflow progress involves monitoring messages in different SQS queues.

Here's a typical workflow progress flow:

1. **Workflow Initiation**

   A client or system places a message in a specific SQS queue (e.g., dev_workflow_requests) to initiate a workflow.
   The message contains metadata about the workflow, such as the workflow name and the actor initiating it.

2. **Step Execution**

   Workflow steps are processed sequentially.
   Each step sends and receives messages through designated SQS queues.
   Messages may contain instructions, data, or requests for user input.
   The workflow progresses as each step is completed, and messages move through the queues.

3. **Progress Monitoring**

   To monitor workflow progress, you can periodically poll specific SQS queues (e.g., dev_workflow_step_interaction_result) for new messages.
   Analyze the content of received messages to determine the current state of the workflow and its steps.

4. **Error Handling**

   In case of errors or exceptional scenarios, you can send error messages to dedicated error queues.
   Monitoring error queues helps identify issues that need attention and resolution.

### Benefits of SQS Workflow Progress Tracking

- **Reliability**: SQS ensures reliable message delivery, reducing the risk of message loss during workflow execution.
- **Scalability**: SQS scales automatically to handle varying message loads, making it suitable for workflows of any size.
- **Decoupling**: The decoupled nature of SQS allows for independent development and scaling of workflow components.
- **Visibility**: Real-time monitoring of messages provides visibility into workflow progress, making it easier to track and troubleshoot issues.

## Testing

To test the functionality of the Worker CLI, a Bash script[script.sh](script%2Fscript.sh) is provided.
This script allows you to simulate the triggering and interaction with workflows.

The available options include:

```
    --start-wf:   Simulate the initiation of a workflow.
    --publish-fn: Simulate publishing a full name for a workflow step interaction.
    --publish-cd: Simulate publishing a create data for a workflow step interaction.
```

You can use this Bash script to test the behavior of the Workflow in different scenarios.
