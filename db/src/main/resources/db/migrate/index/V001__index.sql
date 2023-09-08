CREATE TABLE IF NOT EXISTS classification_result
(
    id          BIGSERIAL NOT NULL,
    input       VARCHAR   NOT NULL,
    workflow_id VARCHAR   NOT NULL,
    probability FLOAT     NOT NULL,
    data        JSONB NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow
(
    id          BIGSERIAL NOT NULL,
    name        VARCHAR   NOT NULL,
    description VARCHAR   NOT NULL,
    data        JSONB NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_execution
(
    id          BIGSERIAL NOT NULL,
    workflow_id BIGINT   NOT NULL,
    status      VARCHAR   NOT NULL,
    data        JSONB NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_step_execution
(
    id          BIGSERIAL NOT NULL,
    workflow_step_id BIGINT   NOT NULL,
    workflow_execution_id BIGINT   NOT NULL,
    status      VARCHAR   NOT NULL,
    data        JSONB NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);

CREATE TABLE IF NOT EXISTS workflow_step
(
    id          BIGSERIAL NOT NULL,
    workflow_id BIGINT   NOT NULL,
    description VARCHAR   NOT NULL,
    title       VARCHAR   NOT NULL,
    data        JSONB NOT NULL default '{}',
    created_at  TIMESTAMP NOT NULL default NOW()
);



