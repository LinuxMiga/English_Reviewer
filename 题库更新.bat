@echo off
start t2j.exe  # 启动 t2j.exe
timeout /t 2  # 等待 5 秒，可以根据需要调整等待时间

start insert.exe  # 启动 insert.exe
