package com.example.demo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    // イベントごとに、新しい順（または古い順）でコメントを取得する
    List<Comment> findByEventIdOrderByCreatedAtAsc(Long eventId);
    
    // ホーム画面用に最新の数件を取得する（今後使います）
    List<Comment> findTop5ByOrderByCreatedAtDesc();
}