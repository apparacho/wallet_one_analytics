FROM node:10 as analytics-front-builder

WORKDIR /app
COPY . /app
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL $REACT_APP_BASE_URL
RUN npm install
RUN npm run build

FROM registry.w1.money/devops/image/nginx:2.1.1

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=analytics-front-builder /app/build/ /usr/share/nginx/html
