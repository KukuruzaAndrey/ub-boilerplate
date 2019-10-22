set UB_HOST=http://localhost:8881
set UB_USER=admin
set UB_PWD=admin
call npx ubcli createStore
call npx ubcli initDB -drop -create cd
@if errorlevel 1 goto err
call npx ubcli generateDDL -autorun
@if errorlevel 1 goto err
call npx ubcli initialize
@goto eof

:err
echo Something wrong

:eof