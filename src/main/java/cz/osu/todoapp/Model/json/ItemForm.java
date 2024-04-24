package cz.osu.todoapp.Model.json;

import cz.osu.todoapp.Model.enums.Importance;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ItemForm {
    private String userID;
    private String title;
    private String time;
    private String description;
    private String importance;
}