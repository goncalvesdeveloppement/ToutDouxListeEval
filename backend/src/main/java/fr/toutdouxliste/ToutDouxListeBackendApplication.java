package fr.toutdouxliste;

import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.dao.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.ArrayList;
import java.util.Date;

@SpringBootApplication
public class ToutDouxListeBackendApplication implements CommandLineRunner {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TaskRepository taskRepository;

    public static void main(String[] args) {
        SpringApplication.run(ToutDouxListeBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        Category pro = categoryRepository.save(new Category("Pro", 11));
        Category perso = categoryRepository.save(new Category("Perso", 3));

        ArrayList<Category> categoriesTask1 = new ArrayList<Category>();
        categoriesTask1.add(pro);

        ArrayList<Category> categoriesTask2 = new ArrayList<Category>();
        categoriesTask2.add(pro);
        categoriesTask2.add(perso);

        taskRepository.save(new Task("Télécharger IntelliJ Ultimate", "Souscrire à un essai 30 jours avec un second compte pour bien faire le gros rat.", new Date(), "TODO", categoriesTask1));
        taskRepository.save(new Task("Tajinier la revanche", "Aller au tajinier de Tarbes et dégommer le buffet.", new Date(), "OK", categoriesTask2));
    }
}
