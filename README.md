# Venda de ingressos para shows

## Este trabalho tem como objetivo criar microsserviços para Cadastro de Cliente, Ingressos, Barramento de Eventos, Classificação e Consulta. 

### O microsserviço de Cadastro de clientes deverá cadastrar os clientes com os atributos: id(geração automática) , nome, endereço, idade e status, também deverá ser capaz de alterar o cliente, listar os clientes e excluir um cliente.

### O microsserviço de Ingresso deverá cadastrar os ingressos com os atributos: id (UUID),descrição e quantidade vinculados ao cliente, também deverá ser capaz de alterar a venda alterando a quantidade, listar todos os ingressos vendidos e excluir um ingresso,

### O microsserviço de Classificação deverá classificar como prioritário os clientes com idade igual ou superior a 60 anos.

### O microsserviço de Consulta deverá exibir todos os clientes cadastrados com os seus respectivos ingressos e já classificados.
