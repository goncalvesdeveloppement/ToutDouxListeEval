package fr.toutdouxliste.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`user`")
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    private String name;

    @Setter
    private String email;

    @Setter
    private String password;

    @JsonBackReference
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Collection<Task> tasks;

    @JsonBackReference
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Collection<Category> categories;
}
