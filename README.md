
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with some additional packages.

## Tasks
Create endpoints based on api spec. 

There are three endpoints in the api spec, but feel free to create more on your own.
You can use any database or similar, to do your requests.

## Requirements

```bash
- Install Docker on your machine
- Install node_modules, see Installation
- Generate and build OpenApi Spec
```
## Installation
For node_modules:
```bash
$ yarn install
```

## Generate Api Spec
```bash
$ ./scripts/generate-openapi.sh
$ yarn build:openapi
```
## Running the app

```bash
# development
$ yarn start
```

## Test

```bash
# unit tests
$ yarn test
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
