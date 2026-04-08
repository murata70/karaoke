-- 既存のUser登録
INSERT INTO users (nickname, email, password_hash, music_genre, favorite_artist, birth_date) 
VALUES 
('デモユーザー', 'demo@example.com', 'pass123', 'J-POP', '米津玄師', '1990-01-01'),
('アニソン好き', 'ani@example.com', 'pass123', 'アニソン', 'LiSA', '2000-01-01')
ON CONFLICT (email) DO NOTHING;

-- 既存のコメント登録
INSERT INTO comments (event_id, user_name, content, created_at, confirmed) 
VALUES 
(1, '奈央', '[5/10 梅田] 5分ほど遅れます、すみません！', CURRENT_TIMESTAMP, true),
(1, '田中', '[5/10 梅田] 了解です！お気をつけて。', CURRENT_TIMESTAMP, false)
ON CONFLICT DO NOTHING;

-- 【修正点】募集のテストデータ (PostgreSQL対応)
-- idを明示的に指定せず、SERIALによる自動採番に任せるのが一番安全です
INSERT INTO recruitments (user_id, user_name, title, music_genre, event_date, location, comment) 
VALUES 
(1, 'デモユーザー', '米津玄師を一緒に歌いましょう！', 'J-POP', '2026-05-20 18:00', '梅田・天王寺周辺', '最近の曲から昔の曲まで、楽しく歌える方募集中です！'),
(2, 'アニソン好き', '最新アニソン縛りのカラオケ会', 'アニソン', '2026-05-25 19:00', '難波周辺', '今期の推しアニメの曲を全力で歌いたい人、集まれ！');