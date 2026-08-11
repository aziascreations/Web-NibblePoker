package handlers

import (
	"fmt"
	"net/http"
	"np_web_main/middlewares"

	"np_web_main/templating"
)

//var tmpl *template.Template
//var tmplErr error

type PageData struct {
	Commons *middlewares.CommonContext
	Title   string
	Name    string
}

/*func init() {
	fmt.Println("Init root handler")

	tmpl, tmplErr = template.ParseFiles(
		"templates/base_www.html",
	)
}*/

func HandleRoot(w http.ResponseWriter, r *http.Request) {
	_, _ = fmt.Println("/")

	/*if tmpl == nil {
		_, _ = fmt.Printf("Unable to render 'root' template (%t)\n", tmplErr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}*/

	commonCtx := middlewares.GetCommonsFromContext(r.Context())
	if commonCtx == nil {
		http.Error(w, "Common context not found", http.StatusInternalServerError)
		return
	}

	data := PageData{
		Title:   "About Page",
		Name:    "Visitor",
		Commons: commonCtx,
	}

	/*err := tmpl.ExecuteTemplate(w, "base_www.html", data)
	if err != nil {
		_, _ = fmt.Printf("Unable to execute 'root' template (%t)\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}*/
	//w.Write([]byte("The time is: " + time.Now().String()))

	err := templating.RenderTemplate(w, r, "page.root.tmpl", data)
	if err != nil {
		_, _ = fmt.Printf("%t\n", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, _ = fmt.Println("Done 'root'")
}
