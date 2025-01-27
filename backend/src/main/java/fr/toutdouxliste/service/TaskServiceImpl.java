package fr.toutdouxliste.service;

import java.util.List;
import java.util.NoSuchElementException;

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
        return trep.findByOwner(urep.findById(userId).get());
    }

    @Override
    public List<Category> getCategoriesFromUserId(Long userId) {
        return crep.findByOwner(urep.findById(userId).get());
    }

    @Override
    public User authByCredentials(String email, String password) {
        try {
            return urep.findByEmailAndPassword(email, password).get();
        } catch (NoSuchElementException e) {
            return null;
        }
    }

}
