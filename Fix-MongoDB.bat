@echo off
echo ===================================================
echo     MongoDB Repair Script (Run as Administrator)
echo ===================================================
echo.

echo Stopping MongoDB Service if it's stuck...
net stop MongoDB

echo.
echo Deleting lock files...
del /q "C:\Program Files\MongoDB\Server\7.0\data\mongod.lock"
del /q "C:\Program Files\MongoDB\Server\7.0\data\WiredTiger.lock"

echo.
echo Running MongoDB Repair Process...
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\Program Files\MongoDB\Server\7.0\data" --repair

echo.
echo Repair finished! Starting MongoDB Service...
net start MongoDB

echo.
echo Done! Please close this window.
pause
