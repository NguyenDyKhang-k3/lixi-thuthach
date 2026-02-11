@echo off
echo ========================================
echo   Li Xi Thu Thach - Installation
echo ========================================
echo.

echo [1/3] Installing root dependencies...
call npm install
echo.

echo [2/3] Installing client dependencies...
cd client
call npm install
cd ..
echo.

echo [3/3] Installing server dependencies...
cd server
call npm install
cd ..
echo.

echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo To start the app, run:
echo   npm run dev
echo.
echo Or start separately:
echo   Frontend: cd client && npm run dev
echo   Backend:  cd server && npm run dev
echo.
pause
