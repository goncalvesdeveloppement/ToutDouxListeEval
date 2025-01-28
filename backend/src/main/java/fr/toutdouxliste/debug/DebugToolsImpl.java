package fr.toutdouxliste.debug;

import fr.toutdouxliste.dao.CategoryRepository;
import fr.toutdouxliste.dao.TaskRepository;
import fr.toutdouxliste.dao.UserRepository;
import fr.toutdouxliste.entities.Category;
import fr.toutdouxliste.entities.Task;
import fr.toutdouxliste.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;

@Service
public class DebugToolsImpl implements DebugTools {
    @Autowired
    private CategoryRepository crep;

    @Autowired
    private TaskRepository trep;

    @Autowired
    private UserRepository urep;

    @Override
    public void fillDatabase() {
        User nath = urep.save(new User(null, "Nath", "nath@toutdouxliste.fr", "talentueusedev", Collections.emptyList(), Collections.emptyList()));
        User alik = urep.save(new User(null, "Alik", "alik@toutdouxliste.fr", "excellentdev", Collections.emptyList(), Collections.emptyList()));
        User remi = urep.save(new User(null, "Rémi", "remi@toutdouxliste.fr", "incroyabledev", Collections.emptyList(), Collections.emptyList()));
        User antho = urep.save(new User(null, "Antho", "antho@toutdouxliste.fr", "peugeot308rouge", Collections.emptyList(), Collections.emptyList()));

        ArrayList<Category> nathsCategories = new ArrayList<Category>();
        ArrayList<Category> aliksCategories = new ArrayList<Category>();
        ArrayList<Category> remisCategories = new ArrayList<Category>();
        ArrayList<Category> anthosCategories = new ArrayList<Category>();

        Category nathCatPro = new Category(null, "Pro", 1, Collections.emptyList(), nath);
        Category nathCatPerso = new Category(null, "Perso", 11, Collections.emptyList(), nath);
        Category alikCatPro = new Category(null, "Pro", 3, Collections.emptyList(), alik);
        Category alikCatPerso = new Category(null, "Perso", 13, Collections.emptyList(), alik);
        Category remiCatPro = new Category(null, "Pro", 5, Collections.emptyList(), remi);
        Category remiCatPerso = new Category(null, "Perso", 15, Collections.emptyList(), remi);
        Category anthoCatPro = new Category(null, "Pro", 7, Collections.emptyList(), antho);
        Category anthoCatPerso = new Category(null, "Perso", 17, Collections.emptyList(), antho);

        Task taskA = new Task(null, "Barre de recherche", "Finir le CSS de la barre de recherche avant midi.", new Date(2025, 01, 28, 12, 0), "TODO", null, Arrays.asList(nathCatPro));
        taskA.setOwner(nath);
        trep.save(taskA);
        Task taskB = new Task(null, "La tâche inconnue", "Finir cette tâche secrète que personne ne connait.", new Date(2025, 01, 31, 19, 30), "OK", null, Arrays.asList(remiCatPro, remiCatPerso));
        taskB.setOwner(remi);
        trep.save(taskB);
        Task taskC = new Task(null, "Le trello bien sûr", "Mettre à jour le Trello.", new Date(2025, 01, 29, 16, 15), "CANCELLED", null, Collections.emptyList());
        taskC.setOwner(alik);
        trep.save(taskC);
    }
}
