package com.example.demo.controller;

import com.example.demo.model.CartItem;
import com.example.demo.model.User;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/")
public class TemplateController {

    @Autowired
    private UserRepository userRepository;



    @GetMapping("*")
    public String getIndexView() {
        return "index";
    }

    @GetMapping("/home")
    public String getSessionData(HttpSession session) {

        /*Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(auth.getName());

        User user = userRepository.findByEmail(auth.getName());
        System.out.println(user);

        session.setAttribute("preference",user.getPreference());
        System.out.println((String)session.getAttribute("preference"));*/

        return "index";
    }

}
