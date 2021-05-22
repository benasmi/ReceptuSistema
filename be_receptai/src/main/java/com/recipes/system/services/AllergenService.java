package com.recipes.system.services;

import com.recipes.system.contracts.AllergenResponse;
import com.recipes.system.contracts.EditAllergenRequest;
import com.recipes.system.contracts.UserAllergenRequest;
import com.recipes.system.contracts.UserAllergenResponse;
import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.UserModel;
import com.recipes.system.repository.AllergenRepository;
import com.recipes.system.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AllergenService {
    private final AllergenRepository allergenRepository;
    private final AuthService authService;
    private final UserRepository userRepository;

    public AllergenService(AllergenRepository allergenRepository, AuthService authService, UserRepository userRepository) {
        this.allergenRepository = allergenRepository;
        this.authService = authService;
        this.userRepository = userRepository;
    }

    public List<AllergenResponse> getAllergens() {
        List<AllergenModel> allergenModels = allergenRepository.findAll();
        return allergenModels.
                stream()
                .map(AllergenResponse::fromAllergenModel)
                .collect(Collectors.toList());
    }

    public List<UserAllergenResponse> getUserAllergens() {
        UserModel user = authService.getCurrentUser();

        List<UserAllergenResponse> allergens = user.getUserAllergens().stream()
                .map(x -> UserAllergenResponse
                        .fromAllergenModel(x.getAllergene().getId(), x.getAllergene().getName(), x.getIntensity()))
                        .collect(Collectors.toList());
        return allergens;
    }

    public boolean isUserAllergensListEmpty() {
        UserModel user = authService.getCurrentUser();
        return user.getUserAllergens().isEmpty();
    }

    public void addUserAllergen(UserAllergenRequest request){
        UserModel user = authService.getCurrentUser();
        AllergenModel allergenModel = allergenRepository.findById(request.getId()).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Allergen does not exist");
        });
        user.addUserAllergen(allergenModel, request.getIntensity());
        userRepository.save(user);
    }

    public void deleteUserAllergen(Long allergenId) {
        UserModel user = authService.getCurrentUser();
        if (user.getUserAllergens().stream().anyMatch(x -> x.getAllergene().getId() == allergenId) == false) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Allergen does not exist");
        }
        user.deleteAllergen(allergenId);
        userRepository.save(user);
    }

    public void editUserAllergen(Long allergenId, EditAllergenRequest editItem) {
        AllergenModel allergen = allergenRepository.findById(allergenId).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Allergen does not exist");
        });
        UserModel user = authService.getCurrentUser();
        user.editUserallergen(allergen, editItem.getIntensity());
        userRepository.save(user);
    }
}
