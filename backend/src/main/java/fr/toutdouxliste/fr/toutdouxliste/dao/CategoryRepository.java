package fr.toutdouxliste.fr.toutdouxliste.dao;

import fr.toutdouxliste.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
