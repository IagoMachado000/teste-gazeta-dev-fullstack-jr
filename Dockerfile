# Usando a versão LTS do Node no Alpine para um container leve
FROM node:24-alpine

WORKDIR /app

# O comando 'tail' mantém o container vivo mesmo que a aplicação 
# ainda não tenha sido criada, permitindo que você rode o 'npx' lá dentro.
CMD ["sh", "-c", "if [ -f package.json ]; then npm install && npm run dev; else tail -f /dev/null; fi"]