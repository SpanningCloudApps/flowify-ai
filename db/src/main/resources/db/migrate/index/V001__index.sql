CREATE TABLE IF NOT EXISTS classification_result
(
    id            BIGSERIAL NOT NULL,
    input         JSONB     NOT NULL default '{}',
    workflow_name VARCHAR   NOT NULL,
    probability   FLOAT     NOT NULL,
    data          JSONB     NOT NULL default '{}',
    created_at    TIMESTAMP NOT NULL default NOW()
);
ALTER TABLE classification_result
    ADD PRIMARY KEY (id);

CREATE INDEX CONCURRENTLY IF NOT EXISTS cr_w ON classification_result (workflow_name);

CREATE TABLE IF NOT EXISTS workflow
(
    id          BIGSERIAL NOT NULL,
    name        VARCHAR   NOT NULL,
    description VARCHAR   NOT NULL,
    data        JSONB     NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE UNIQUE INDEX CONCURRENTLY IF NOT EXISTS w_n ON workflow (name);

CREATE TABLE IF NOT EXISTS workflow_step
(
    id          BIGSERIAL NOT NULL,
    workflow_id VARCHAR   NOT NULL,
    description VARCHAR   NOT NULL,
    title       VARCHAR   NOT NULL,
    type        VARCHAR   NOT NULL,
    ordinal     INTEGER   NOT NULL,
    data        JSONB     NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_execution
(
    id            BIGSERIAL NOT NULL,
    workflow_name VARCHAR   NOT NULL,
    status        VARCHAR   NOT NULL,
    step          VARCHAR   NOT NULL,
    data          JSONB     NOT NULL default '{}',
    created_at    TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_step_execution
(
    id                    BIGSERIAL NOT NULL,
    workflow_step_id      BIGINT    NOT NULL,
    workflow_execution_id BIGINT    NOT NULL,
    status                VARCHAR   NOT NULL,
    type                  VARCHAR   NOT NULL,
    data                  JSONB     NOT NULL default '{}',
    created_at            TIMESTAMP NOT NULL default NOW()
);


DELETE FROM workflow;
INSERT INTO workflow (name, description)
VALUES ('UNKNOWN', 'Can not find solution');
INSERT INTO workflow (name, description)
VALUES ('ADD_USER', 'Adds new user to microsoft active directory');
INSERT INTO workflow_step (workflow_id, description, title, type, ordinal)
VALUES ('ADD_USER', 'Ask customer for user fullname', 'Ask customer for user fullname', 'ASK_FOR_FULL_NAME', 1);
INSERT INTO workflow_step (workflow_id, description, title, type, ordinal)
VALUES ('ADD_USER', 'Ask customer for create date', 'Ask customer for create date', 'ASK_ABOUT_THE_DATE', 2);
INSERT INTO workflow_step (workflow_id, description, title, type, ordinal)
VALUES ('ADD_USER', 'Create user base on previous data', 'Create user base on previous data', 'CREATE_AD_USER', 3);

DELETE FROM classification_result;
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 1", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 2", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 98.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 3", "additionalInfo": ["item1", "item2"]}', 'UNKNOWN', 0, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 4", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 5", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 6", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 7", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 8" , "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ('{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 9", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 10", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 11", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 12", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 13", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting 14", "additionalInfo": ["item1", "item2"]}', 'UNKNOWN', 0, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "nikita@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SOC-1222212", "createdBy": "andryw@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12134412", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SOC-1223", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-19992", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-121234", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-143322", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-132322", "createdBy": "nikita@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-182", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-172", "createdBy": "andryw@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-102", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-142", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-122", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-1224", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "Search-12", "createdBy": "nikita@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "Title-12", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "JJ-12", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SS-12", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-1112", "createdBy": "alina@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'UNKNOWN', 0, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-1442", "createdBy": "nikita@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-12", "createdBy": "max@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-102", "createdBy": "jeka@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-132", "createdBy": "anton@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'UNKNOWN', 0, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SGC-122", "createdBy": "ruslan@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
INSERT INTO classification_result (input, workflow_name, probability, data, created_at) VALUES ( '{"title": "SOC-122", "createdBy": "andryw@email.com", "description": "Some interesting", "additionalInfo": ["item1", "item2"]}', 'ADD_USER', 99.013, '{}', '2023-09-08 17:57:25.108141');
