# Monorepo using NX

## To create a new host-shell app
 ```sh
 nx g @nx/react:host --name=name-host-app --bundler=rspack --style=css --directory=apps/name-host-app --e2eTestRunner=none
 ```

After creating update the remotes and shared properties of the module-federation.config.ts file, similar to the apps/host-shell/module-federation.config.ts file, to make  it work with building

## To create a new remote app
```sh
nx g @nx/react:remote --name=remote_app_name --host=host-shell --bundler=rspack --directory=apps/remote-app-name --style=css --e2eTestRunner=none
```

After creating update the module-federation.config.ts file similar to the host-shell app

And after creating a new host or remote app, copy the tailwind.config.cjs, and postcss.config.cjs files from an existing app to the new app, and update the path if needed. Note: don't add any new styles in that file, we will update the style in the common file: lib/shared/ui/tailwind.config.cjs

## To generate a library
```sh
nx g @nx/react:lib --name=name-ui --directory=libs/shared/name-ui --importPath=@libs/shared/name-ui --style=css --builder=none
```
Currently, we have 2 libs are ui and theme.

- The theme will allow change mode: dark, light, and system, and update the color for each mode.
- UI: Where we will update or add new styles(update in the lib/shared/ui/tailwind.config.cjs or lib/shared/ui/src/lib/styles.css files), and where we will put the common components, such as Shadcn's components, custom InputText for form.

## To run app
- To run an app
```sh
nx run app-name:serve
```
- To run some apps
```sh
nx run-many --target=serve --projects=app1,app2,app3 --parallel
```
Currently, to run the host app, just run this command
```sh
npm start
```

## To build app
```sh
nx build app_name
```
Using flag --skip-nx-cache, if you want to skip caching

## Deploying
After deploying remote apps, update the remoteEntry.js url of that app for the host app
ex: CHART_REMOTE: char_remote_url/remoteEntry.js
Check the remotes property in the apps/host-shell/module-federation.config.ts file


## To scale an Nx monorepo with additional remotes, I would:

- Use Nx generators to scaffold new remotes (nx g @nx/react:remote)

- Register new remotes in the host’s module-federation.config.ts

- Extract shared code into libraries under libs/shared/ui

- Configure dynamic loading or remote URLs via env. Check the apps/host-shell/module-federation.config.ts file

- Leverage Nx caching and parallel builds for CI

- Deploy remotes independently and connect via URLs
