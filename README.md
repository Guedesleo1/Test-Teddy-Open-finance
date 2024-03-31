# Test-Teddy-Open-finance
Test-Teddy-Open-finance


### Para iniciar o banco de dados é necessario ter o docker-compose instalado em sua máquina e rodar o seguinte comando:

    docker-compose up -d

o docker-compose vai criar um container de um MySQL e você poderá acessar via localhost:3306 e a senha do usuário **postgres** é **postgres**

### Antes de Iniciar o servidor executar o seguinte comando:
    - npm i ou yarn add
    - npm run migrate ou yarn migrate

### Para acesar o Swagger e so coloca no browser essa url:
    http://localhost:3000/docs

### Para rodar os testes basta executar o seguinte comando:
    npm run test

### Para realizar o contador e rendirecionamento para o urlOriginal
    -Seria o urlShorts do criacao
    http://localhost:3000/{code}

### Melhorias
    -O Contador de clicks poderia ser um redis

