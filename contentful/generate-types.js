/**
 * Contentful Type Generator
 * 
 * This script fetches content models from Contentful and generates TypeScript types.
 * Run with: npm run generate-types
 * 
 * Prerequisites:
 * - CONTENTFUL_SPACE_ID must be set in .env.local
 * - CONTENTFUL_MANAGEMENT_TOKEN must be set in .env.local
 */

require('dotenv').config({ path: '.env' });
const fs = require('fs');
const path = require('path');

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

if (!SPACE_ID || !MANAGEMENT_TOKEN) {
  console.error('❌ Missing required environment variables:');
  console.error('   - CONTENTFUL_SPACE_ID');
  console.error('   - CONTENTFUL_MANAGEMENT_TOKEN');
  console.error('\nPlease add these to your .env.local file and try again.');
  process.exit(1);
}

// Contentful Management API client
class ContentfulTypeGenerator {
  constructor() {
    this.spaceId = SPACE_ID;
    this.managementToken = MANAGEMENT_TOKEN;
    this.baseUrl = `https://api.contentful.com/spaces/${this.spaceId}`;
  }

  async fetchContentTypes() {
    console.log('📡 Fetching content types from Contentful...\n');

    const response = await fetch(`${this.baseUrl}/content_types`, {
      headers: {
        Authorization: `Bearer ${this.managementToken}`,
        'Content-Type': 'application/vnd.contentful.management.v1+json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to fetch content types: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return data.items;
  }

  mapContentfulTypeToTypeScript(field) {
    const { type, linkType, items, validations } = field;

    switch (type) {
      case 'Symbol':
        return 'string';
      case 'Text':
        return 'string';
      case 'Integer':
        return 'number';
      case 'Number':
        return 'number';
      case 'Boolean':
        return 'boolean';
      case 'Date':
        return 'string'; // ISO date string
      case 'Location':
        return '{ lat: number; lon: number }';
      case 'RichText':
        return 'any'; // Rich text is complex, could use a proper type
      case 'Link':
        if (linkType === 'Asset') {
          return 'ContentfulImage | null';
        }
        if (linkType === 'Entry') {
          // Check if there's a validation for specific content types
          const contentTypeValidation = validations?.find(
            v => v.linkContentType
          );
          if (contentTypeValidation?.linkContentType?.length > 0) {
            if (contentTypeValidation.linkContentType.length === 1) {
              return `${this.pascalCase(contentTypeValidation.linkContentType[0])} | null`;
            }
            // Handle multiple content types - create a union type
            const types = contentTypeValidation.linkContentType
              .map(ct => this.pascalCase(ct))
              .join(' | ');
            return `(${types}) | null`;
          }
          return 'ContentfulEntry | null';
        }
        return 'any';
      case 'Array':
        if (items?.type === 'Link') {
          if (items.linkType === 'Asset') {
            return 'ContentfulImage[]';
          }
          if (items.linkType === 'Entry') {
            const contentTypeValidation = items.validations?.find(
              v => v.linkContentType
            );
            if (contentTypeValidation?.linkContentType?.length > 0) {
              if (contentTypeValidation.linkContentType.length === 1) {
                return `${this.pascalCase(contentTypeValidation.linkContentType[0])}[]`;
              }
              // Handle multiple content types - create a union type
              const types = contentTypeValidation.linkContentType
                .map(ct => this.pascalCase(ct))
                .join(' | ');
              return `(${types})[]`;
            }
            return 'ContentfulEntry[]';
          }
          return 'any[]';
        }
        if (items?.type === 'Symbol') {
          return 'string[]';
        }
        return 'any[]';
      default:
        return 'any';
    }
  }

  pascalCase(str) {
    return str
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s/g, '');
  }

  camelCase(str) {
    return str
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace(/\s/g, '')
      .replace(/^[A-Z]/, l => l.toLowerCase());
  }

  generateTypeScriptInterface(contentType) {
    const { sys, name, fields } = contentType;
    const interfaceName = this.pascalCase(sys.id);

    let ts = `// ${name}\n`;
    ts += `// Description: ${contentType.description || 'No description'}\n`;
    ts += `export interface ${interfaceName} extends ContentfulEntry {\n`;

    fields.forEach(field => {
      const fieldName = this.camelCase(field.id);
      const fieldType = this.mapContentfulTypeToTypeScript(field);
      const optional = !field.required ? '?' : '';
      
      ts += `  ${fieldName}${optional}: ${fieldType};\n`;
    });

    ts += `}\n\n`;

    return ts;
  }

  generateTypeScriptFile(contentTypes) {
    let ts = `// Auto-generated TypeScript types from Contentful content models\n`;
    ts += `// Generated on: ${new Date().toISOString()}\n`;
    ts += `// Do not edit manually - use npm run generate-types to regenerate\n\n`;

    ts += `// Base types\n`;
    ts += `export interface ContentfulEntry {\n`;
    ts += `  sys: {\n`;
    ts += `    id: string;\n`;
    ts += `    type: string;\n`;
    ts += `    createdAt: string;\n`;
    ts += `    updatedAt: string;\n`;
    ts += `    locale: string;\n`;
    ts += `  };\n`;
    ts += `}\n\n`;

    ts += `export interface ContentfulImage {\n`;
    ts += `  sys: {\n`;
    ts += `    id: string;\n`;
    ts += `    type: 'Asset';\n`;
    ts += `  };\n`;
    ts += `  fields: {\n`;
    ts += `    title: string;\n`;
    ts += `    description?: string;\n`;
    ts += `    file: {\n`;
    ts += `      url: string;\n`;
    ts += `      details: {\n`;
    ts += `        size: number;\n`;
    ts += `        image?: {\n`;
    ts += `          width: number;\n`;
    ts += `          height: number;\n`;
    ts += `        };\n`;
    ts += `      };\n`;
    ts += `      fileName: string;\n`;
    ts += `      contentType: string;\n`;
    ts += `    };\n`;
    ts += `  };\n`;
    ts += `}\n\n`;

    // Generate interfaces for each content type
    contentTypes.forEach(contentType => {
      ts += this.generateTypeScriptInterface(contentType);
    });

    return ts;
  }

  async generate() {
    try {
      const contentTypes = await this.fetchContentTypes();
      console.log(`✅ Found ${contentTypes.length} content types\n`);

      const typescriptCode = this.generateTypeScriptFile(contentTypes);

      const outputPath = path.join(__dirname, '..', 'src', 'types', 'contentTypes.ts');
      fs.writeFileSync(outputPath, typescriptCode, 'utf-8');

      console.log(`✅ TypeScript types generated successfully!\n`);
      console.log(`📄 Output: ${outputPath}\n`);
      console.log('Generated interfaces:');
      contentTypes.forEach(ct => {
        console.log(`  - ${this.pascalCase(ct.sys.id)} (${ct.name})`);
      });
      console.log('\nYou can now use these types in your application.');
    } catch (error) {
      console.error('❌ Failed to generate types:', error.message);
      if (error.details) {
        console.error('\nDetails:', error.details);
      }
      process.exit(1);
    }
  }
}

// Run the generator
const generator = new ContentfulTypeGenerator();
generator.generate();
