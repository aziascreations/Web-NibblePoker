package middlewares

import (
	"context"
	"net/http"
	"np_web_main/l10n"
)

type CommonContext struct {
	Localize func(string, string, string) string
	TestText string
}

const ContextValueKey = "commons"

var _CommonContext CommonContext = CommonContext{
	Localize: l10n.Localize,
	TestText: "JoeMama",
}

func CommonContextMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), ContextValueKey, _CommonContext)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func GetCommonsFromContext(ctx context.Context) *CommonContext {
	cc := ctx.Value(ContextValueKey)

	if cc == nil {
		return nil
	} else {
		commonCtx := cc.(CommonContext)
		return &commonCtx
	}
}
