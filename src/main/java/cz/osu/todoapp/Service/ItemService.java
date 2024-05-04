package cz.osu.todoapp.Service;

import cz.osu.todoapp.Model.db.Item;
import cz.osu.todoapp.Model.enums.Importance;
import cz.osu.todoapp.Model.json.ItemCompleteForm;
import cz.osu.todoapp.Model.json.ItemEditForm;
import cz.osu.todoapp.Model.json.ItemForm;
import cz.osu.todoapp.Model.json.ItemToken;
import cz.osu.todoapp.Model.repo.ItemRepo;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

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
        } catch (Exception e) {
            return new ResponseEntity<>("Incorrect item information or format", HttpStatus.CONFLICT);
        }
    }

    public ResponseEntity<Object> getAllForUser(ItemToken userID) {
        List<Item> items = itemRepo.findByUserIdOrderByTimeAsc(userID.getUserId());
        items.sort((item1, item2) -> Boolean.compare(item1.isCompleted(), item2.isCompleted()));
        items.sort((item1, item2) -> item2.getImportance().compareTo(item1.getImportance()));

        if (items.isEmpty()) {
            return new ResponseEntity<>("User " + userID.getUserId() + " has no items or does not exist", HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>(items, HttpStatus.OK);
        }
    }

    public ResponseEntity<String> delete(ItemToken itemID) {
        ResponseEntity<String> ret;

        if (itemRepo.existsById(itemID.getUserId())) {
            itemRepo.deleteById(itemID.getUserId());

            ret = new ResponseEntity<>("Item deleted successfully", HttpStatus.OK);
        } else {
            ret = new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
        return ret;
    }

    public ResponseEntity<String> update(ItemEditForm itemDTO) {
        ResponseEntity<String> ret;
        if (itemRepo.existsById(itemDTO.getItemID())) {
            Item item = itemRepo.findById(itemDTO.getItemID()).get();

            item.setTitle(itemDTO.getTitle());
            LocalDateTime time = LocalDateTime.parse(itemDTO.getTime());
            item.setTime(time);
            item.setDescription(itemDTO.getDescription());
            item.setCompleted(false);
            item.setImportance(Importance.valueOf(itemDTO.getImportance()));

            itemRepo.save(item);
            ret = new ResponseEntity<>("Item updated successfully", HttpStatus.OK);
        } else {
            ret = new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
        return ret;
    }

    public ResponseEntity<String> complete(ItemCompleteForm itemDTO) {
        ResponseEntity<String> ret;
        if (itemRepo.existsById(itemDTO.getItemID())) {
            Item item = itemRepo.findById(itemDTO.getItemID()).get();

            item.setCompleted(itemDTO.isCompleted());

            itemRepo.save(item);
            ret = new ResponseEntity<>("Item updated successfully", HttpStatus.OK);
        } else {
            ret = new ResponseEntity<>("Item not found", HttpStatus.NOT_FOUND);
        }
        return ret;
    }
}