package fr.toutdouxliste.service;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.dao.UserRepository;
import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository trep;

    @Autowired
    private CategoryRepository crep;

    @Autowired
    private UserRepository urep;

    @Override
    public List<Task> getTasksFromUserId(Long userId) {
        return null;
    }

    @Override
    public List<Category> getCategoriesFromUserId(Long userId) {
        return null;
    }

    @Override
    public List<Category> getCategoriesFromTaskId(Long taskId) {
        if (trep.findById(taskId).isPresent()) {
            Task task = trep.findById(taskId).get();
            ArrayList<Category> result;

            // try {
            //     result = new ArrayList<>(task.getCategories());
            // } catch (Exception e) {
            //     return Collections.emptyList();
            // }

            return null;
        }

        else return Collections.emptyList();
    }

    @Override
    public User authByCredentials(String email, String password) {
        try {
            if (urep.findByEmailAndPassword(email, password).isPresent())
                return urep.findByEmailAndPassword(email, password).get();
            else
                return null;
        } catch (NoSuchElementException e) {
            return null;
        }
    }

    @Override
    public Task saveTask(Task task) {
        return trep.save(task);
    }

    @Override
    public Task saveCategoriesToTask(Long taskId, Collection<Category> categories) {
        if (trep.findById(taskId).isPresent()) {
            Task task = trep.findById(taskId).get();

            // task.setCategories(categories);
            trep.save(task);

            return task;
        }

        return null;
    }

    @Override
    public Task getTaskFromId(Long id) {
        if (trep.findById(id).isPresent())
            return trep.findById(id).get();
        else return null;
    }
}