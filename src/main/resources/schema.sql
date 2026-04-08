-- 1. Usersテーブル（基本情報）
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    event_id BIGINT,
    user_name VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    confirmed BOOLEAN DEFAULT FALSE
);