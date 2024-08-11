package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./reviews.db")
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	err = DB.Ping()
	if err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}

	err = createTables()
	if err != nil {
		log.Fatalf("Failed to create tables: %v", err)
	}
}

func createTables() error {
	reviewTable := `
	CREATE TABLE IF NOT EXISTS reviews (
		id TEXT PRIMARY KEY,
		movie_id TEXT,
		comment TEXT,
		rating INTEGER
	);`

	_, err := DB.Exec(reviewTable)
	if err != nil {
		return err
	}

	return nil
}
