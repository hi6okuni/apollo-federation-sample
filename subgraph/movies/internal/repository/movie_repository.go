package repository

import (
	"context"
	"database/sql"
	"movies/graph/model"
)

type MovieRepository struct {
	db *sql.DB
}

func NewMovieRepository(db *sql.DB) *MovieRepository {
	return &MovieRepository{db: db}
}

type GetMoviesOptions struct {
	ID *string
}

type GetMoviesOption func(*GetMoviesOptions)

func WithID(id string) GetMoviesOption {
	return func(o *GetMoviesOptions) {
		o.ID = &id
	}
}

func (r *MovieRepository) GetMovies(ctx context.Context, opts ...GetMoviesOption) ([]*model.Movie, error) {
	options := GetMoviesOptions{}
	for _, opt := range opts {
		opt(&options)
	}
	query := "SELECT id, title, year FROM movies"

	var args []interface{}
	var conditions []string

	if options.ID != nil {
		conditions = append(conditions, "id = ?")
		args = append(args, *options.ID)
	}

	if len(conditions) > 0 {
		query += " WHERE " + conditions[0]
		for _, condition := range conditions[1:] {
			query += " AND " + condition
		}
	}

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movies []*model.Movie
	for rows.Next() {
		var movie model.Movie
		var title sql.NullString
		var year sql.NullInt64
		err := rows.Scan(&movie.ID, &title, &year)
		if err != nil {
			return nil, err
		}
		if title.Valid {
			movie.Title = &title.String
		}
		if year.Valid {
			yearInt := int(year.Int64)
			movie.Year = &yearInt
		}
		movies = append(movies, &movie)
	}

	return movies, nil
}
