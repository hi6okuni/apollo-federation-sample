package model

type Review struct {
	ID      string  `json:"id"`
	Comment *string `json:"comment,omitempty"`
	Rating  *int    `json:"rating,omitempty"`
	MovieID string  `json:"movieId"`
}
