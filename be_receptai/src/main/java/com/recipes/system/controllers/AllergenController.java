package com.recipes.system.controllers;

import com.recipes.system.contracts.UserAllergenRequest;
import com.recipes.system.contracts.AllergenResponse;
import com.recipes.system.services.AllergenService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/allergens")
public class AllergenController {
    private final AllergenService allergenService;

    public AllergenController(AllergenService allergenService) {
        this.allergenService = allergenService;
    }

    @GetMapping(path = "/user/")
    public List<AllergenResponse> getUserAllergens(@RequestParam(name = "full", defaultValue = "false") boolean full) {
        return allergenService.getUserAllergens(full);
    }

    @PostMapping(path = "/user/")
    public void addUserAllergen(@RequestBody UserAllergenRequest request) {
        allergenService.addUserAllergen(request);
    }

    @DeleteMapping(path = "/user")
    public void deleteUserAllergen(@RequestParam(name = "id") Long id) {
        allergenService.deleteUserAllergen(id);
    }
}
