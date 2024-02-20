from __future__ import annotations

import csv
import mariadb


class MovieTitle:
    def __init__(self, id, title, year, runtime_minutes, genres):
        self.id = id
        self.title = title
        self.year = year
        self.runtime_minutes = runtime_minutes
        self.genres = genres or []

    def __str__(self):
        return f"MovieTitle(id={self.id}, title={self.title}, year={self.year}, runtimeMinutes={self.runtime_minutes}, genres={self.genres})"

    def execute_sql(self, sql_cursor: mariadb.cursors.Cursor):

        try:
            sql_cursor.execute("INSERT INTO movie (id, title, year, runtime_minutes) VALUES (?, ?, ?, ?)",
                               (self.id, self.title, self.year, self.runtime_minutes))

            for genre in self.genres:
                sql_cursor.execute("INSERT INTO movie_genres (movie_id, genres) VALUES (?, ?)", (self.id, genre))
        except mariadb.Error as e:
            print(f"Error: {e}")

    def as_tuple(self):
        return self.id, self.title, self.year, self.runtime_minutes

    def genre_tuples(self) -> list[tuple]|None:
        if self.genres is None:
            return None
        return [(self.id, g) for g in self.genres]


class Crew:
    def __init__(self, id, name, birthYear, deathYear):
        self.id = id
        self.name = name
        self.birthYear = birthYear
        self.deathYear = deathYear

    def __str__(self):
        return f"Crew(id={self.id}, name={self.name}, birthYear={self.birthYear}, deathYear={self.deathYear})"

    def execute_sql(self, sql_cursor: mariadb.cursors.Cursor):
        try:
            sql_cursor.execute("INSERT INTO crew (id, name, birth_year, death_year) VALUES (?, ?, ?, ?)",
                               (self.id, self.name, self.birthYear, self.deathYear))
        except mariadb.Error as e:
            print(f"Error: {e}")

    def as_tuple(self):
        return self.id, self.name, self.birthYear, self.deathYear


class MovieCrew:
    def __init__(self, movie_id, director_ids, writer_ids):
        self.movie_id = movie_id
        self.director_ids = director_ids
        self.writer_ids = writer_ids

    def __str__(self):
        return f"MovieCrew(movieId={self.movie_id}, directors={self.director_ids}, writers={self.writer_ids})"

    def execute_sql(self, sql_cursor: mariadb.cursors.Cursor):
        try:
            for director in self.director_ids:
                sql_cursor.execute("INSERT INTO movie_directors (movie_id, directors_id) VALUES (?, ?)",
                                   (self.movie_id, director))
            for writer in self.writer_ids:
                sql_cursor.execute("INSERT INTO movie_writers (movie_id, writers_id) VALUES (?, ?)",
                                   (self.movie_id, writer))
        except mariadb.Error as e:
            print(f"Error: {e}")

    def as_tuple(self):
        return self.movie_id, self.director_ids, self.writer_ids

    def directors_tuples(self):
        if self.director_ids is None:
            return None
        return [(self.movie_id, d) for d in self.director_ids]

    def writers_tuples(self):
        if self.writer_ids is None:
            return None
        return [(self.movie_id, w) for w in self.writer_ids]


def execute_in_batches(sql_cursor: mariadb.cursors.Cursor, data: list[tuple], insert_query: str, batch_size: int = 100000):
    print(f"Executing {len(data)} in batches of {batch_size}")
    print(f"Insert query: {insert_query}")
    for i in range(0, len(data), batch_size):
        print(f"Processing batch {i}-{i + batch_size} of {len(data)}")
        batch = data[i:i + batch_size]
        try:
            sql_cursor.executemany(insert_query, batch)
        except mariadb.Error as e:
            print(f"Error for batch {i}: {e}")
            printed = '\n'.join([str(x) for x in batch])
            print(f"Data is {printed}")


