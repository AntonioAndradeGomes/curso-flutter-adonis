# API HOTFRUTI

## Como executar esse projeto

Neste manual se considerou que a execução desse projeto irá ser feito em localhost e usando do [Docker](https://www.docker.com/) para executar o Postgres.

1. No arquivo [docker-compose.yml](docker-compose.yml) edite as configurações de banco de dados para as que você preferir e execute o comando:

```bash
docker-compose up -d
```

2. Crie um arquivo .env na raiz do projeto com base no arquivo [.env.exemple](.env.example), mas modificando as configurações de banco de dados para as foi colocado no passo anterior.

3. Instale todas as depedências listadas no arquivo [package.json](package.json):
```bash
npm install
```
ou
```bash
yarn
```

4. Execute todas as migrações:
  
```bash
node ace migration:run
```

Em caso de problemas na execução das migrações crie um banco de dados com o "PG_DB_NAME" colocado no .env.
 

5. Iniciar o servidor Adonis e o manter em execução:

```bash
node ace serve --watch
```
