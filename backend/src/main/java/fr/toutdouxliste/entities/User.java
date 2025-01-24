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

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Collection<Task> tasks;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private Collection<Category> categories;

    public User(String name, String email, String password) {
        this.setName(name);
        this.setEmail(email);
        this.setPassword(password);
    }
}
