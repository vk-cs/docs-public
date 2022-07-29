To create an individual kernel, run the following commands in the JupyterHub terminal:

1. Create a virtual environment:

```bash
python3 -m venv set-name-of-venv
```

where `set-name-of-venv` is the name of the virtual environment.

2. Activate the virtual environment:

```bash
source set-name-of-venv/bin/activate
```

3. Install ipykernel:

```bash
pip install ipykernel
```

4. Create a new kernel:

```
python -m ipykernel install --user --name set-name-of-venv --display-name "Python (myenv)"
```

where `Python (myenv)` is the name of the new kernel.

You can give an arbitrary name to display kernel and virtual environment.
