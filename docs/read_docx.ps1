Add-Type -AssemblyName System.IO.Compression.FileSystem

$docxPath = 'E:\project\docs\business.docx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.Entries | Where-Object { $_.FullName -eq 'word/document.xml' }
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$xmlContent = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()

$xmlDoc = [xml]$xmlContent
$nsMgr = New-Object System.Xml.XmlNamespaceManager($xmlDoc.NameTable)
$nsMgr.AddNamespace('w', 'http://schemas.openxmlformats.org/wordprocessingml/2006/main')

$paragraphs = $xmlDoc.SelectNodes('//w:p', $nsMgr)
foreach ($p in $paragraphs) {
    $texts = $p.SelectNodes('.//w:t', $nsMgr)
    $line = ""
    foreach ($t in $texts) {
        $line += $t.InnerText
    }
    if ($line.Trim() -ne "") {
        Write-Output $line
    }
}
