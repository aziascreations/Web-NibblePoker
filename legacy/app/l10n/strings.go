package l10n

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"gopkg.in/yaml.v3"
)

// StringsData Safe for concurrent reads only !
var StringsData map[string]map[string]string

func init() {
	fmt.Printf("Initializing L10N strings...\n")

	StringsData = make(map[string]map[string]string, len(AllowedLangKeys))

	for _, supportedLang := range AllowedLangKeys {
		fmt.Printf("> Loading '%s'...\n", supportedLang)

		var processedFileCount = 0
		langStrings := make(map[string]string, 2048)

		basePath := "./data/strings/" + supportedLang + "/"

		err := filepath.Walk(basePath, func(path string, info os.FileInfo, err error) error {
			if err != nil {
				fmt.Printf("-> Error accessing path %q\n", path)
				return err
			}

			if !info.IsDir() && (strings.HasSuffix(info.Name(), ".yml")) {
				//fmt.Printf("-> File: %s (%s) (Size: %d bytes)\n", path, info.Name(), info.Size())
				//fmt.Printf("%s ", strings.TrimSuffix(info.Name(), ".yml"))
				//fileRootKey := strings.TrimSuffix(info.Name(), ".yml")

				// Handling file
				stringsFile, err := os.Open(path)
				if err != nil {
					fmt.Printf("--> Failed to open file: %s\n", path)
					panic(err)
				}
				defer func(stringsFile *os.File) {
					err := stringsFile.Close()
					if err != nil {
						fmt.Printf("--> Failed to close file: %s\n", path)
						panic(err)
					}
				}(stringsFile)

				// Loading YAML
				decoder := yaml.NewDecoder(stringsFile)
				decoder.KnownFields(false)

				tempStrings := make(map[string]interface{})
				err = decoder.Decode(&tempStrings)
				if err != nil {
					panic(fmt.Errorf("--> Failed to decode YAML: %w\n", err))
				}

				flattenYAML(tempStrings, strings.TrimSuffix(info.Name(), ".yml"), langStrings)

				processedFileCount = processedFileCount + 1
			}

			return nil
		})
		if err != nil {
			panic(err)
		}

		fmt.Printf("-> Loaded %d file(s) and %d string(s)\n", processedFileCount, len(langStrings))

		StringsData[supportedLang] = langStrings
	}
}

func flattenYAML(data interface{}, prefix string, result map[string]string) {
	switch v := data.(type) {
	case map[string]interface{}:
		for key, value := range v {
			newPrefix := key
			if prefix != "" {
				newPrefix = prefix + "." + key
			}
			flattenYAML(value, newPrefix, result)
		}
	case map[interface{}]interface{}:
		for key, value := range v {
			keyStr := fmt.Sprintf("%v", key)
			newPrefix := keyStr
			if prefix != "" {
				newPrefix = prefix + "." + keyStr
			}
			flattenYAML(value, newPrefix, result)
		}
	case []interface{}:
		for i, item := range v {
			newPrefix := fmt.Sprintf("%s[%d]", prefix, i)
			flattenYAML(item, newPrefix, result)
		}
	default:
		// Store as string
		//fmt.Printf("%s: %s\n", prefix, v)
		result[prefix] = fmt.Sprintf("%v", v)
	}
}
