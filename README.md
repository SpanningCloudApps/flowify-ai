# [FLOWIFY.CO](http://flowify-ai.s3-website-us-east-1.amazonaws.com/)

8/9/2023-9/9/2023

# Maintainers

- **admin/client:** [Anton Bachykin](https://github.com/DenyingTheTruth)
- **admin/server:** [Ruslan Zianevich](https://github.com/ruslanzianevich)
- **worker-cli**: [Andrei Kozel](https://github.com/andrey-kozel)
- **core/server/ai**: [Nikita Gurets](https://github.com/StepanBURNdera)
- **core/client**: [Anton Bachykin](https://github.com/DenyingTheTruth)
- **core/server**: [Alina Glumova](https://github.com/aglumova)

Open to [CONTRIBUTING](.github%2FCONTRIBUTING.md)

# Modules

## Core

- [Worker CLI](worker-cli%2FREADME.md)
- [Communication Hub](core%2Fserver%2FREADME.md)
- [Communication Hub AI](core%2Fserver%2Fsrc%2Fai%2FREADME.md)
- [Flowify ChatBot](core%2Fclient%2FREADME.md)

## Administration Panel

- [Server](admin%2Fserver%2FREADME.md)
- [Client](admin%2Fclient%2FREADME.md)

## Database Migration Tool

- [DB Migration](db%2FREADME.md)

# High Level architecture

![high_level_architecture.png](docs%2Fimg%2Fhigh_level_architecture.png)

# DB Structure

![db_structure.png](docs%2Fimg%2Fdb_structure.png)

# Billing Model

[Billing Model](BILLIING_MODEL.md)

### Migration

First run need to run:

```bash
${AI_HOME}/scripts/run-service-local --init-dbs
```

If you want to run just a migration, use:
```bash
${AI_HOME}/scripts/run-service-local --run-db-migrations
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
            <td>AI_HOME</td>
            <td>Root path of project</td>
            <td>String</td>
            <td> - </td>
        </tr>
    </tbody>
</table>

