package com.luizmontuani.kubecluster;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/hello/{nome}")
    public String helloNome(@PathVariable String nome) {
        return "Hello World, " + nome;
    }
}