package fr.toutdouxliste.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import fr.toutdouxliste.dao.UserRepository;
import fr.toutdouxliste.service.TaskServiceImpl;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    private TaskServiceImpl taskService;

    @GetMapping("/tasks")
    public List<Task> allTasksFromUser(@RequestParam("owner") Long userId) {
            return taskService.getTasksFromUserId(userId);
    }

    @GetMapping("/categories")
    public List<Category> allCategoriesFromuser(@RequestParam("owner") Long userId) {
            return taskService.getCategoriesFromUserId(userId);
    }

    @GetMapping("/users")
    public User authByUser(@RequestParam("email") String email, @RequestParam("password") String password) {
            User user = taskService.authByCredentials(email, password);
            return (user != null ? user : null);
    }
}
