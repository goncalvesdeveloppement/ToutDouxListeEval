package fr.toutdouxliste.web;

import fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.dao.UserRepository;
import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ApiController {
    // @Autowired
    // private TaskServiceImpl taskService;

    @Autowired
    private TaskRepository trep;

    @Autowired
    private UserRepository urep;

    @Autowired
    private CategoryRepository crep;

    @GetMapping("/tasks")
    public List<Task> allTasksFromUser() {
        return trep.findAll();
    }

    @GetMapping("/users")
    public List<User> allUsers() {
        return urep.findAll();
    }

    @GetMapping("/categories")
    public List<Category> allCategories() {
        return crep.findAll();
    }

    @GetMapping(value = {"/task/{id}"})
    public Task taskFromId(@PathVariable Long id) {
        return null;
    }

    @GetMapping(value = {"/user/{id}"})
    public User userFromId(@PathVariable Long id) {
        return null;
    }

    @GetMapping(value = {"/category/{id}"})
    public Category categoryFromId(@PathVariable Long id) {
        return null;
    }

    // Nouvelle tâche
    @PostMapping("/tasks")
    public Task createTask(@RequestBody Task task) {
        System.out.println("microservice task post");
        return trep.save(task);
    }

//    // Modifier une tâche
//    @PutMapping(value = {"/tasks"}, consumes = MediaType.APPLICATION_JSON_VALUE)
//    public Task updateTask(@RequestBody Task task) {
//        return null;
//    }
//
//    @PostMapping(value = {"/categories"})
//    public Task saveCategories(@RequestBody Collection<Category> categories, @RequestParam("taskId") Long taskId) {
//        return null;
//    }
//
//    @GetMapping(value = {"/categories"})
//    public List<Category> allCategoriesFromUser(@RequestParam("owner") Long userId) {
//        return null;
//    }
//
//    @GetMapping(value = {"/tasks/{taskId}/categories"})
//    public List<Category> allCategoriesFromTask(@PathVariable(value = "taskId") Long taskId) {
//        return null;
//    }
//
//    @GetMapping(value = {"/users"})
//    public User authByUser(@RequestParam("email") String email, @RequestParam("password") String password) {
//        return (null);
//    }
}
