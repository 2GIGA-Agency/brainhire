@echo off
REM Запуск dev-сервера BRaiN HR Next.js. Двойной клик из проводника.
REM PATH перечитываем из реестра, чтобы Node.js нашёлся даже в свежей сессии.

cd /d "%~dp0"

for /f "usebackq tokens=2*" %%a in (`reg query "HKCU\Environment" /v Path 2^>nul ^| find "Path"`) do set "USER_PATH=%%b"
for /f "usebackq tokens=2*" %%a in (`reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path 2^>nul ^| find "Path"`) do set "SYS_PATH=%%b"
set "PATH=%SYS_PATH%;%USER_PATH%"

echo ============================================================
echo BRaiN HR Next.js — dev server
echo Open: http://localhost:3000/solutions/it
echo Stop: Ctrl+C in this window
echo ============================================================
echo.

call npm run dev
pause
