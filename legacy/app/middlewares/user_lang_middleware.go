package middlewares

import (
	"context"
	"fmt"
	"net/http"
	"np_web_main/l10n"
	"strings"
)

func UserLangMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Detecting the URL lang
		urlLang := ""
		for _, l := range l10n.AllowedLangKeys {
			prefix := "/" + l + "/"
			if strings.HasPrefix(r.URL.Path, prefix) {
				urlLang = l
				break
			}
		}

		// Resolving it
		userLang := l10n.ResolveUserLang(urlLang, r.Header.Get("accept-language"), true)

		fmt.Printf("Detected user lang:\n> path: %s\n> urlLang: %s\n> header: %s\n> userLang: %s\n",
			r.URL.Path, urlLang, r.Header.Get("accept-language"), userLang)

		// Add language to context
		ctx := context.WithValue(r.Context(), "userLang", userLang)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
