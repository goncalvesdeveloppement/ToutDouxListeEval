package fr.toutdouxliste.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
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

    @JsonIgnore
    @ManyToOne
    private User owner;

    @JsonManagedReference
    @ManyToMany(cascade = CascadeType.ALL)
    private Collection<Category> categories;

    public Task(String name, String description, Date deadline, String status) {
        this.setName(name);
        this.setDescription(description);
        this.setDeadline(deadline);
        this.setStatus(status);
    }

    public Task(String name, String description, Date deadline, String status, Collection<Category> categories, User owner) {
        this.setName(name);
        this.setDescription(description);
        this.setDeadline(deadline);
        this.setStatus(status);
        this.setCategories(categories);
        this.setOwner(owner);
    }
}
