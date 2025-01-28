package fr.toutdouxliste;

import fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.debug.DebugToolsImpl;
import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.dao.UserRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ToutDouxListeBackendApplication implements CommandLineRunner {
    @Autowired
    private DebugToolsImpl debugTools;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    public static void main(String[] args) {
        SpringApplication.run(ToutDouxListeBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Test
       // debugTools.fillDatabase();
    }
}