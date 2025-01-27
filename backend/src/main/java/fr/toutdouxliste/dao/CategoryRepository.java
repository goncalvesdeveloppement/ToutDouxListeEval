package fr.toutdouxliste.dao;

import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByOwner(User user);
}
