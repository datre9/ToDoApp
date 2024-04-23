package cz.osu.todoapp.Model.db;

import cz.osu.todoapp.Model.enums.Importance;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "item")
public class Item {
    @Id
    @UuidGenerator
    @Column(unique = true, nullable = false, updatable = false, name = "item_id")
    private String itemId;

    @Column(nullable = false, updatable = false, name = "user_id")
    private String userId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private LocalDateTime time;

    private String description;

    private boolean completed;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Importance importance;
}