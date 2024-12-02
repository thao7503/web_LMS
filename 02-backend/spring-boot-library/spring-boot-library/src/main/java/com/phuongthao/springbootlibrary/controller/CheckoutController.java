package com.phuongthao.springbootlibrary.controller;

import com.phuongthao.springbootlibrary.entity.Checkout;
import com.phuongthao.springbootlibrary.service.CheckoutService;
import com.phuongthao.springbootlibrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/checkouts")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @GetMapping("/due-soon")
    public ResponseEntity<List<Checkout>> getBooksDueSoon(@RequestHeader(value = "Authorization") String token) {
        try {
            // Extract user email from the JWT token
            String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

            // Fetch due soon books for the logged-in user
            List<Checkout> dueSoonBooks = checkoutService.getBooksDueSoon(userEmail);
            return ResponseEntity.ok(dueSoonBooks);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
}
