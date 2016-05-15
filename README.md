# ckx

To use Docker, and a local (persistent) RethinkDB datastore, execute

```
docker run -p 8181:8181 -v /Users/stian/src/wallcology/ckx/rethinkdb_data:/rethinkdb_data rethink
```

This exposes the website on port 8181, and shared the rethinkdb_data in the local directory. If you don't share the data with a local directory, it will be wiped on each docker restart.