def populate_movie_titles(sql_cursor: mariadb.cursors.Cursor):
    with open('title.basics.tsv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter='\t')

        # Skip the header
        next(reader)

        INSERT_QUERY = "INSERT INTO movie (id, title, year, runtime_minutes) VALUES (?, ?, ?, ?)"
        INSERT_VALUES = []

        INSERT_GENRES_QUERY = "INSERT INTO movie_genres (movie_id, genres) VALUES (?, ?)"
        INSERT_GENRES_VALUES = []

        print(f"Movies: Processing file")
        for row in reader:
            title_type = row[1]
            if title_type != "movie":
                continue
            year = row[5]
            if year == "\\N":
                continue  # dont include movies with unknown year

            id = row[0]
            title = row[2]

            runtime = None if row[7] == "\\N" else row[7]
            genres = None if row[8] == "\\N" else row[8].split(",")

            movie = MovieTitle(id, title, year, runtime, genres)

            INSERT_VALUES.append(movie.as_tuple())
            if movie.genres is not None:
                INSERT_GENRES_VALUES.extend(movie.genre_tuples())

        execute_in_batches(sql_cursor, INSERT_VALUES, INSERT_QUERY)
        execute_in_batches(sql_cursor, INSERT_GENRES_VALUES, INSERT_GENRES_QUERY)


def populate_crew_members(sql_cursor: mariadb.cursors.Cursor):
    with open('name.basics.tsv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter='\t')

        # Skip the header
        next(reader)

        INSERT_QUERY = "INSERT INTO crew (id, name, birth_year, death_year) VALUES (?, ?, ?, ?)"
        INSERT_DATA = []

        print("Crew: processing files")
        for row in reader:
            id = row[0]
            name = row[1]
            birthYear = None if row[2] == "\\N" else row[2]
            deathYear = None if row[3] == "\\N" else row[3]  # Replace \N with None

            crew = Crew(id, name, birthYear, deathYear)

            # crew.execute_sql(sql_cursor)
            INSERT_DATA.append(crew.as_tuple())

        execute_in_batches(sql_cursor, INSERT_DATA, INSERT_QUERY)


def populate_movie_crew(sql_cursor: mariadb.cursors.Cursor):
    with open('title.crew.tsv', 'r', encoding='utf-8') as file:
        reader = csv.reader(file, delimiter='\t')

        # Skip the header
        next(reader)
        # Here - ignore if constrains not met, as many of the referenced titles are tv shows
        INSERT_WRITERS_QUERY = "INSERT IGNORE INTO movie_writers (movie_id, writers_id) VALUES (?, ?)"
        INSERT_DIRECTORS_QUERY = "INSERT IGNORE INTO movie_directors (movie_id, directors_id) VALUES (?, ?)"

        INSERT_WRITERS_DATA = []
        INSERT_DIRECTORS_DATA = []

        print("movie-writer/director relation: reading file")
        for row in reader:
            movie_id = row[0]
            directors = None if row[1] == "\\N" else row[1].split(",")
            writers = None if row[2] == "\\N" else row[2].split(",")

            movie_crew = MovieCrew(movie_id, directors, writers)

            # movie_crew.execute_sql(sql_cursor)
            INSERT_WRITERS_DATA.extend(movie_crew.writers_tuples()) if movie_crew.writers_tuples() is not None else None
            INSERT_DIRECTORS_DATA.extend(movie_crew.directors_tuples()) if movie_crew.directors_tuples() is not None else None

        execute_in_batches(sql_cursor, INSERT_WRITERS_DATA, INSERT_WRITERS_QUERY)
        execute_in_batches(sql_cursor, INSERT_DIRECTORS_DATA, INSERT_DIRECTORS_QUERY)


def connect_to_db() -> mariadb.connections.Connection | None:
    try:
        conn = mariadb.connect(
            user="pu_user",
            password="pu_password",
            host="0.0.0.0",
            database="pu_database"
        )
        # Show all tables
        cursor = conn.cursor()
        cursor.execute("SHOW TABLES")
        print(f"Connected to database. Found tables: {','.join(x[0] for x in cursor)}")
        for table in cursor:
            print(table)
        return conn

    except mariadb.Error as e:
        print(f"Error connecting to MariaDB Platform: {e}")
        return None


if __name__ == "__main__":
    conn = connect_to_db()
    conn.autocommit = True
    cursor = conn.cursor()
    print("Attempting to populate with movies...")
    populate_movie_titles(cursor)
    print("Now populating crew members...")
    populate_crew_members(cursor)
    print("Now populating movie <-> crew relationships...")
    populate_movie_crew(cursor)
    print("Now clearing unnecessary data (crew members who are not part of any movie)")
    DELETE_UNNECESSARY_CREW = """DELETE FROM crew WHERE crew.id NOT IN
(
    SELECT d.directors_id AS crew_members
    FROM movie_directors d
    UNION ALL
    SELECT w.writers_id
    FROM movie_writers w
)"""
    cursor.execute(DELETE_UNNECESSARY_CREW)

    print("Finishing... Closing cursor")
    cursor.close()

# populate_movie_crew()
# populate_crew_members()
# populate_movie_titles()
