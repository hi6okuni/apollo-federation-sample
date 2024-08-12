package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "./movies.db")
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
	query := `
	CREATE TABLE IF NOT EXISTS movies (
		id TEXT PRIMARY KEY,
		title TEXT,
		year INTEGER
	);`

	_, err := DB.Exec(query)
	return err
}
