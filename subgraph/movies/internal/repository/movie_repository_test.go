package repository

import (
	"database/sql"
	"reflect"
	"testing"
)

// モックのsql.DB構造体
type mockDB struct{}

// テスト用のNewMovieRepository関数
func TestNewMovieRepository(t *testing.T) {
	// モックのデータベース接続を作成
	var mockDB *sql.DB

	// NewMovieRepositoryを呼び出してインスタンスを作成
	repo := NewMovieRepository(mockDB)

	// インスタンスが正しく作成されたかチェック
	if repo == nil {
		t.Error("NewMovieRepository returned nil")
	}

	// dbフィールドが正しく設定されているかチェック
	if repo.db != mockDB {
		t.Error("NewMovieRepository did not set the db field correctly")
	}

	// 期待される型と実際の型を比較
	expectedType := reflect.TypeOf(&MovieRepository{})
	actualType := reflect.TypeOf(repo)
	if actualType != expectedType {
		t.Errorf("Expected type %v, but got %v", expectedType, actualType)
	}
}
