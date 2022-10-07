Для создания индивидуального kernel, в терминале JupyterHub необходимо выполнить следующие команды:

1. Создайте virtual environment:

```bash
python3 -m venv set-name-of-venv
```

где `set-name-of-venv` — имя virtual environment.

2. Активируйте virtual environment:

```bash
source set-name-of-venv/bin/activate
```

3. Установите ipykernel:

```bash
pip install ipykernel
```

4. Создайте новый kernel:

```
python -m ipykernel install --user --name set-name-of-venv --display-name "Python (myenv)"
```

где `Python (myenv)` — имя нового kernel.

Вы можете задать произвольное имя для отображения kernel и virtual environment.
