package cz.osu.todoapp.Service;

import cz.osu.todoapp.Model.db.Item;
import cz.osu.todoapp.Model.enums.Importance;
import cz.osu.todoapp.Model.json.ItemForm;
import cz.osu.todoapp.Model.repo.ItemRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@Transactional(rollbackOn = Exception.class)
public class ItemService {
    private final ItemRepo itemRepo;

    public ResponseEntity<String> create(ItemForm itemDTO) {
        try {
            Item item = new Item();
            item.setUserId(itemDTO.getUserID());
            item.setTitle(itemDTO.getTitle());

            LocalDateTime time = LocalDateTime.parse(itemDTO.getTime());
            item.setTime(time);

            item.setDescription(itemDTO.getDescription());
            item.setCompleted(false);

            item.setImportance(Importance.valueOf(itemDTO.getImportance()));

            itemRepo.save(item);

            return new ResponseEntity<>("Item save successfully", HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>("Incorrect item information or format", HttpStatus.CONFLICT);
        }
    }
}