#!/usr/bin/env bash
npx ubcli initDB -u admin -p admin -drop -create &&  # -dba postgres -dbaPwd postgres # for postgres
npx ubcli generateDDL -u admin -p admin -autorun   &&
npx ubcli initialize -u admin -p admin