
# Warranty API

A backend for warranty app


## Documentation


### Environment Variables

To run this project, you will need copy the .env.example as .env file


## Deployment

To deploy this project with docker

### Build
```
docker build -t warranty-api .
```

### Compose
```
docker-compose up -d
```


## API Reference
This API is using swagger as reference. To view the swagger you can access the url ```<APP URL>/api``` in browser.

You can also use Postman and import the ```Warranty Claims Management.postman_collection.json``` file.
## Usage/Examples
You can run without docker without
```
npm run start:dev
```

The API can be accessed from your localhost and port that you set in .env file
```
https://localhost:<APP_PORT>
```

