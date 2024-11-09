CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    client_type SMALLINT NOT NULL
);
CREATE TABLE IF NOT EXISTS publications (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    client_id INTEGER NOT NULL,
    publication_type SMALLINT NOT NULL,
    post_created TIMESTAMP NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id)
);
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL,
    client_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id)
);
CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS tags_publications_events(
    id SERIAL PRIMARY KEY,
    tag_id INTEGER NOT NULL,
    publication_id INTEGER,
    event_id INTEGER,
    FOREIGN KEY (tag_id) REFERENCES tags (id),
    FOREIGN KEY (publication_id) REFERENCES publications (id),
    FOREIGN KEY (event_id) REFERENCES events (id)
);
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    client_id INTEGER NOT NULL,
    publication_id INTEGER,
    event_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    FOREIGN KEY (publication_id) REFERENCES publications (id),
    FOREIGN KEY (event_id) REFERENCES events (id)
);
CREATE TABLE IF NOT EXISTS reactions (
    id SERIAL PRIMARY KEY,
    type SMALLINT NOT NULL,
    client_id INTEGER NOT NULL,
    publication_id INTEGER,
    event_id INTEGER,
    comment_id INTEGER,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    FOREIGN KEY (publication_id) REFERENCES publications (id),
    FOREIGN KEY (event_id) REFERENCES events (id),
    FOREIGN KEY (comment_id) REFERENCES comments (id)
);
CREATE TABLE IF NOT EXISTS reports (
    client_id INTEGER,
    publication_id INTEGER,
    event_id INTEGER,
    comment_id INTEGER,
    content TEXT,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    FOREIGN KEY (publication_id) REFERENCES publications (id),
    FOREIGN KEY (event_id) REFERENCES events (id),
    FOREIGN KEY (comment_id) REFERENCES comments (id)
);
CREATE TABLE IF NOT EXISTS bages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS clients_bages (
    client_id INTEGER NOT NULL,
    bage_id INTEGER NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients (id),
    FOREIGN KEY (bage_id) REFERENCES bages (id)
);
