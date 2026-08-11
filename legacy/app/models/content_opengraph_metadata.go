package models

type ContentOpengraphMetadata struct {
	titleKey       string
	descriptionKey string

	ogType      *string
	ogUrl       *string
	ogImageUrl  *string
	ogImageType *string
}
