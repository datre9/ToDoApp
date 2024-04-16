package cz.osu.todoapp.Controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    @Value("${app.name}")
    private String appName;

    @GetMapping("") // http://localhost:8080/
    public String getAppName() {
        return appName;
    }
}