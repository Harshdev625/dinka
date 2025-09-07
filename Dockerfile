FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npx prisma generate
ENV DATABASE_URL=postgresql://postgres:dinkapassword@dinka-postgres:5432/postgres
RUN npm run build 
RUN npm i npx
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
 