# {heading(Жеке kernel жасау)[id=mlplatform-jupyterhub-htg-kernel]}

{include(/kz/_includes/_translated_by_ai.md)}

Жеке kernel жасау үшін JupyterHub терминалында келесі командаларды орындау қажет:

1. virtual environment жасаңыз:

```console
python3 -m venv set-name-of-venv
```

мұндағы `set-name-of-venv` — virtual environment атауы.

2. virtual environment-ті белсендіріңіз:

```console
source set-name-of-venv/bin/activate
```

3. ipykernel орнатыңыз:

```console
pip install ipykernel
```

4. Жаңа kernel жасаңыз:

```console
python -m ipykernel install --user --name set-name-of-venv --display-name "Python (myenv)"
```

мұндағы `Python (myenv)` — жаңа kernel атауы.

kernel мен virtual environment үшін еркін көрсетілетін атау бере аласыз.
