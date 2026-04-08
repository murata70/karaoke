package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping; // これを追加！
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Comment;
import com.example.demo.repository.CommentRepository;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5173") 
public class CommentController {
    private final CommentRepository repository;

    public CommentController(CommentRepository repository) {
        this.repository = repository;
    }

    // コメント一覧取得
    @GetMapping("/{eventId}")
    public List<Comment> getComments(@PathVariable Long eventId) {
        // ※ここをOrderByCreatedAtDescに書き換えると最新順になります！
        return repository.findByEventIdOrderByCreatedAtDesc(eventId);
    }

    // コメント投稿（新規作成）
    @PostMapping
    public Comment addComment(@RequestBody Comment comment) {
        comment.setCreatedAt(java.time.LocalDateTime.now());
        return repository.save(comment);
    }

    // コメント更新（「確認済」フラグだけを書き換える）
    @PatchMapping("/{id}/confirm") // 追加：/{id} はコメントのIDを受け取るという意味
    public Comment confirmComment(@PathVariable Long id) {
        // idを元にDBから検索し、なければエラーを投げる
        Comment comment = repository.findById(id).orElseThrow();
        // フラグをtrueに書き換える
        comment.setConfirmed(true);
        // 保存（上書き）して返す
        return repository.save(comment);
    }
}