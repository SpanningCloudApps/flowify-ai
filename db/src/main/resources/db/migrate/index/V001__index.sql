CREATE TABLE IF NOT EXISTS classification_result
(
    id            BIGSERIAL NOT NULL,
    input         JSONB     NOT NULL default '{}',
    workflow_name VARCHAR   NOT NULL,
    probability   FLOAT     NOT NULL,
    data          JSONB     NOT NULL default '{}',
    created_at    TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow
(
    id          BIGSERIAL NOT NULL,
    name        VARCHAR   NOT NULL,
    description VARCHAR   NOT NULL,
    data        JSONB     NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_step
(
    id          BIGSERIAL NOT NULL,
    workflow_id VARCHAR    NOT NULL,
    description VARCHAR   NOT NULL,
    title       VARCHAR   NOT NULL,
    type        VARCHAR   NOT NULL,
    ordinal     INTEGER   NOT NULL,
    data        JSONB     NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_execution
(
    id          BIGSERIAL NOT NULL,
    workflow_id BIGINT    NOT NULL,
    status      VARCHAR   NOT NULL,
    data        JSONB     NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_step_execution
(
    id                    BIGSERIAL NOT NULL,
    workflow_step_id      BIGINT    NOT NULL,
    workflow_execution_id BIGINT    NOT NULL,
    status                VARCHAR   NOT NULL,
    data                  JSONB     NOT NULL default '{}',
    created_at            TIMESTAMP NOT NULL default NOW()
);

INSERT INTO workflow (name, description)
VALUES ('ADD_USER', 'Adds new user to microsoft active directory');
INSERT INTO workflow_step (workflow_id, description, title, type, ordinal)
VALUES (1, 'Ask customer for user fullname', 'Ask customer for user fullname', 'ASK_FOR_FULL_NAME', 1);
INSERT INTO workflow_step (workflow_id, description, title, type, ordinal)
VALUES (1, 'Ask customer for create date', 'Ask customer for create date', 'ASK_ABOUT_THE_DATE', 2);
INSERT INTO workflow_step (workflow_id, description, title, type, ordinal)
VALUES (1, 'Create user base on previous data', 'Create user base on previous data', 'CREATE_AD_USER', 3);



