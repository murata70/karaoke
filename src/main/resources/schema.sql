CREATE TABLE IF NOT EXISTS recruitments(
    id SERIAL PRIMARY KEY, 
    user_id BIGINT NOT NULL,          -- 投稿者のID
    user_name VARCHAR(255),           -- 表示用の投稿者名
    title VARCHAR(255) NOT NULL,      -- 募集タイトル
    music_genre VARCHAR(100),         -- ジャンル
    event_date VARCHAR(100),          -- 日時
    location VARCHAR(255),            -- 場所
    comment TEXT                      -- 詳しい説明
);

