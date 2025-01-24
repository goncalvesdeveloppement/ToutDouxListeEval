package fr.toutdouxliste;

import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.dao.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@SpringBootApplication
public class ToutDouxListeBackendApplication implements CommandLineRunner {
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
        // Persister l'utilisateur d'abord
        User antho = userRepository.save(new User("Anthony", "a.goncalves.pro@icloud.com", "abcd"));
        User momo = userRepository.save(new User("Mohamed", "test@test.test", "zzz"));

        Category pro = new Category("Pro", 1);
        Category tresPro = new Category("Très pro", 11);
        categoryRepository.save(pro);
        categoryRepository.save(tresPro);

        pro.setOwner(antho);
        categoryRepository.save(pro);
        tresPro.setOwner(momo);
        categoryRepository.save(tresPro);

        Task scrum = new Task("Faire le scrum", "bah oui normal", new Date(), "TODO");
        taskRepository.save(scrum);
        ArrayList<Category> c = new ArrayList<Category>();
        c.add(pro);
        scrum.setCategories(c);
        taskRepository.save(scrum);
        scrum.setOwner(antho);
        taskRepository.save(scrum);
    }
}
