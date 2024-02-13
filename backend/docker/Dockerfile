FROM sapmachine:ubuntu-22.04 as base

RUN apt update && apt install -y maven

WORKDIR /backend

COPY . /backend
RUN mvn clean install