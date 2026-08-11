package data

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

type SidebarEntry struct {
	TitleKey       string  `yaml:"title_key"`
	AbsHref        *string `yaml:"abs_href,omitempty"`
	RawHref        *string `yaml:"raw_href,omitempty"`
	Icon           string  `yaml:"icon"`
	ActiveId       string  `yaml:"active_id"`
	HasNewUntilUtc int64   `yaml:"has_new_until_utc"`
}

var SidebarEntries []*SidebarEntry

func init() {
	fmt.Println("Initializing sidebar data...")

	sidebarFile, err := os.Open("./data/sidebar.yml")
	if err != nil {
		fmt.Printf("> Failed to open file: %s\n", "./data/sidebar.yml")
		panic(err)
	}
	defer func(sidebarFile *os.File) {
		err := sidebarFile.Close()
		if err != nil {
			fmt.Printf("> Failed to close file: %s\n", "./data/sidebar.yml")
			panic(err)
		}
	}(sidebarFile)

	decoder := yaml.NewDecoder(sidebarFile)
	decoder.KnownFields(false)

	err = decoder.Decode(&SidebarEntries)
	if err != nil {
		panic(fmt.Errorf("> Failed to decode YAML: %w\n", err))
	}

	entryCount := 0
	dividerCount := 0
	for iEntry, sidebarEntry := range SidebarEntries {
		if sidebarEntry.TitleKey == "" {
			SidebarEntries[iEntry] = nil
			dividerCount += 1
		} else {
			entryCount += 1
		}
	}

	fmt.Printf("> Loaded %d entries, and %d dividers\n", entryCount, dividerCount)
}
