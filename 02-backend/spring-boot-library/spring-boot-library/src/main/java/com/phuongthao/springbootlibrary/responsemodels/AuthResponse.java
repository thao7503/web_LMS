
package com.phuongthao.springbootlibrary.responsemodels;

import com.phuongthao.springbootlibrary.entity.User;
import lombok.Data;

public class AuthResponse {
    private String token;
    private User user;

    // Constructor, Getters and Setters
}
