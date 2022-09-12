import { HttpClientModule } from '@angular/common/http';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { ReferencesComponent } from './components/references/references.component';
import { StylingTableComponent } from './components/styling-table/styling-table.component';

export const ComponentPageModule = [ReferencesComponent, CodeExampleComponent, StylingTableComponent, HttpClientModule];

export type Documentation = {
  components: ComponentDocumentation[];
  directives: DirectiveDocumentation[];
  injectables: InjectableDocumentation[];
  interfaces: InterfaceDocumentation[];
};

export type ComponentDocumentation = {
  inputsClass: {
    defaultValue: string;
    deprecated: boolean;
    deprecationMessage: string;
    description?: string;
    line: number;
    name: string;
    type: string;
  }[];
  methodsClass?: MethodDocumentation[];
  name: string;
  outputsClass: {
    deprecated: false;
    deprecationMessage: '';
    description?: string;
    name: string;
  }[];
};

export type DirectiveDocumentation = {
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  inputsClass: {
    defaultValue: string;
    deprecated: boolean;
    deprecationMessage: string;
    description?: string;
    name: string;
    type: string;
  }[];
  methodsClass?: MethodDocumentation[];
  name: string;
  outputsClass: {
    deprecated: false;
    deprecationMessage: '';
    description?: string;
    name: string;
  }[];
  rawdescription: string;
  selector: string;
};

export type InjectableDocumentation = {
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  methods?: MethodDocumentation[];
  name: string;
  properties: {
    defaultValue: any;
    deprecated: boolean;
    deprecationMessage: string;
    description: string;
    modifierKind: ModifierType[];
    name: string;
    optional: boolean;
    type: string;
  }[];
  rawdescription: string;
};

export type APIConfig = {
  components?: string[];
  directives?: string[];
  interfaces?: string[];
  services?: string[];
};

export enum ModifierType {
  Private = 121,
  Protected = 122,
  Public = 123,
  Readonly = 144,
}

export type MethodDocumentation = {
  args: {
    deprecated: boolean;
    deprecationMessage: string;
    name: string;
    type: string;
  }[];
  deprecated: boolean;
  deprecationMessage: boolean;
  description?: string;
  line: number;
  modifierKind: ModifierType[];
  name: string;
  optional: boolean;
  returnType: string;
};

export type InterfaceDocumentation = {
  deprecated: boolean;
  deprecationMessage: string;
  file: string;
  id: string;
  name: string;
  properties: {
    deprecated: boolean;
    deprecationMessage: string;
    description: string;
    line: number;
    name: string;
    optional: boolean;
    type: string;
  }[];
  sourceCode: string;
  type: string;
};
