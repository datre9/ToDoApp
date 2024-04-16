package cz.osu.todoapp.Model.repo;

import cz.osu.todoapp.Model.db.AppUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepo extends CrudRepository<AppUser, String> {
    Optional<AppUser> findByUserId(String userId);
    boolean existsByUsernameIgnoreCase(String username);
    AppUser findAppUserByUsernameIgnoreCase(String username);
}