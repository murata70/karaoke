package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Recruitment;
import com.example.demo.repository.RecruitmentRepository;

@RestController
@RequestMapping("/api/recruitments")
@CrossOrigin(origins = "http://localhost:3000") // Reactとの接続許可
public class RecruitmentController {

    @Autowired
    private RecruitmentRepository repository;

    // 全募集リストを取得
    @GetMapping
    public List<Recruitment> getAllRecruitments() {
        return repository.findAll();
    }

    // 募集を新規投稿する
    @PostMapping
    public Recruitment createRecruitment(@RequestBody Recruitment recruitment) {
        return repository.save(recruitment);
    }
}