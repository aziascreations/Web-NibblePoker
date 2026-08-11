package templating

import (
	"fmt"
	"html/template"
	"path/filepath"
)

var TemplateCache = map[string]*template.Template{}

func init() {
	fmt.Printf("Initializing template cache...\n")

	fmt.Printf("> Loading pages and layouts...\n")

	pages, err := filepath.Glob("./templates/page.*.tmpl")
	if err != nil {
		panic(err)
	}

	layouts, err := filepath.Glob("./templates/layout.*.tmpl")
	if err != nil {
		panic(err)
	}

	fmt.Printf("-> Loaded %d page(s) and %d layout(s)\n", len(pages), len(layouts))

	// Creating template sets for all pages
	for _, page := range pages {
		pageName := filepath.Base(page)
		fmt.Printf("> %s\n", pageName)

		ts, err := template.New(pageName).ParseFiles(page)
		if err != nil {
			panic(err)
		}

		if len(layouts) > 0 {
			ts, err = ts.ParseGlob("./templates/layout.*.tmpl")
			if err != nil {
				panic(err)
			}

			TemplateCache[pageName] = ts
		}
	}
}
