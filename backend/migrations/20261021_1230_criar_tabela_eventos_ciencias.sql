CREATE TABLE IF NOT EXISTS eventos_ciencias (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(180) NOT NULL,
  descricao TEXT NOT NULL,
  categoria ENUM('Biologia','Física','Química','Ciências da Terra','Astronomia','Meio Ambiente','Multidisciplinar') NOT NULL,
  data_evento DATE NOT NULL,
  horario TIME NULL,
  local VARCHAR(180) NOT NULL,
  organizador VARCHAR(160) NULL,
  imagem_url VARCHAR(500) NULL,
  status ENUM('agendado','em andamento','concluido','cancelado') NOT NULL DEFAULT 'agendado',
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_eventos_data (data_evento),
  INDEX idx_eventos_categoria (categoria),
  INDEX idx_eventos_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
