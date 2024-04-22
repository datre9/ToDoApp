package cz.osu.todoapp.Model.db;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "appUser")
public class AppUser {
    @Id
    @UuidGenerator
    @Column(unique = true, nullable = false, updatable = false, name = "user_id")
    private String userId;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;
}