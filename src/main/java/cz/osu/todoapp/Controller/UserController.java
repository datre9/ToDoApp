package cz.osu.todoapp.Controller;

import cz.osu.todoapp.Model.json.LoginForm;
import cz.osu.todoapp.Model.json.RegistrationForm;
import cz.osu.todoapp.Service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {
    private final AppUserService appUserService;

    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationForm userDTO) {
        return appUserService.register(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody LoginForm userCredentials) {
        return appUserService.login(userCredentials);
    }
}