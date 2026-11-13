@echo off
cd /d "C:\Users\smardon\Desktop\karios"

:: Set PATH to include Git
set PATH=%PATH%;C:\Program Files\Git\bin;C:\Program Files\Git\cmd

:: Initialize git
git init

:: Add all files
git add -A

:: Commit changes
git commit -m "Add Karios dashboard files"

:: Set remote origin
git remote add origin https://github.com/adenipekunmighty15-sudo/karios-app.git

:: Rename branch to main
git branch -M main

:: Pull from remote (allow unrelated histories)
git pull origin main --allow-unrelated-histories

:: Push to remote
git push -u origin main

echo.
echo ================================
echo Git push completed successfully!
echo ================================
echo.
pause