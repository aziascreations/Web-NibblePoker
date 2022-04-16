<?php
// Making sure the file is included and not accessed directly.
if(basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    header('HTTP/1.1 403 Forbidden');
    die();
}

// Classes
class ListingFile {
    public string $fileName;
    public int $fileSize;
    public string $absolutePath;

    function __construct($fileName, $fileSize, $absolutePath) {
        $this->fileName = $fileName;
        $this->fileSize = $fileSize;
        $this->absolutePath = $absolutePath;
    }
}

class ListingContainer {
    public string $relativePath;
    public array $subDirectories;
    public array $files;

    function __construct($relativePath) {
        $this->relativePath = $relativePath;
        $this->subDirectories = array();
        $this->files = array();
    }
}

// Functions.
function getDirectoryContent(string $dirPath, array $filteringRegexes, int $recursiveBudget, bool $validatePermission): ListingContainer {
    $returnedData = new ListingContainer("./");

    if($recursiveBudget == 0) {
        return $returnedData;
    }

    if($validatePermission) {
        if(!file_exists($dirPath . DIRECTORY_SEPARATOR . ".allow_listing")) {
            $returnedData->files[] = new ListingFile(
                "Directory listing isn't allowed !",
                -1,
                realpath($dirPath . DIRECTORY_SEPARATOR . ".allow_listing")
            );
            return $returnedData;
        }
    }

    foreach (scandir($dirPath) as $key => $value) {
        $path = realpath($dirPath . DIRECTORY_SEPARATOR . $value);
        if(is_file($path)) {
            $returnedData->files[] = new ListingFile(basename($path), filesize($path), realpath($path));
        } elseif($value != "." && $value != "..") {
            $returnedData->subDirectories[] = getDirectoryContent(
                $path,
                $filteringRegexes,
                $recursiveBudget - 1,
                false
            );
        }
    }

    return $returnedData;
}

?>
