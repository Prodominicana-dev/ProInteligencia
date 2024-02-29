export default interface AccesoaMercado {
  id: string;
  countryId: number;
  productId: number;
  tradeAgreement: String; // Acuerdo comercial
  tariffsImposed: String; // Aranceles impuestos
  webResource: String; // Recurso web
  technicalRequirements: String; // Requisitos técnicos
  permitsCertifications: String; // Permisos y certificaciones
  labelingCertifications: String; // Etiquetado y certificaciones
  outputRequirement: String; // Requisitos de salida
  importRequirement: String; // Requisitos de importación
  date: Date;
}
