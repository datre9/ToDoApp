package cz.osu.todoapp.Model.json;

import cz.osu.todoapp.Model.enums.Importance;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ItemForm {
    private String title;
    private LocalDateTime time;
    private String description;
    private Importance importance;
    private boolean completed;
}