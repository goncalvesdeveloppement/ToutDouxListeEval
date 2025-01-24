package fr.toutdouxliste.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import fr.toutdouxliste.dao.UserRepository;
import fr.toutdouxliste.service.TaskServiceImpl;

@RestController
public class TaskController {
    @Autowired
    private TaskServiceImpl taskService;

    @Autowired
    private UserRepository urep;

    @GetMapping("/tasks")
    public List<Task> allTasksFromUser(@RequestParam("userId") Long userId) {
            return taskService.getTasksFromUser(urep.findById(userId).get());
    }
}
