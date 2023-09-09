# DB Migration Scripts

## PostgreSQL

### Migration Scripts
To add new migration scripts add sql files to the directory db/src/main/resources/db/migrate/[database] with the
following naming convention:
```
VXXX__<schema>.sql
```
where 'XXX' is a version number such as '001' (ex: ```V001__index.sql```, ```V002__index.sql```, etc), and <database>
the corresponding database.

### Migration

To execute a migration, after the project is build, from <AI_HOME> run:
```
${AI_HOME}/scripts/run-db-migration.sh
```

If you need to change database configuration, specify a file path:

```
${AI_HOME}/scripts/run-db-migration.sh ${PATH_TO_FILE}
```
