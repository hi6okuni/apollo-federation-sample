package repository

import (
	"context"
	"database/sql"
	"fmt"
	"reviews/graph/model"
	"strings"
)

type ReviewRepository struct {
	db *sql.DB
}

func NewReviewRepository(db *sql.DB) *ReviewRepository {
	return &ReviewRepository{db: db}
}

type GetReviewsOptions struct {
	MovieID   *string
	Limit     *int
	OrderBy   string
	OrderDesc bool
}

type GetReviewsOption func(*GetReviewsOptions)

func WithMovieID(movieID string) GetReviewsOption {
	return func(o *GetReviewsOptions) {
		o.MovieID = &movieID
	}
}

func WithLimit(limit int) GetReviewsOption {
	return func(o *GetReviewsOptions) {
		o.Limit = &limit
	}
}

func WithOrderBy(field string, desc bool) GetReviewsOption {
	return func(o *GetReviewsOptions) {
		o.OrderBy = field
		o.OrderDesc = desc
	}
}

func (r *ReviewRepository) GetReviews(ctx context.Context, opts ...GetReviewsOption) ([]*model.Review, error) {
	options := GetReviewsOptions{
		OrderBy:   "id",
		OrderDesc: true,
	}
	for _, opt := range opts {
		opt(&options)
	}
	query := "SELECT id, movie_id, comment, rating FROM reviews"
	var args []interface{}
	var conditions []string

	if options.MovieID != nil {
		conditions = append(conditions, "movie_id = ?")
		args = append(args, *options.MovieID)
	}

	if len(conditions) > 0 {
		query += " WHERE " + strings.Join(conditions, " AND ")
	}

	query += fmt.Sprintf(" ORDER BY %s %s", options.OrderBy, map[bool]string{true: "DESC", false: "ASC"}[options.OrderDesc])

	if options.Limit != nil {
		query += " LIMIT ?"
		args = append(args, *options.Limit)
	}

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var reviews []*model.Review
	for rows.Next() {
		var review model.Review
		var comment sql.NullString
		var rating sql.NullInt64
		err := rows.Scan(&review.ID, &review.MovieID, &comment, &rating)
		if err != nil {
			return nil, err
		}
		if comment.Valid {
			review.Comment = &comment.String
		}
		if rating.Valid {
			ratingInt := int(rating.Int64)
			review.Rating = &ratingInt
		}
		reviews = append(reviews, &review)
	}
	return reviews, nil
}

func (r *ReviewRepository) SubmitReview(ctx context.Context, input model.MovieReviewInput) (*model.Review, error) {
	query := `INSERT INTO reviews (movie_id, comment, rating) VALUES (?, ?, ?)`
	result, err := r.db.ExecContext(ctx, query, input.MovieID, input.Comment, input.Rating)
	if err != nil {
		return nil, err
	}

	id, _ := result.LastInsertId()
	return &model.Review{
		ID:      fmt.Sprint(id),
		MovieID: input.MovieID,
		Comment: input.Comment,
		Rating:  input.Rating,
	}, nil
}

func (r *ReviewRepository) GetOverallRatingForMovie(ctx context.Context, movieID string) (float64, error) {
	query := `SELECT AVG(rating) FROM reviews WHERE movie_id = ?`
	var avgRating sql.NullFloat64
	err := r.db.QueryRowContext(ctx, query, movieID).Scan(&avgRating)
	if err != nil {
		return 0, err
	}
	if !avgRating.Valid {
		return 0, nil // レビューがない場合は0を返す
	}
	return avgRating.Float64, nil
}
