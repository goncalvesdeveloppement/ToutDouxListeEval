package fr.toutdouxliste.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "`user`")
@ToString(exclude ="tasks")
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

     @OneToMany(mappedBy = "owner")
     @JsonIgnore
     private Collection<Task> tasks;

    // @JsonBackReference
    // @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    // private Collection<Category> categories;

    public User(String name, String email, String password) {
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
    }
}
