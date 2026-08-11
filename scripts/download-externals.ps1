
Push-Location $PSScriptRoot
Set-Location $PSScriptRoot


Write-Output ""
Write-Output "Handling decimal.js"
Write-Output "-------------------"

Write-Output "Preparing directories"
New-Item -Path "../static/resources/" -Force -Name "DecimalJs" -ItemType Directory | Out-Null
New-Item -Path "../static/resources/DecimalJs" -Force -Name "10.6.0" -ItemType Directory | Out-Null

Write-Output "Downloading v10.6.0"
Invoke-WebRequest "https://github.com/MikeMcl/decimal.js/archive/refs/tags/v10.6.0.zip" `
                  -OutFile "../static/resources/DecimalJs/v10.6.0.zip"


Write-Output ""
Write-Output "Handling decimal.js-light"
Write-Output "-------------------------"

Write-Output "Preparing directories"
New-Item -Path "../static/resources/" -Force -Name "DecimalJs-Light" -ItemType Directory | Out-Null
New-Item -Path "../static/resources/DecimalJs-Light/" -Force -Name "2.5.1" -ItemType Directory | Out-Null

Write-Output "Downloading v2.5.1"
Invoke-WebRequest "https://github.com/MikeMcl/decimal.js-light/archive/refs/tags/v2.5.1.zip" `
                  -OutFile "../static/resources/DecimalJs-Light/v2.5.1.zip"


Write-Output ""
Write-Output "Handling SortableJS"
Write-Output "-------------------"

Write-Output "Preparing directories"
New-Item -Path "../static/resources/" -Force -Name "SortableJS" -ItemType Directory | Out-Null
New-Item -Path "../static/resources/SortableJS/" -Force -Name "1.15.6" -ItemType Directory | Out-Null

Write-Output "Downloading v1.15.6"
Invoke-WebRequest "https://github.com/SortableJS/Sortable/archive/refs/tags/1.15.6.zip" `
                  -OutFile "../static/resources/SortableJS/1.15.6.zip"


Write-Output $PSScriptRoot

Pop-Location
