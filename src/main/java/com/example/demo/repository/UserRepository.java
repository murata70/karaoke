package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.User;

// ↓ ここが 「public class」 ではなく 「public interface」 になっているのが正解です！
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
}