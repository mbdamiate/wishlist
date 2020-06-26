# BUILD PROD
docker-compose build

# RUN PROD
docker-compose up
docker-compose --rmi local --volumes --remove-orphans

# DEV (BUILD AND RUN)
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml down --rmi local --volumes --remove-orphans

# PROD LIBS
pm2 - Para garatir estabilidade
express - Web framework baseado em middlewares mais utilizado no mercado
body-parser, cors, express-validator, morgan - Middlewares
pg - Acesso ao PostgreSQL

# DEV LIBS
nodemon - Agilidade no desenvolivmento
mocha, chai e sinon - Pacote para testes unitários
faker - Gerador de dados falsos
supertest - Testes integrados
