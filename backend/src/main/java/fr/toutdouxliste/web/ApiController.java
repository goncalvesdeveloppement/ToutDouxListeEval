package fr.toutdouxliste.web;

import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import fr.toutdouxliste.service.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class ApiController {
    // @Autowired
    // private TaskServiceImpl taskService;

    @Autowired
    private TaskRepository trep;

    @GetMapping("/tasks")
    public List<Task> allTasksFromUser() {
        return trep.findAll();
    }

//    @GetMapping(value = {"/task/{id}"})
//    public Task taskFromId(@PathVariable Long id) {
//        return null;
//    }

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
