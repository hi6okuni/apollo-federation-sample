package utils

// ToPointer returns a pointer to the given value.
func ToPointer[T any](v T) *T {
	return &v
}
