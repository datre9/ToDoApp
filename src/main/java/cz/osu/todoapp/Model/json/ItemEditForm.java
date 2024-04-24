package cz.osu.todoapp.Model.json;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ItemEditForm {
    private String itemID;
    private String userID;
    private String title;
    private String time;
    private String description;
    private String importance;
}