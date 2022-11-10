FROM node:16.13-slim as vite

WORKDIR /app
COPY package.json yarn.lock /app
RUN yarn install
COPY postcss.config.js tailwind.config.js vite.config.js /app
COPY src/app /app/src/app
# Required for tailwindcss to properly purge
COPY src/{{project_name}}/templates /app/src/{{project_name}}/templates
RUN yarn build


FROM python:3.9-slim as builder
WORKDIR /app
# install image essentials
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev python3.9-dev
# install requirements
COPY setup.py pyproject.toml requirements.txt /app
# remove install of project from requirements for later
RUN sed -i 's/-e .//g' /app/requirements.txt
RUN pip3 install --upgrade pip \
    && pip3 install -r requirements.txt
COPY src/{{project_name}} /app/src/{{project_name}}
# install project
RUN pip3 install -e .


FROM python:3.9-slim as web
WORKDIR /app
# install image essentials
RUN apt-get update \
    && apt-get install -y libpq-dev curl
# Install Requirements
COPY --from=builder /usr/local /usr/local
# COPY --from=builder /install /usr/local

# Copy over code
COPY setup.py pyproject.toml manage.py .dockerignore .gitignore /app
COPY static-site /app/static-site
COPY docker /app/docker
COPY src/{{project_name}} /app/src/{{project_name}}
# Copy static from build
COPY --from=vite /app/dist /app/dist

ENTRYPOINT ["/app/docker/entrypoint.sh"]
