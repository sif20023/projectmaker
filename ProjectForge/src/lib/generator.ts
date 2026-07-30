export function generateBlueprint(project: any): string {
  return JSON.stringify(project, null, 2);
}