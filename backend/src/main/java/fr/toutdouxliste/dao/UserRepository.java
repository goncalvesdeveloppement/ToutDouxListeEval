package fr.toutdouxliste.dao;

import fr.toutdouxliste.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
