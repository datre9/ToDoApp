package cz.osu.todoapp.Model.json;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ItemCompleteForm {
    private String itemID;
    private boolean completed;
}