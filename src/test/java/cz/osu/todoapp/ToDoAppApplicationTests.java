package cz.osu.todoapp;

import cz.osu.todoapp.Model.db.AppUser;
import cz.osu.todoapp.Model.json.LoginForm;
import cz.osu.todoapp.Model.json.RegistrationForm;
import cz.osu.todoapp.Model.repo.AppUserRepo;
import cz.osu.todoapp.Service.AppUserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatusCode;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class ToDoAppApplicationTests {

	@Mock
	private AppUserRepo appUserRepo;

	@InjectMocks
	private AppUserService appUserService;

	@Test
	void contextLoads() {
	}

	@Test
	void testSuccessfulRegistration() {
		RegistrationForm registrationForm = new RegistrationForm("a", "a");
		HttpStatusCode code = appUserService.register(registrationForm).getStatusCode();

		Assertions.assertEquals(HttpStatusCode.valueOf(200), code);
	}

	@Test
	void testSuccessfulLogin() {
		//when(appUserRepo.findAppUserByUsernameIgnoreCase(Mockito.anyString())).thenReturn(new AppUser("a", "a", "a"));
		when(appUserService.appUserRepo.findAppUserByUsernameIgnoreCase(Mockito.anyString())).thenReturn(new AppUser("a", "a", "a"));

		LoginForm loginForm = new LoginForm("a", "a");
		HttpStatusCode code = appUserService.login(loginForm).getStatusCode();

		Assertions.assertEquals(HttpStatusCode.valueOf(200), code);
	}
}