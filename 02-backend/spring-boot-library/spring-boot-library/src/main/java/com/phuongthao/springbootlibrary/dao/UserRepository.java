package com.phuongthao.springbootlibrary.dao;

import com.phuongthao.springbootlibrary.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Tìm người dùng theo tên đăng nhập (username)
    Optional<User> findByUsername(@RequestParam("username") String username);

    // Phân trang tìm người dùng theo role
    Page<User> findByRole(@RequestParam("role") String role, Pageable pageable);

    // Truy vấn người dùng theo một danh sách id
    @Query("select u from User u where u.id in :user_ids")
    List<User> findUsersByUserIds(@Param("user_ids") List<Long> userIds);
}
