$body = @{username='testpatient2'; email='testpatient2@example.com'; password='pass123'; role='PATIENT'; phone='1234567890'}
$json = $body | ConvertTo-Json -Compress
Invoke-RestMethod -Uri 'http://localhost:8090/auth/register' -Method Post -Body $json -ContentType 'application/json' -Verbose
Write-Output 'Done'