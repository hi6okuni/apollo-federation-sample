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

	err = insertSampleData()
	if err != nil {
		log.Fatalf("Failed to insert sample data: %v", err)
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

// 既存データがない時のみ、初期化でサンプルデータ投入
func insertSampleData() error {
	var count int
	err := DB.QueryRow("SELECT COUNT(*) FROM movies").Scan(&count)
	if err != nil {
		return err
	}

	if count > 0 {
		return nil
	}

	tx, err := DB.Begin()
	if err != nil {
		return err
	}

	sampleMovies := []struct {
		id    string
		title string
		year  int
	}{
		{"1", "The Shawshank Redemption", 1994},
		{"2", "The Godfather", 1972},
		{"3", "The Dark Knight", 2008},
		{"4", "12 Angry Men", 1957},
		{"5", "Schindler's List", 1993},
	}

	stmt, err := tx.Prepare("INSERT INTO movies (id, title, year) VALUES (?, ?, ?)")
	if err != nil {
		tx.Rollback()
		return err
	}
	defer stmt.Close()

	for _, movie := range sampleMovies {
		_, err = stmt.Exec(movie.id, movie.title, movie.year)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit()
}

// func insertSampleData() error {
// 	// まず、既存のデータ数をチェック
// 	var count int
// 	err := DB.QueryRow("SELECT COUNT(*) FROM movies").Scan(&count)
// 	if err != nil {
// 		return err
// 	}

// 	// データが既に存在する場合は、サンプルデータを挿入しない
// 	if count > 0 {
// 		return nil
// 	}

// 	// サンプルデータの挿入
// 	tx, err := DB.Begin()
// 	if err != nil {
// 		return err
// 	}

// 	sampleMovies := []struct {
// 		id    string
// 		title string
// 		year  int
// 	}{
// 		{"1", "The Shawshank Redemption", 1994},
// 		{"2", "The Godfather", 1972},
// 		{"3", "The Dark Knight", 2008},
// 		{"4", "12 Angry Men", 1957},
// 		{"5", "Schindler's List", 1993},
// 	}

// 	stmt, err := tx.Prepare("INSERT INTO movies (id, title, year) VALUES (?, ?, ?)")
// 	if err != nil {
// 		tx.Rollback()
// 		return err
// 	}
// 	defer stmt.Close()

// 	for _, movie := range sampleMovies {
// 		_, err = stmt.Exec(movie.id, movie.title, movie.year)
// 		if err != nil {
// 			tx.Rollback()
// 			return err
// 		}
// 	}

// 	return tx.Commit()
// }
