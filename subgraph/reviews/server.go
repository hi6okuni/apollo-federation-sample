package main

import (
	"log"
	"net/http"
	"os"
	"reviews/graph"
	"reviews/internal/db"
	"reviews/internal/repository"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
)

const defaultPort = "4001"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	db.InitDB()
	defer db.DB.Close()

	reviewRepo := repository.NewReviewRepository(db.DB)

	resolver := &graph.Resolver{
		ReviewRepo: reviewRepo,
	}

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: resolver}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
