package com.recipes.system.contracts;
import lombok.Data;

@Data
public class JwtResponse {
    private String jwtToken;

    public JwtResponse(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public JwtResponse(){

    }

}