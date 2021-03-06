export interface Documentation {
  components: ComponentDocumentation[];
  directives: DirectiveDocumentation[];
  injectables: InjectableDocumentation[];
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
