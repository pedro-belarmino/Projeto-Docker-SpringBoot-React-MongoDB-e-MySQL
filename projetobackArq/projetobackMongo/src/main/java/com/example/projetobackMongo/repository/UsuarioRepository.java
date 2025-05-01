package com.example.projetobackMongo.repository;

import com.example.projetobackMongo.models.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
}

