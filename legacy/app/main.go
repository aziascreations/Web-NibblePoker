package main

import (
	"fmt"
	"log"
	"net/http"
	_ "np_web_main/data"
	"np_web_main/handlers"
	"np_web_main/middlewares"
	_ "np_web_main/templating"
	"runtime"
	"runtime/debug"
)

func main() {
	fmt.Printf("Entering main()...\n")
	runtime.GC()
	debug.FreeOSMemory()

	fmt.Printf("> Setting up routes...\n")

	http.Handle("/",
		middlewares.CommonContextMiddleware(
			middlewares.UserLangMiddleware(
				http.HandlerFunc(handlers.HandleRoot),
			),
		),
	)
	http.Handle("/en/",
		middlewares.CommonContextMiddleware(
			middlewares.UserLangMiddleware(
				http.HandlerFunc(handlers.HandleRoot),
			),
		),
	)
	http.Handle("/fr/",
		middlewares.CommonContextMiddleware(
			middlewares.UserLangMiddleware(
				http.HandlerFunc(handlers.HandleRoot),
			),
		),
	)

	/*http.HandleFunc("/bar", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})*/

	fmt.Printf("> Starting HTTP server...\n")

	log.Fatal(http.ListenAndServe(":8080", nil))
}
