package main

import (
	"fmt"
	"net/http"
)

func index(w http.ResponseWriter, r *http.Request) {

}

func main() {
	file := http.FileServer(http.Dir("public"))
	http.Handle("/", file)
	fmt.Println("Server jalan di port 8095")
	http.ListenAndServe(":8095", nil)
}
