package fr.toutdouxliste;

import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.dao.UserRepository;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ToutDouxListeBackendApplication implements CommandLineRunner {
//    @Autowired
//    private CategoryRepository categoryRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(ToutDouxListeBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User remi = userRepository.save(new User(null,"remi","remi@gmail.com","123",null));

        Task task1 = taskRepository.save(new Task(null, "name", "desc", new Date(), "TODO",remi));
        taskRepository.save(new Task(null, "name", "desc", new Date(), "TODO",remi));
        taskRepository.save(new Task(null, "name", "desc", new Date(), "TODO",remi));
    }
}
