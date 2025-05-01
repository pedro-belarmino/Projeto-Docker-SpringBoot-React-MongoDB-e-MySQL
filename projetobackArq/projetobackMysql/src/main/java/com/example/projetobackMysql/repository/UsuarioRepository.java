package com.example.projetobackMysql.repository;

import com.example.projetobackMysql.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}

