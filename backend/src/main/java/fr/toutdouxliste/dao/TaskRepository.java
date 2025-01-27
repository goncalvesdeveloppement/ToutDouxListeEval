package fr.toutdouxliste.dao;

import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByOwner(User user);
}
