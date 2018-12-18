import { Rule, chain, noop, Tree } from '@angular-devkit/schematics';
import { Schema } from './schema';
import { buildComponent, findModuleFromOptions, addModuleImportToModule } from '@angular/cdk/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function modal(options: Schema): Rule {
  console.log('modal', options);
  return chain([
    buildComponent({...options}, {
      template: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.html',
      stylesheet: './__path__/__name@dasherize@if-flat__/__name@dasherize__.component.__styleext__',
    }),
    options.skipImport ? noop() : addDependencyToModule(options)
  ]);
}

let addDependencyToModule = (options: Schema) => {
  return (host: Tree) => {
    const modulePath = findModuleFromOptions(host, options)!;
    addModuleImportToModule(host, modulePath, 'OverlayModule', '@angular/cdk');
    return host;
  };
}