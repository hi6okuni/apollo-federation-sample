package graph

import "movies/internal/repository"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	MovieRepo *repository.MovieRepository
}
