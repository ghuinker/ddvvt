#!/usr/bin/env python
from setuptools import setup, find_packages

setup(
    name='{{ project_name }}',
    package_dir={'': 'src'},
    packages=find_packages('src'))
