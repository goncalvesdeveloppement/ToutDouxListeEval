package fr.toutdouxliste.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

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
    // @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date deadline;

    @Setter
    private String status;

     @ManyToOne
     private User owner;
    // @JsonManagedReference

    // @JsonManagedReference
    // @ManyToMany(cascade = CascadeType.ALL)
    // private Collection<Category> categories;
}
