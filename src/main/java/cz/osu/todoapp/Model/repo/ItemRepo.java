package cz.osu.todoapp.Model.repo;

import cz.osu.todoapp.Model.db.Item;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepo extends CrudRepository<Item, String> {
    List<Item> findByUserIdOrderByTimeAsc(String userId);
}