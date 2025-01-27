package fr.toutdouxliste.service;

import java.util.List;

import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;

public interface TaskService {
    public List<Task> getTasksFromUserId(Long userId);
    public List<Category> getCategoriesFromUserId(Long userId);
    public User authByCredentials(String email, String password);
}
