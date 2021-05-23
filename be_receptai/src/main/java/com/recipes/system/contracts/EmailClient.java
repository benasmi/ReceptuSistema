package com.recipes.system.contracts;

import lombok.Data;

@Data
public class EmailClient {
    private String name;
    private String email;

    public EmailClient(String name, String email) {
        this.name = name;
        this.email = email;
    }
}
