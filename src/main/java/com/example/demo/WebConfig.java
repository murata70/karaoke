package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // /api/から始まる全エンドポイントを対象
                        .allowedOrigins("http://localhost:5173") // Reactの開発サーバーを許可
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 許可するメソッド
                        .allowedHeaders("*"); // すべてのヘッダーを許可
            }
        };
    }
}