# FLOWIFY.CO

8/9/2023-9/9/2023

# Authors

- **admin/client:** Anton Bachykin
- **admin/server:** Ruslan Zianevich
- **worker-cli**: Andrei Kozel
- **core/ai**: Nikita Gurets
- **core/client**: Anton Bachykin
- **core/server**: Alina Glumova

# High Level architecture

![high_level_architecture.png](docs%2Fimg%2Fhigh_level_architecture.png)

# DB Structure

![db_structure.png](docs%2Fimg%2Fdb_structure.png)

# Modules

## Core

- [Worker CLI](worker-cli%2FREADME.md)
- [Communication Hub](core%2Fserver%2FREADME.md)
- [Flowify ChatBot](core%2Fclient%2FREADME.md)

## Administration Panel

- [Server](admin%2Fserver%2FREADME.md)
- [Client](admin%2Fclient%2FREADME.md)

## Database Migration Tool

First run need to run:

```
./dev-setup/run-service-local --init-dbs
```

If you want to run just a migration, use:
```
./dev-setup/run-service-local --run-db-migrations
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

