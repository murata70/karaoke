package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// ↓ ここが 「public class」 ではなく 「public interface」 になっているのが正解です！
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
}