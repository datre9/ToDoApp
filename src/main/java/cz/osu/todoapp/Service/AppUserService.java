package cz.osu.todoapp.Service;

import cz.osu.todoapp.Model.db.AppUser;
import cz.osu.todoapp.Model.json.LoginForm;
import cz.osu.todoapp.Model.json.RegistrationForm;
import cz.osu.todoapp.Model.json.UserToken;
import cz.osu.todoapp.Model.repo.AppUserRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class AppUserService {
    private final AppUserRepo appUserRepo;

    public ResponseEntity<String> register(RegistrationForm userDTO) {
        ResponseEntity<String> ret;

        if (appUserRepo.existsByUsernameIgnoreCase(userDTO.getUsername())) {
            ret = new ResponseEntity<>("Username already taken", HttpStatus.CONFLICT);
        } else {
            AppUser appUser = new AppUser();
            appUser.setUsername(userDTO.getUsername());
            appUser.setPassword(userDTO.getPassword());

            appUserRepo.save(appUser);

            ret = new ResponseEntity<>("User registered successfully", HttpStatus.OK);
        }

        return ret;
    }

    public ResponseEntity<Object> login(LoginForm userCredentials) {
        ResponseEntity<Object> ret;

        AppUser appUser = appUserRepo.findAppUserByUsernameIgnoreCase(userCredentials.getUsername());

        if (appUser != null) {
            if (appUser.getPassword().equals(userCredentials.getPassword())) {
                UserToken userToken = new UserToken(appUser.getUserId(), appUser.getUsername());
                ret = new ResponseEntity<>(userToken, HttpStatus.OK);
            } else {
                ret = new ResponseEntity<>("Password is incorrect", HttpStatus.CONFLICT);
            }
        } else {
            ret = new ResponseEntity<>("Username not found", HttpStatus.NOT_FOUND);
        }
        return ret;
    }
}