FROM python:latest

RUN apt update && apt install -y wget

WORKDIR /mariadb
RUN wget https://r.mariadb.com/downloads/mariadb_repo_setup && chmod +x mariadb_repo_setup
RUN ./mariadb_repo_setup
RUN apt update && apt install -y libmariadb3 libmariadb-dev

RUN python -m pip install mariadb

WORKDIR /app

RUN wget https://datasets.imdbws.com/title.basics.tsv.gz
RUN wget https://datasets.imdbws.com/name.basics.tsv.gz
RUN wget https://datasets.imdbws.com/title.crew.tsv.gz

RUN gzip -d *.gz
RUN rm -rf *.gz

COPY ./populate_database.py /app/populate_database.py

CMD ["python", "populate_database.py"]
