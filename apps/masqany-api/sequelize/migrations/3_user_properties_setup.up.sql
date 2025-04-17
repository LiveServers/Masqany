CREATE TABLE user_properties (
    user_id BIGINT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    property_id BIGINT NOT NULL REFERENCES property(id) ON DELETE CASCADE,
    UNIQUE (user_id, property_id),
    PRIMARY KEY (user_id, property_id)
);
