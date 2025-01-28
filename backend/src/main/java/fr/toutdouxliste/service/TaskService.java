package fr.toutdouxliste.service;

import java.util.Collection;
import java.util.List;

import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;

public interface TaskService {
    public List<Task> getTasksFromUserId(Long userId);
    public List<Category> getCategoriesFromUserId(Long userId);
    public List<Category> getCategoriesFromTaskId(Long taskId);
    public User authByCredentials(String email, String password);
    public Task saveTask(Task task);
    public Task saveCategoriesToTask(Long taskId, Collection<Category> categories);
    public Task getTaskFromId(Long id);
}
