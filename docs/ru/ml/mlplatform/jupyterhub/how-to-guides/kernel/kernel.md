Для создания индивидуального kernel, в терминале JupyterHub необходимо выполнить следующие команды:

1. Создайте virtual environment:

```console
python3 -m venv set-name-of-venv
```

где `set-name-of-venv` — имя virtual environment.

2. Активируйте virtual environment:

```console
source set-name-of-venv/bin/activate
```

3. Установите ipykernel:

```console
pip install ipykernel
```

4. Создайте новый kernel:

```console
python -m ipykernel install --user --name set-name-of-venv --display-name "Python (myenv)"
```

где `Python (myenv)` — имя нового kernel.

Вы можете задать произвольное имя для отображения kernel и virtual environment.
