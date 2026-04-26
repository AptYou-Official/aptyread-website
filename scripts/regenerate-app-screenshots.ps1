# Build WebP homepage assets from masters in assets/app-screenshots/
# Masters: NN_1242 x 2688.png → public/images/app-screenshots/NN.webp
$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent
Set-Location $root
npm run optimize:screenshots
