package com.phuongthao.springbootlibrary.service;

import com.phuongthao.springbootlibrary.dao.CheckoutRepository;
import com.phuongthao.springbootlibrary.entity.Checkout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    public List<Checkout> getBooksDueSoon(String userEmail) {
        // Tính ngày hạn gần nhất (3 ngày trước hạn trả)
        LocalDate thresholdDate = LocalDate.now().plusDays(3);
        String formattedDate = thresholdDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Lấy danh sách sách sắp đến hạn trả cho người dùng cụ thể
        return checkoutRepository.findDueSoonBooksForUser(formattedDate, userEmail);
    }

}
