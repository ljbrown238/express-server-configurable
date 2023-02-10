# Test Server

Express server that has endpoints for testing.

### Data
Data is stored in the data.json file

### POST / WITHOUT DATA resets data.json to hold:

```JSON
{ state: 1 }
```

### POST / WITH DATA sets data.json to hold the req.body value:

```JSON
{ state: 4 }
```


### GET / returns data from the data.json file

```JSON
{ state: 4 }
```

### /data1 returns {data:1}

```JSON
{ data: 1 }
```

### /data2 returns {data:2}

```JSON
{ data: 2 }
```

### /slow-by-state-seconds returns data.json data AFTER delaying (1s x data.state)
#### If 'state' value is 4, then there is a four second delay.

```JSON
{ state: 4 }
```



# express-server-configurable
