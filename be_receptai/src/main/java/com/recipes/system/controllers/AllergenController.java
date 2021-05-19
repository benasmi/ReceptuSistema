package com.recipes.system.controllers;

import com.recipes.system.contracts.EditAllergenRequest;
import com.recipes.system.contracts.UserAllergenRequest;
import com.recipes.system.contracts.AllergenResponse;
import com.recipes.system.contracts.UserAllergenResponse;
import com.recipes.system.models.AllergenModel;
import com.recipes.system.services.AllergenService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/allergens")
public class AllergenController {
    private final AllergenService allergenService;

    public AllergenController(AllergenService allergenService) {
        this.allergenService = allergenService;
    }

    @GetMapping(path="/")
    public List<AllergenResponse> getAllergens() {
        return allergenService.getAllergens();
    }

    @GetMapping(path = "/user/")
    public List<UserAllergenResponse> getUserAllergens() {
        return allergenService.getUserAllergens();
    }

    @PostMapping(path = "/user/")
    public void addUserAllergen(@RequestBody UserAllergenRequest request) {
        allergenService.addUserAllergen(request);
    }

    @DeleteMapping(path = "/user/{id}")
    public void deleteUserAllergen(@PathVariable Long id) {
        allergenService.deleteUserAllergen(id);
    }

    @PutMapping(path = "/user/{id}")
    public void editUserAllergen(@PathVariable Long id, @RequestBody EditAllergenRequest editItem) {
        allergenService.editUserAllergen(id, editItem);
    }

}
