import { HttpClientModule } from '@angular/common/http';
import { CodeExampleComponent } from './components/code-example/code-example.component';
import { ImportExampleComponent } from './components/import-example/import-example.component';
import { InputsTableComponent } from './components/inputs-table/inputs-table.component';
import { ReferencesComponent } from './components/references/references.component';
import { StylingTableComponent } from './components/styling-table/styling-table.component';

export const ComponentPageModule = [
  ReferencesComponent,
  CodeExampleComponent,
  ImportExampleComponent,
  InputsTableComponent,
  StylingTableComponent,
  HttpClientModule,
];

export interface Documentation {
  components: ComponentDocumentation[];
  directives: DirectiveDocumentation[];
  injectables: InjectableDocumentation[];
  interfaces: InterfaceDocumentation[];
}

export interface ComponentDocumentation {
  name: string;
  inputsClass: {
    name: string;
    deprecated: boolean;
    deprecationMessage: string;
    line: number;
    type: string;
    defaultValue: string;
    description?: string;
  }[];
  outputsClass: {
    name: string;
    deprecated: false;
    deprecationMessage: '';
    description?: string;
  }[];
  methodsClass?: MethodDocumentation[];
}

export interface DirectiveDocumentation {
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  inputsClass: {
    defaultValue: string;
    deprecated: boolean;
    deprecationMessage: string;
    name: string;
    type: string;
    description?: string;
  }[];
  outputsClass: {
    name: string;
    deprecated: false;
    deprecationMessage: '';
    description?: string;
  }[];
  name: string;
  rawdescription: string;
  selector: string;
  methodsClass?: MethodDocumentation[];
}

export interface InjectableDocumentation {
  deprecated: boolean;
  deprecationMessage: string;
  description: string;
  name: string;
  properties: {
    defaultValue: any;
    deprecated: boolean;
    deprecationMessage: string;
    description: string;
    name: string;
    optional: boolean;
    type: string;
    modifierKind: ModifierType[];
  }[];
  rawdescription: string;
  methods?: MethodDocumentation[];
}

export interface APIConfig {
  components?: string[];
  directives?: string[];
  services?: string[];
  interfaces?: string[];
}

export enum ModifierType {
  Private = 121,
  Protected = 122,
  Public = 123,
  Readonly = 144,
}

export interface MethodDocumentation {
  name: string;
  description?: string;
  args: {
    name: string;
    type: string;
    deprecated: boolean;
    deprecationMessage: string;
  }[];
  optional: boolean;
  returnType: string;
  line: number;
  deprecated: boolean;
  deprecationMessage: boolean;
  modifierKind: ModifierType[];
}

export interface InterfaceDocumentation {
  name: string;
  id: string;
  file: string;
  deprecated: boolean;
  deprecationMessage: string;
  type: string;
  sourceCode: string;
  properties: {
    name: string;
    deprecated: boolean;
    deprecationMessage: string;
    type: string;
    optional: boolean;
    description: string;
    line: number;
  }[];
}
