package fr.toutdouxliste;

import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.fr.toutdouxliste.dao.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

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
		categoryRepository.save(new Category("Test", 1));
		taskRepository.save(new Task("Titre tâche", "Description détaillée", new Date(), "TODO"));
	}
}
