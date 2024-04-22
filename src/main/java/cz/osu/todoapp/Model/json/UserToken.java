package cz.osu.todoapp.Model.json;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserToken {
    private String userId;
    private String username;
}