package com.recipes.system.services;

import com.recipes.system.contracts.*;
import com.recipes.system.mappers.RecipeModelMapper;
import com.recipes.system.models.*;
import com.recipes.system.repository.ProductRepository;
import com.recipes.system.repository.RecipeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;


@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ProductRepository productRepository;
    private final AuthService authService;
    private final RecipeModelMapper recipeModelMapper;
    private final ProductService productService;
    private final UserService userService;
    private final AllergenService allergenService;

    public RecipeService(RecipeRepository recipeRepository,
                         ProductRepository productRepository,
                         AuthService authService,
                         RecipeModelMapper recipeModelMapper,
                         ProductService productService,
                         UserService userService,
                         AllergenService allergenService) {
        this.recipeRepository = recipeRepository;
        this.productRepository = productRepository;
        this.authService = authService;
        this.recipeModelMapper = recipeModelMapper;
        this.productService = productService;
        this.userService = userService;
        this.allergenService = allergenService;
    }

    public List<RecipeResponse> getRecipes(boolean full) {
        List<RecipeModel> userRecipes = recipeRepository.findAll();
        List<RecipeResponse> recipes;

        recipes = userRecipes.stream()
                .map(full ? RecipeResponse::fromRecipeProducts : RecipeResponse::headerFromRecipeProducts)
                .collect(Collectors.toList());

        return recipes;
    }

    public void addRecipe(RecipeRequest request) {
        UserModel user = authService.getCurrentUser();

        RecipeModel recipeModel = RecipeRequest.fromRecipeRequest(request);
        recipeModel.setUser(user);

        request.getProducts().forEach(it -> {
            ProductModel product = productRepository.findById(it.getId()).orElseThrow(() -> {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product does not exists");
            });

            recipeModel.addProductsToRecipe(product, new QuantityRequest(it.getQuantity(), it.getQuantityType()));
        });

        recipeRepository.save(recipeModel);
    }

    private RecipeModel getRecipeById(Long id) {
        return recipeRepository.findById(id).orElseThrow(() -> {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Recipe does not exist");
        });
    }

    private void checkIfOwner(UserModel user, RecipeModel recipe) {
        if (!recipe.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Only owner can edit his recipe");
        }
    }

    public RecipeResponse getRecipe(Long id) {
        RecipeModel recipe = getRecipeById(id);
        return RecipeResponse.fromRecipeProducts(recipe);
    }


    public List<RecipeResponse> getUserRecipes(boolean full) {
        UserModel user = authService.getCurrentUser();

        List<RecipeModel> userRecipes = recipeRepository.findAllByUser(user);
        List<RecipeResponse> recipes;

        recipes = userRecipes.stream()
                .map(full ? RecipeResponse::fromRecipeProducts : RecipeResponse::headerFromRecipeProducts)
                .collect(Collectors.toList());

        return recipes;
    }

    public RecipeModel updateRecipe(Long id, RecipeRequest recipeRequest) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);

