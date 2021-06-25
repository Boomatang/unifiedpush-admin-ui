# Dummy updates

# Unified Push Admin UI

This is the admin interface for the AeroGear Unified Push Server. It is run alongside Unified Push.

## Local Development

### `npm install`
This project requires a recent version of the NPM tool chain.

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Contributing and Releases

This project follows conventional comments and semantic versioning. Every commit to master is automatically versioned and tagged. GitHub released tags automatically get built as containers and uploaded as an image to our [Quay repository](https://quay.io/repository/aerogear/unifiedpush-admin-ui).

### Container information

The container requires the Unified Push server be routable. You need to set the `UPS_HOST` environment variable to run the container. When running, the container exposes the admin ui on port 80.

### Building the Container

We provide an automatically released container in our [Quay repository](https://quay.io/repository/aerogear/unifiedpush-admin-ui). To build the container locally, use `./container/Dockerfile` with the context of the project root.

For example,

`podman build -t ups-ui -f ./container/Dockerfile .`
