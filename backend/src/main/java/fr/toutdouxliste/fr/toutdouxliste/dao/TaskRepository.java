package fr.toutdouxliste.fr.toutdouxliste.dao;

import fr.toutdouxliste.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
