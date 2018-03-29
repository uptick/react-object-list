#!/bin/bash
# set exit on exception
set -e

if [ "${TASK}" = "jest" ]; then
  yarn jest --coverage
fi

if [ "${TASK}" = "eslint" ]; then
  eslint src/
fi

if [ "${TASK}" = "build" ]; then
  yarn build
fi

if [ "${TASK}" = "nojsx" ]; then
  if find src -type f -name "*.jsx" | grep ".jsx"; then
    echo "Extension *.jsx is not encouraged on this project. Please use *.js"
    exit 1
  else
    echo "All good"
  fi
fi
