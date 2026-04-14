# frontend-react/Dockerfile

# ─── builder ───
FROM node:23-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_HH_CLIENT_ID
ARG NEXT_PUBLIC_AVITO_CLIENT_ID
ENV NEXT_PUBLIC_HH_CLIENT_ID=$NEXT_PUBLIC_HH_CLIENT_ID
ENV NEXT_PUBLIC_AVITO_CLIENT_ID=$NEXT_PUBLIC_AVITO_CLIENT_ID

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ─── runner ───
FROM node:23-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]