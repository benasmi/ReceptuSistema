package com.recipes.system.services;

import com.recipes.system.contracts.UserAllergenRequest;
import com.recipes.system.contracts.AllergenResponse;
import com.recipes.system.models.AllergenModel;
import com.recipes.system.models.UserAllergenModel;
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

    public List<AllergenResponse> getUserAllergens(boolean full) {
        UserModel user = authService.getCurrentUser();
        List<AllergenModel> allergenModels = user.getUserAllergens()
                .stream()
                .filter(x -> x.getUser().getId() == user.getId())
                .map(UserAllergenModel::getAllergene)
                .collect(Collectors.toList());
        List<AllergenResponse> allergens = allergenModels.stream()
                .map(AllergenResponse::fromAllergenModel).collect(Collectors.toList());
        return allergens;
    }

    public void addUserAllergen(UserAllergenRequest request){
        UserModel user = authService.getCurrentUser();
        if (allergenRepository.existsById(request.getId()) == false) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Allergen does not exist");
        }
        AllergenModel allergenModel = UserAllergenRequest.fromAllergenRequest(request);
        user.addUserAllergen(allergenModel);
        userRepository.save(user);
    }

    public void deleteUserAllergen(Long allergen_id) {
        UserModel user = authService.getCurrentUser();
        if (user.getUserAllergens().stream().anyMatch(x -> x.getAllergene().getId() == allergen_id) == false) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Allergen does not exist");
        }
        user.deleteAllergen(allergen_id);
        userRepository.save(user);
    }
}
