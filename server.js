const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const fs = require('fs');
const path = require('path');

// Função para gravar JSON em um arquivo
function saveJsonToFile(directoryPath, jsonData) {
  const now = new Date();
  const stringIWant = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_` +
                      `${String(now.getHours()).padStart(2, '0')}h${String(now.getMinutes()).padStart(2, '0')}m${String(now.getSeconds()).padStart(2, '0')}s`;
  const fileName = `${stringIWant}.json`;
  const filePath = path.join(directoryPath, fileName);

  // Verificar se o diretório existe, criar se necessário
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // Gravar o arquivo JSON
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      throw new Error(`Erro ao gravar o arquivo: ${err}`);
    }
  });

  // Gravar o arquivo JSON
  fs.writeFileSync('/var/www/p_2/html/resultado.txt', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      throw new Error(`Erro ao gravar o arquivo: ${err}`);
    }
  });

  console.log(`Arquivo gravado com sucesso em: ${filePath}`);
  return filePath; // Retorna o caminho do arquivo criado
}


app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db_sintetico'
});

db.connect(error => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Endpoint para consultas
app.post('/consulta', (req, res) => {
    const { processo } = req.body;
    const obj1 = req.body;
//    console.log(req.body);
    console.log(obj1);
    
//    const query = 'SELECT * FROM processo_juridico WHERE autor LIKE ?';
    const query = 'SELECT *, DATE_FORMAT(dt_autuacao, \'%d/%m/%Y\') as dt_t_autuacao FROM processo_juridico WHERE processo like ?';
    db.query(query, [`%${processo}%`], (error, results) => {
        if (error) {
            console.error('Erro na consulta ao banco de dados:', error);
            res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }
        if (results.length > 0) {
          res.json({
            data_distribuicao: results[0].data_distribuicao,
            procurador_reu: results[0].Nome_procurador_reu,
            cod_assunto: results[0].cod_assunto,
            assunto_principal: results[0].assunto_principal,
            autor: results[0].autor,
            doc_autor: results[0].doc_autor,
            reu: results[0].reu,
            advogado: results[0].advogado,
            dt_autuacao: results[0].dt_t_autuacao
          });
          const obj2 = {data_distribuicao: results[0].data_distribuicao,procurador_reu: results[0].Nome_procurador_reu,cod_assunto: results[0].cod_assunto,assunto_principal: results[0].assunto_principal,autor: results[0].autor,doc_autor: results[0].doc_autor,reu: results[0].reu,advogado: results[0].advogado,dt_autuacao: results[0].dt_t_autuacao};
          const merged = { ...obj1, ...obj2 };
          const directoryPath = '/var/www/p_2/html/outputs/';
	  try {
	    const filePath = saveJsonToFile(directoryPath, merged);
	    console.log(`Arquivo JSON criado: ${filePath}`);
	  } catch (error) {
	    console.error(error.message);
	  };
          console.log(merged);
//          console.log(obj2);
//          console.log({data_distribuicao: results[0].data_distribuicao,procurador_reu: results[0].Nome_procurador_reu,cod_assunto: results[0].cod_assunto,assunto_principal: results[0].assunto_principal,autor: results[0].autor,doc_autor: results[0].doc_autor,reu: results[0].reu,advogado: results[0].advogado,dt_autuacao: results[0].dt_t_autuacao});
        }
        else {
          res.status(404).send("Dados não encontrados");
        }
    });
});

app.listen(port, '0.0.0.0' , () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
