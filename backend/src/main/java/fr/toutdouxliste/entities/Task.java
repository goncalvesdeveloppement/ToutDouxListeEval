package fr.toutdouxliste.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Accessors
public class Task implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String name;

    @Setter
    private String description;

    @Setter
    private Date deadline;

    @Setter
    private String status;

    @ManyToMany
    private Collection<Category> categories;

    public Task(String name, String description, Date deadline, String status) {
        this.setName(name);
        this.setDescription(description);
        this.setDeadline(deadline);
        this.setStatus(status);
    }

    public Task(String name, String description, Date deadline, String status, Collection<Category> categories) {
        this.setName(name);
        this.setDescription(description);
        this.setDeadline(deadline);
        this.setStatus(status);
        this.setCategories(categories);
    }
}
