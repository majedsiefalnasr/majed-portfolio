# Default Open Graph Image

## Current Status

⚠️ **PLACEHOLDER IMAGE**: The current `default.png` is a 1x1 pixel placeholder. A proper branded image needs to be created.

## Requirements

Create a **1200x630 pixel** Open Graph image with the following specifications:

### Technical Requirements

- **Dimensions**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **Format**: PNG or JPEG
- **File size**: Under 1MB (ideally under 500KB)
- **Color mode**: RGB

### Content Requirements

- **Primary text**: "Majed Sief Alnasr"
- **Secondary text**: Professional tagline (e.g., "Full-Stack Developer & Software Engineer")
- **Branding**: Portfolio branding elements
- **Background**: Professional gradient or solid color matching brand
- **Typography**: Clear, readable fonts at small sizes

### Design Guidelines

- Text should be centered and clearly readable
- Use high contrast for text visibility
- Include subtle branding elements (logo, colors, patterns)
- Avoid putting critical text too close to edges (safe zone: 100px padding)
- Test how it looks at thumbnail sizes (200-400px wide)

## Tools to Create

### Option 1: Design Tools

- **Figma**: Use OG image templates (1200x630)
- **Canva**: Search for "Open Graph" templates
- **Adobe Photoshop/Illustrator**: Create custom design

### Option 2: Code-Based

- Use the provided `default.html` template
- Convert to PNG using:
  - Puppeteer/Playwright screenshot
  - Browser screenshot at exact dimensions
  - Online HTML-to-image converters

### Option 3: Online Generators

- [og-image.vercel.app](https://og-image.vercel.app)
- [OG Image Playground](https://www.opengraph.xyz/)
- Cloudinary's OG image generation

## Reference Files

- `default.svg`: Vector template (can be edited and exported)
- `default.html`: HTML template for screenshot conversion
- `default.png.todo`: Original TODO file with requirements

## Testing

After creating the image, test it on:

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Implementation

Once the proper image is created:

1. Replace `default.png` with the new 1200x630 image
2. Verify file size is under 1MB
3. Test on social media platforms
4. Update this README to mark as complete
