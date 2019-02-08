#!/usr/bin/env bash
echo '---initDB---' &&
npx ubcli initDB -u admin -p admin -drop -create &&  # -dba postgres -dbaPwd postgres # for postgres
echo '---generateDDL---' &&
npx ubcli generateDDL -u admin -p admin -autorun &&
echo '---initialize---' &&
npx ubcli initialize -u admin -p admin