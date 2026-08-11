package templating

import (
	"bytes"
	"errors"
	"fmt"
	"log"
	"net/http"
)

func RenderTemplate(w http.ResponseWriter, r *http.Request, tmpl string, contextData any) error {
	// Retrieving the template
	t, ok := TemplateCache[tmpl]
	if !ok {
		return errors.New("Unable to retrieve '" + tmpl + "' template from cache !")
	}

	// Rendering the template
	buf := new(bytes.Buffer)

	fmt.Printf("%s", contextData)

	err := t.Execute(buf, contextData)
	if err != nil {
		log.Fatal(err)
	}

	//Writing rendered page to http.ResponseWriter
	_, err = buf.WriteTo(w)
	if err != nil {
		fmt.Println("Error writing template to browser", err)
		return err
	}

	return nil
}
