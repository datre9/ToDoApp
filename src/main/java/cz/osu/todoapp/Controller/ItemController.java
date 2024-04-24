package cz.osu.todoapp.Controller;

import cz.osu.todoapp.Model.json.ItemForm;
import cz.osu.todoapp.Service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {this.itemService = itemService;}

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ItemForm itemDTO) {
        return itemService.create(itemDTO);
    }
}