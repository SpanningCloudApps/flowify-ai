# hackathon-ai
8/9/2023-9/9/2023

# Authors

- **client:** Anton Bachykin
- **server:** Ruslan Zianevich
- **worker**: Andrei Kozel
- **ai**: Nikita Gurets
- **client**: Anton Bachykin
- **server**: Alina Glumova


# High Level architecture

![high_level_architecture.png](docs%2Fimg%2Fhigh_level_architecture.png)

# DB Structure

![db_structure.png](docs%2Fimg%2Fdb_structure.png)


### Database Migration Tool

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

