import * as fs from 'fs/promises';
import * as path from 'path';
import * as handlebars from 'handlebars';

const templatesDir = path.join(__dirname, '../../templates');

export async function renderTemplate(templateName: string, data: any): Promise<string> {
  try {
    const templatePath = path.join(templatesDir, `${templateName}.hbs`);
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = handlebars.compile(templateContent);
    return template(data);
  } catch (error) {
    console.error(`Error rendering template ${templateName}:`, error);
    throw error;
  }
} 