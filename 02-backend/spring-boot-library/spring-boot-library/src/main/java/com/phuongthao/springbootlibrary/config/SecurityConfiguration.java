package com.phuongthao.springbootlibrary.config;

import com.phuongthao.springbootlibrary.dao.UserRepository;
import com.phuongthao.springbootlibrary.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final UserRepository userRepository;

    public SecurityConfiguration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Cấu hình UserDetailsService để lấy thông tin người dùng từ MySQL database
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRole()) // Role được lưu trong database
                    .build();
        };
    }

    // Cấu hình PasswordEncoder sử dụng BCrypt để mã hóa mật khẩu
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // Cấu hình SecurityFilterChain
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable CSRF (nếu không cần thiết cho REST API)
        http.csrf().disable();

        // Cấu hình các endpoint cần xác thực và cho phép
        http.authorizeRequests(configurer ->
                        configurer
                                .antMatchers("/auth/**").permitAll() // Các endpoint đăng ký, đăng nhập
                                .antMatchers("/api/books/secure/**",
                                        "/api/reviews/secure/**",
                                        "/api/messages/secure/**",
                                        "/api/admin/secure/**")
                                .authenticated() // Yêu cầu xác thực với các endpoint secure
                                .antMatchers("/api/**").permitAll()) // Cho phép truy cập các endpoint khác
                .formLogin() // Cấu hình form login
                .loginPage("/login") // Tùy chọn: Tạo trang login tùy chỉnh nếu cần
                .permitAll()
                .and()
                .logout() // Cấu hình logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .permitAll()
                .and()
                .httpBasic(); // Xác thực cơ bản (Basic Auth)

        // Thêm cấu hình CORS nếu cần
        http.cors();

        return http.build();
    }
}
