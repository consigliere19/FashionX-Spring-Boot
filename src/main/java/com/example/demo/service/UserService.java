package com.example.demo.service;

import com.example.demo.controller.dto.UserRegistrationDto;
import com.example.demo.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User save(UserRegistrationDto registrationDto);
}