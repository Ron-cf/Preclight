# Preclight
Programa para inserção de dados para expedição de ofícios requisitórios e precatórios.
Este projeto integrador será um programa para fornecer segurança na inserção de dados e servirá como projeto piloto para a melhoria ao sistema PrecWeb.
A entrada de dados será otimizada para que com base no número do processo sejam extraídos diversos dados que se apresentam como campos no sistema PJE; evitando-se digitaçõesadicionais e melhorando a eficiência no processo de trabalho.
A saída do sistema será gravação de um arquivo em JSON contendo todos os dados necessários à correta expedição do requisitório ou precatório por parte do setor específico do tribunal.


ARQUIVOS:
Frontend
resultado.txt: arquivo de exemplo do JSON usado pela pagina results_p2.html
index e results_p2.html: arquivos no servidor web
Univesp.jpg: arquivo no servidor web (Página de fundo do sistema web)

Backend
P_2.service: arquivo de configuração para que aplicação rode como um serviço no Linux
2024-11-22_17h46m24s.json: exemplo de arquivo JSON que é gravado no servidor (backend)
server.js: aplicação em NodeJS que roda no backend

Para testar o sistema o arquivo .txt contém números de processos que têm registros no banco de dados mysql
