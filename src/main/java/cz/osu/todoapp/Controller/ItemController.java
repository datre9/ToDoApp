package cz.osu.todoapp.Controller;

import cz.osu.todoapp.Model.json.ItemForm;
import cz.osu.todoapp.Service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class ItemController {
    private final ItemService itemService;

    public ItemController(ItemService itemService) {this.itemService = itemService;}

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody ItemForm itemDTO) {
        return itemService.create(itemDTO);
    }

    @GetMapping("/getall")
    public ResponseEntity<Object> getAll(@RequestBody String userId) {
        return itemService.getAllForUser(userId);
    }
}