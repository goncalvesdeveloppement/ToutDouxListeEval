package fr.toutdouxliste.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String name;

    @Setter
    private int color;

    @ManyToMany(mappedBy = "categories")
    private Collection<Task> tasks;

    @ManyToOne(fetch = FetchType.LAZY)
    private User owner;

    public Category(String name, int color, User owner) {
        this.setName(name);
        this.setColor(color);
        this.setOwner(owner);
    }

    public Category(String name, int color) {
        this.setName(name);
        this.setColor(color);
    }

}
