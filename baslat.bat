@echo off
cd /d "%~dp0"
echo Mustafa Hali - Yeni Nesil Portfolyo Baslatiliyor...
start http://localhost:5174/
npm run dev -- --port 5174
pause
