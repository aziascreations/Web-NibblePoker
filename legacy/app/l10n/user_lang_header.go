package l10n

import (
	"slices"
	"strconv"
	"strings"
)

type UserHeaderLang struct {
	lang   string
	weight float64
}

func ResolveUserLang(urlLang string, headerLangs string, simplifyEntries bool) string {
	// User has the preferred language in the URL
	if urlLang != "" {
		return urlLang
	}

	// No preferred language header, using default
	if headerLangs == "" {
		return DefaultLang
	}

	// Fallback
	var processedHeaderLangs []UserHeaderLang
	processedHeaderLangs = append(processedHeaderLangs, UserHeaderLang{
		DefaultLang,
		0.01,
	})

	for _, headerLang := range strings.Split(headerLangs, ",") {
		headerLangParts := strings.Split(headerLang, ";")

		// Modifying entries without a "q=<float>" part to have a '0.1' value
		if len(headerLangParts) == 1 {
			headerLangParts = append(headerLangParts, "0.1")
		}

		if len(headerLangParts) != 2 {
			continue
		}

		// Simplifying complex entries from "en-US" to "en"
		if simplifyEntries && strings.Contains(headerLangParts[0], "-") {
			headerLangParts[0] = strings.Split(headerLangParts[0], "-")[0]
		}

		// Only allowing supported languages
		if !slices.Contains(AllowedLangKeys, headerLangParts[0]) {
			continue
		}

		// Parsing the language's weight
		weightStr := strings.Replace(headerLangParts[1], "q=", "", 1)
		weight, err := strconv.ParseFloat(weightStr, 64)
		if err != nil {
			continue
		}

		processedHeaderLangs = append(processedHeaderLangs, UserHeaderLang{
			headerLangParts[0], weight,
		})
	}

	// Returning the preferred language (highest weight)
	bestLang := DefaultLang
	bestWeight := -1.0
	for _, langEntry := range processedHeaderLangs {
		if langEntry.weight > bestWeight {
			bestWeight = langEntry.weight
			bestLang = langEntry.lang
		}
	}
	return bestLang
}