//        recipeModelMapper.updateRecipeFromDto(recipeRequest, recipe);
        //todo: fix recipeModelMapper, somewhy not working
        recipe.setTitle(recipeRequest.getTitle());
        recipe.setDescription(recipeRequest.getDescription());
        recipe.setPrice(recipeRequest.getPrice());
        recipe.setDifficulty(recipeRequest.getDifficulty());
        recipe.setImageUrl(recipeRequest.getImageUrl());
        recipe.setTimeRequired(recipeRequest.getTimeRequired());

        return recipeRepository.save(recipe);
    }

    public void deleteRecipe(Long id) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);

        recipe.setUser(null);
        recipe.removeAllProducts();

        recipeRepository.delete(recipe);
    }

    public void addProducts(Long id, List<ProductRecipeRequest> products) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);

        List<ProductModel> productModels = productRepository.findByIdIn(
                products.stream()
                        .map(ProductRecipeRequest::getId)
                        .collect(Collectors.toList())
        );

        Iterator<ProductRecipeRequest> it1 = products.iterator();
        Iterator<ProductModel> it2 = productModels.iterator();

        while (it1.hasNext() && it2.hasNext()) {
            recipe.addProductsToRecipe(it2.next(), it1.next());
        }

        recipeRepository.save(recipe);
    }

    public void removeProducts(Long id, List<Long> productsIds) {
        UserModel user = authService.getCurrentUser();
        RecipeModel recipe = getRecipeById(id);

        checkIfOwner(user, recipe);


        productsIds.forEach(recipe::deleteProduct);
        recipeRepository.save(recipe);
    }

    public RecipePage getRecipePage(int page, int size, Optional<RecipeModel.Difficulty> difficulty, Optional<RecipeModel.Price> price) {
        Pageable paging = PageRequest.of(page, size);
        Specification<RecipeModel> spec = Specification
                .where(RecipeFilters.difficultyEquals(difficulty))
                .and(RecipeFilters.priceEquals(price));
        Page<RecipeModel> recipeModelsPage = recipeRepository.findAll(spec, paging);
        List<RecipeResponse> recipes = recipeModelsPage
                .getContent()
                .stream()
                .map(RecipeResponse::headerFromRecipeProducts)
                .collect(Collectors.toList());

        return new RecipePage(recipes,
                recipeModelsPage.getNumber(),
                recipeModelsPage.getTotalElements(),
                recipeModelsPage.getTotalPages()
        );
    }

    public List<RecipeResponse> recommendRecipes() {
        final List<RecipeModel> recipesByUserProducts = new ArrayList<>();
        final List<RecipeModel> recipesByEatingHabits = new ArrayList<>();
        final List<RecipeModel> recipesByAllergens = new ArrayList<>();

        List<Thread> threads = new ArrayList<>();
        threads.add(new Thread(() -> {
            if (productService.isUserProductsListEmpty()) {
                recipesByUserProducts.addAll(recipeRepository.findAll());
            } else {
                recipesByUserProducts.addAll(filterByUserProducts());
            }
        }));

        threads.add(new Thread(() -> {
            if (allergenService.isUserAllergensListEmpty()) {
                recipesByAllergens.addAll(recipeRepository.findAll());
            } else {
                recipesByAllergens.addAll(filterByAllergens());
            }
        }));

        threads.add(new Thread(() -> {
            if (userService.isEatingHabitsListEmpty()) {
                recipesByEatingHabits.addAll(recipeRepository.findAll());
            } else {
                recipesByEatingHabits.addAll(filterByEatingHabits());
            }
        }));

        threads.forEach(Thread::start);
        threads.forEach(t -> {
            try {
                t.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });

        return recipesByUserProducts
                .stream()
                .filter(recipesByEatingHabits::contains)
                .filter(recipesByAllergens::contains)
                .map(RecipeResponse::fromRecipeProducts)
                .collect(Collectors.toList());
    }

    private List<RecipeModel> filterByUserProducts() {
        UserModel user = authService.getCurrentUser();
        List<ProductModel> userProducts = user.getUserProducts()
                .stream()
                .map(UserProductModel::getProduct)
                .collect(Collectors.toList());
        List<RecipeModel> recipes = recipeRepository.findAll();

        return recipes
                .stream()
                // receptai
                .filter(x -> userProducts
                        .stream()
                        .map(ProductModel::getId)
                        .collect(Collectors.toList()).containsAll(x.getProductRecipeList()
                                .stream()
                                // vieno recepto produktai
                                .map(y -> y.getProduct().getId())
                                .collect(Collectors.toList())))
                .collect(Collectors.toList());
    }

    private List<RecipeModel> filterByEatingHabits() {
        UserModel user = authService.getCurrentUser();

        List<EatingHabitModel> userHabits = user
                .getUserEatingHabits()
                .stream()
                .map(UserEatingHabitModel::getHabit)
                .collect(Collectors.toList());

        List<ProductModel> habitProducts = new ArrayList<>();
        for (var userHabit : userHabits) {
            var habitCategoryModels = userHabit.getProductCategories();
            var productCategoryModels = habitCategoryModels.
                    stream()
                    .map(HabitCategoryModel::getProductCategory)
                    .collect(Collectors.toList());
            habitProducts.addAll(productCategoryModels
                    .stream()
                    .flatMap(x -> x.getProducts().stream())
                    .collect(Collectors.toList()));
        }

        List<RecipeModel> recipes = recipeRepository.findAll();

        return recipes
                .stream()
                // receptai
                .filter(x -> habitProducts
                        .stream()
                        .map(ProductModel::getId)
                        .collect(Collectors.toList())
                        .containsAll(x.getProductRecipeList()
                                .stream()
                                // vieno recepto produktai
                                .map(y -> y.getProduct().getId())
                                .collect(Collectors.toList()))
                )
                .collect(Collectors.toList());
    }

    private List<RecipeModel> filterByAllergens() {
        UserModel user = authService.getCurrentUser();
        List<RecipeModel> recipes = recipeRepository.findAll();
        List<Long> userAllergensIds = user.getUserAllergens()
                .stream()
                .map(UserAllergenModel::getAllergene)
                .map(AllergenModel::getId)
                .collect(Collectors.toList());
        return recipes
                .stream()
                .filter(r -> {
                    var recipeAllergenIds = r.getProductRecipeList()
                            .stream()
                            .flatMap(x -> x.getProduct()
                                    .getProductAllergens()
                                    .stream()
                                    .map(y -> y.getAllergene().getId()))
                            .collect(Collectors.toList());
                    return recipeAllergenIds.stream().noneMatch(userAllergensIds::contains);
                })
                .collect(Collectors.toList());
    }
}
