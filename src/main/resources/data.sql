-- 重複エラー回避のため、emailが衝突した場合は何もしない設定
INSERT INTO users (nickname, email, password_hash, music_genre, favorite_artist, birth_date) 
VALUES 
('デモユーザー', 'demo@example.com', 'pass123', 'J-POP', '米津玄師', '1990-01-01'),
('アニソン好き', 'ani@example.com', 'pass123', 'アニソン', 'LiSA', '2000-01-01')
ON CONFLICT (email) DO NOTHING;
-- 既存のUser登録の後に追記
INSERT INTO comments (event_id, user_name, content, created_at, confirmed) 
VALUES 
(1, '奈央', '[5/10 梅田] 5分ほど遅れます、すみません！', CURRENT_TIMESTAMP, true),
(1, '田中', '[5/10 梅田] 了解です！お気をつけて。', CURRENT_TIMESTAMP, false)
ON CONFLICT DO NOTHING;