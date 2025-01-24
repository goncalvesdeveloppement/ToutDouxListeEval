package fr.toutdouxliste.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.dao.UserRepository;
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
    public List<Task> getTasksFromUser(User user) {
        return trep.findByOwner(user);
    }

}
