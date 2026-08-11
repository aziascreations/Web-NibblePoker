package l10n

func Localize(stringKey string, stringDomain string, langKey string) string {
	var langString map[string]string = StringsData[langKey]

	if langString == nil {
		if langKey == DefaultLang {
			// Shouldn't happen
			return stringDomain + "." + stringKey
		} else {
			return Localize(stringKey, stringDomain, DefaultLang)
		}
	} else {
		if localizedString, exists := langString[stringDomain+"."+stringKey]; exists {
			return localizedString
		} else {
			if langKey == DefaultLang {
				return stringDomain + "." + stringKey
			} else {
				return Localize(stringKey, stringDomain, DefaultLang)
			}
		}
	}
}
