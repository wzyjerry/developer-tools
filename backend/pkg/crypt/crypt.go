package crypt

import "golang.org/x/crypto/bcrypt"

func GetHash(raw string) string {
	hash, _ := bcrypt.GenerateFromPassword([]byte(raw), bcrypt.DefaultCost)
	return string(hash)
}

func Compare(raw string, hash string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(raw)) == nil
}
