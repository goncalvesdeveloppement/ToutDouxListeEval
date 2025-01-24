package fr.toutdouxliste.service;

import java.util.List;

import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;

public interface TaskService {
    public List<Task> getTasksFromUser(User user);
}
