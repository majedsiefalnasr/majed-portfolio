---
title: 'Building Type-Safe APIs with TypeScript and Zod'
date: 2026-01-15
author: 'Majed Sief Alnasr'
tags: ['typescript', 'api', 'zod', 'validation', 'backend']
excerpt: 'Learn how to build robust, type-safe APIs using TypeScript and Zod validation. Includes real-world examples and best practices for API development.'
lang: 'en'
---

## Introduction

Building robust APIs requires more than just functional code—it demands strong type safety and runtime validation. TypeScript provides compile-time type checking, but it can't validate data at runtime. This is where Zod comes in, offering a schema validation library that bridges the gap between static types and runtime validation.

In this post, we'll explore how to leverage both TypeScript and Zod to create APIs that are both type-safe and resilient to invalid data.

## Why Type Safety Matters in APIs

APIs are the backbone of modern applications, handling data exchange between services, clients, and databases. Without proper type safety:

- Invalid data can crash your application
- Security vulnerabilities emerge from unexpected input
- Debugging becomes a nightmare as bugs propagate through your system
- Documentation becomes outdated and unreliable

TypeScript solves the compile-time problem, but runtime validation is equally critical.

## Setting Up Zod

First, install Zod in your project:

```bash
npm install zod
# or
bun add zod
```

Zod provides a simple, chainable API for defining schemas:

```typescript
import {z} from 'zod'

// Define a schema
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2).max(50),
  age: z.number().int().min(18).optional(),
})

// Infer the TypeScript type
type User = z.infer<typeof UserSchema>
```

The beauty of Zod is that you define your schema once, and you get both:

1. Runtime validation
2. TypeScript type inference

## Building a Type-Safe API Endpoint

Let's build a complete API endpoint with full type safety:

```typescript
import {z} from 'zod'
import express, {Request, Response} from 'express'

// Define request body schema
const CreatePostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
  tags: z.array(z.string()).min(1).max(5),
  published: z.boolean().default(false),
})

// Infer TypeScript type
type CreatePostInput = z.infer<typeof CreatePostSchema>

// API endpoint
app.post('/api/posts', async (req: Request, res: Response) => {
  // Validate request body
  const result = CreatePostSchema.safeParse(req.body)

  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed',
      details: result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      })),
    })
  }

  // result.data is now fully typed!
  const postData: CreatePostInput = result.data

  try {
    const post = await database.posts.create(postData)
    return res.status(201).json(post)
  } catch (error) {
    return res.status(500).json({error: 'Internal server error'})
  }
})
```

## Advanced Validation Patterns

### Conditional Validation

```typescript
const ConditionalSchema = z
  .object({
    type: z.enum(['user', 'admin']),
    permissions: z.array(z.string()).optional(),
  })
  .refine(
    data => {
      // If type is 'admin', permissions are required
      if (data.type === 'admin') {
        return data.permissions && data.permissions.length > 0
      }
      return true
    },
    {message: 'Admin users must have at least one permission'}
  )
```

### Custom Validators

```typescript
const SlugSchema = z
  .string()
  .refine(value => /^[a-z0-9-]+$/.test(value), {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  })
```

### Transformations

```typescript
const DateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .transform(str => new Date(str))
```

## Middleware for Automatic Validation

Create reusable middleware for request validation:

```typescript
import {AnyZodObject} from 'zod'

function validateRequest(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors,
        })
      }
      next(error)
    }
  }
}

// Usage
app.post('/api/posts', validateRequest(CreatePostSchema), createPostHandler)
```

## Type-Safe Query Parameters

Don't forget to validate query parameters and path params:

```typescript
const QuerySchema = z.object({
  page: z.string().regex(/^\d+$/).transform(Number).default('1'),
  limit: z.string().regex(/^\d+$/).transform(Number).default('10'),
  sort: z.enum(['asc', 'desc']).default('asc'),
})

app.get('/api/posts', async (req, res) => {
  const query = QuerySchema.parse(req.query)

  // query is now { page: number, limit: number, sort: 'asc' | 'desc' }
  const posts = await database.posts.findMany({
    skip: (query.page - 1) * query.limit,
    take: query.limit,
    orderBy: {createdAt: query.sort},
  })

  res.json(posts)
})
```

## Best Practices

### 1. Co-locate Schemas with Routes

Keep your validation schemas close to the routes that use them:

```
api/
├── posts/
│   ├── posts.routes.ts
│   ├── posts.schemas.ts    ← Validation schemas here
│   └── posts.controller.ts
└── users/
    ├── users.routes.ts
    ├── users.schemas.ts
    └── users.controller.ts
```

### 2. Share Schemas Between Client and Server

Export your schemas for use in frontend applications:

```typescript
// shared/schemas/user.schema.ts
export const UserSchema = z.object({...})
export type User = z.infer<typeof UserSchema>

// Use in both:
// - server/api/users.ts
// - client/forms/UserForm.tsx
```

### 3. Use Discriminated Unions

For polymorphic data:

```typescript
const EventSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('click'),
    element: z.string(),
    coordinates: z.object({x: z.number(), y: z.number()}),
  }),
  z.object({
    type: z.literal('navigation'),
    url: z.string().url(),
  }),
])
```

### 4. Validate Early, Validate Often

- Validate at API boundaries (requests/responses)
- Validate external data sources (databases, third-party APIs)
- Validate user input before processing

## Performance Considerations

Zod validation is fast, but for high-throughput APIs:

1. **Cache parsed schemas**: Don't recreate schemas on every request
2. **Use `.safeParse()` instead of `.parse()`**: Avoids throwing exceptions
3. **Validate only what's necessary**: Don't over-validate internal operations

## Error Handling Patterns

Provide clear, actionable error messages:

```typescript
function formatZodError(error: z.ZodError) {
  return error.errors.map(err => ({
    field: err.path.join('.'),
    message: err.message,
    code: err.code,
  }))
}

// Usage
if (!result.success) {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    details: formatZodError(result.error),
  })
}
```

## Conclusion

Combining TypeScript and Zod provides a powerful foundation for building type-safe APIs:

- **Compile-time safety**: TypeScript catches type errors before deployment
- **Runtime validation**: Zod ensures data integrity at runtime
- **Type inference**: Write schemas once, get types automatically
- **Developer experience**: Clear error messages and autocomplete

By adopting these patterns, you'll build more robust, maintainable APIs that catch errors early and provide clear feedback to API consumers.

### Key Takeaways

1. Always validate external data with Zod
2. Use TypeScript type inference from Zod schemas
3. Create reusable validation middleware
4. Provide detailed error messages for failed validations
5. Share schemas between client and server when possible

### Next Steps

- Explore Zod's advanced features (transforms, refinements, preprocessors)
- Integrate with OpenAPI/Swagger for auto-generated documentation
- Try tRPC for end-to-end type safety without manual schema definitions

Happy coding! 🚀
