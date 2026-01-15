# Workflows: AI Content Generation Agent

**Purpose**: Complete step-by-step workflows for all content generation scenarios.

## Workflow Diagram Legend

```
┌─────────┐
│ Process │  = Step/Action
└─────────┘

◇ = Decision Point

→ = Flow Direction

[User] = User Action
[Agent] = Agent Action
[System] = System Operation
```

## Workflow 1: Full Blog Post Generation

```
[User] Initiates content generation in Copilot Chat
   ↓
[Agent] "What would you like to generate? 1. Blog post 2. Case study"
   ↓
[User] Selects "Blog post"
   ↓
[Agent] "Generate full content or metadata only?"
   ↓
[User] Selects "Full content"
   ↓
┌──────────────────────────┐
│ Metadata Collection Loop │
└──────────────────────────┘
   │
   ├─ [Agent] Asks for title
   ├─ [User] Provides title
   │
   ├─ [Agent] Asks for date (default: today)
   ├─ [User] Accepts default or provides custom
   │
   ├─ [Agent] Asks for author (default: from config)
   ├─ [User] Accepts default or provides custom
   │
   ├─ [Agent] Asks for tags
   ├─ [User] Provides comma-separated tags
   │
   ├─ [Agent] Asks for excerpt
   ├─ [User] Provides excerpt
   │
   ├─ [Agent] Asks for language (default: en)
   ├─ [User] Accepts default or selects ar
   │
   ├─ [Agent] Asks for content length
   ├─ [User] Selects short/medium/long
   │
   ├─ [Agent] Asks for writing tone
   └─ [User] Selects professional/conversational/technical/educational
   ↓
┌────────────────────┐
│ Validate Metadata  │
└────────────────────┘
   ↓
   ◇ Valid?
   │
   ├─ NO → [Agent] Shows errors → Returns to specific questions
   │
   └─ YES ↓
┌─────────────────────┐
│ Generate Content    │
│ (AI via Copilot)    │
└─────────────────────┘
   ↓
   ◇ Generation successful?
   │
   ├─ NO → [Agent] Shows error + retry option
   │         ↓
   │         [User] Retries or cancels
   │
   └─ YES ↓
┌─────────────────────┐
│ Show Preview        │
└─────────────────────┘
   ↓
[Agent] Displays generated content + file path
   ↓
[Agent] "What would you like to do? 1.Approve 2.Refine 3.Regenerate 4.Cancel"
   ↓
   ◇ User choice?
   │
   ├─ Refine → [Agent] Asks which section
   │            ↓
   │            [Agent] Regenerates that section
   │            ↓
   │            Returns to Preview
   │
   ├─ Regenerate → Returns to Generate Content
   │
   ├─ Cancel → [Agent] "Cancelled. Your inputs were not saved."
   │            ↓
   │            END
   │
   └─ Approve ↓
┌────────────────────┐
│ Check File Exists  │
└────────────────────┘
   ↓
   ◇ File exists?
   │
   ├─ YES → [Agent] Shows conflict warning
   │         ↓
   │         [Agent] "1.Rename 2.Overwrite 3.Cancel"
   │         ↓
   │         ◇ User choice?
   │         ├─ Rename → Generate new filename (slug-v2)
   │         ├─ Overwrite → Confirm + proceed
   │         └─ Cancel → END
   │
   └─ NO ↓
┌────────────────────┐
│ Write File         │
└────────────────────┘
   ↓
   ◇ Write successful?
   │
   ├─ NO → [Agent] Shows error (permissions, etc.)
   │         ↓
   │         [Agent] "Try again?"
   │         ↓
   │         Returns to Write File or END
   │
   └─ YES ↓
┌────────────────────┐
│ Success!           │
└────────────────────┘
   ↓
[Agent] "✅ File created at {path}"
[Agent] Shows next steps (edit, preview, commit)
   ↓
END
```

---

## Workflow 2: Metadata-Only Blog Post

```
[User] Initiates → [Agent] Content type → [User] Blog post
   ↓
[Agent] "Generate full content or metadata only?"
   ↓
[User] Selects "Metadata only"
   ↓
┌──────────────────────────┐
│ Metadata Collection Loop │
│ (Same as Workflow 1)     │
│ EXCEPT: Skip length/tone │
└──────────────────────────┘
   ↓
┌────────────────────┐
│ Validate Metadata  │
└────────────────────┘
   ↓
   ◇ Valid?
   ├─ NO → Show errors → Return to questions
   └─ YES ↓
┌────────────────────┐
│ Generate Metadata  │
│ (YAML frontmatter) │
└────────────────────┘
   ↓
[Agent] Shows metadata preview:
```

---

title: "..."
date: "..."
author: "..."
tags: [...]
excerpt: "..."
lang: "en"

---

## Write your content here...

```
   ↓
[Agent] "Approve this metadata?"
   ↓
   ◇ User approval?
   ├─ NO → [Agent] "Modify which field?" → Return to that question
   └─ YES ↓
┌────────────────────┐
│ Check File + Write │
│ (Same as Workflow 1)│
└────────────────────┘
   ↓
SUCCESS → [Agent] "✅ Metadata file created. Start writing your content!"
   ↓
END
```

---

## Workflow 3: Full Case Study Generation

```
[User] Initiates → [Agent] Content type → [User] Case study
   ↓
[Agent] "Generate full content or metadata only?"
   ↓
[User] Selects "Full content"
   ↓
┌──────────────────────────┐
│ Metadata Collection Loop │
└──────────────────────────┘
   │
   ├─ [Agent] Asks for title
   ├─ [User] Provides title
   │
   ├─ [Agent] Asks for client
   ├─ [User] Provides client name
   │
   ├─ [Agent] Asks for date
   ├─ [User] Provides or accepts default
   │
   ├─ [Agent] Asks for role
   ├─ [User] Provides role
   │
   ├─ [Agent] Asks for timeline
   ├─ [User] Provides timeline
   │
   ├─ [Agent] Asks for tags (technologies)
   ├─ [User] Provides tags
   │
   ├─ [Agent] Asks for excerpt
   ├─ [User] Provides excerpt
   │
   ├─ [Agent] Asks for featured image path
   ├─ [User] Provides path or accepts suggested
   │
   ├─ [Agent] "Should this be featured?"
   ├─ [User] Yes/No
   │   │
   │   └─ IF YES:
   │       ├─ [Agent] "Display order?"
   │       └─ [User] Provides number or default
   │
   ├─ [Agent] Asks for language
   ├─ [User] Provides or default
   │
   ├─ [Agent] "Include testimonial?"
   ├─ [User] Yes/No
   │   │
   │   └─ IF YES:
   │       ├─ [Agent] "Quote?"
   │       ├─ [User] Provides quote
   │       ├─ [Agent] "Author?"
   │       ├─ [User] Provides name
   │       ├─ [Agent] "Position?"
   │       └─ [User] Provides title
   │
   ├─ [Agent] "Include metrics?"
   ├─ [User] Yes/No
   │   │
   │   └─ IF YES:
   │       ├─ [Agent] "Label?"
   │       ├─ [User] Provides label
   │       ├─ [Agent] "Value?"
   │       ├─ [User] Provides value
   │       ├─ [Agent] "Add another metric?"
   │       └─ Loop until user says no
   │
   ├─ [Agent] "Content length?"
   ├─ [User] Selects short/medium/long
   │
   ├─ [Agent] "Writing tone?"
   ├─ [User] Selects tone
   │
   ├─ [Agent] "Describe the problem you solved (2-3 sentences)"
   ├─ [User] Provides problem description
   │
   ├─ [Agent] "Describe your solution approach (2-3 sentences)"
   ├─ [User] Provides solution description
   │
   ├─ [Agent] "Describe the results/outcomes (2-3 sentences)"
   └─ [User] Provides results description
   ↓
┌────────────────────┐
│ Validate Metadata  │
└────────────────────┘
   ↓
   ◇ Valid? → (Same flow as Workflow 1)
   ↓
┌─────────────────────┐
│ Generate Content    │
│ Using case study    │
│ template + context  │
└─────────────────────┘
   ↓
┌─────────────────────┐
│ Preview + Approval  │
│ (Same as Workflow 1)│
└─────────────────────┘
   ↓
┌────────────────────┐
│ Write File         │
│ (Same as Workflow 1)│
└────────────────────┘
   ↓
SUCCESS
```

---

## Workflow 4: Error Recovery

### Scenario: Validation Error

```
[System] Validation finds errors
   ↓
[Agent] Shows errors:
"❌ Invalid date: Date must be in YYYY-MM-DD format
 ❌ Invalid tags: At least one tag is required"
   ↓
[Agent] "Let's fix these issues."
   ↓
[Agent] "What date? (YYYY-MM-DD)"
   ↓
[User] Provides corrected date
   ↓
[Agent] "Tags? (comma-separated)"
   ↓
[User] Provides tags
   ↓
[System] Re-validates
   ↓
   ◇ Still has errors?
   ├─ YES → Show remaining errors → Continue fixing
   └─ NO → "✅ All fixed!" → Continue to generation
```

### Scenario: File Write Error

```
[System] Attempts file write → Fails (permission denied)
   ↓
[Agent] "❌ Unable to write file: Permission denied

Please check:
- File/folder permissions
- Disk space
- File is not open in another program

Try again?"
   ↓
   ◇ User wants to retry?
   ├─ YES → Returns to Write File step
   └─ NO → "Your content is preserved. You can retry later." → END
```

### Scenario: Network/Generation Error

```
[System] Calls Copilot API → Times out or fails
   ↓
[Agent] "❌ Content generation failed: Network timeout

I've preserved all your answers:
{Show collected metadata summary}

Options:
1. Retry - Attempt generation again
2. Modify - Change some answers
3. Cancel - Exit

Choose an option:"
   ↓
   ◇ User choice?
   ├─ Retry → Returns to Generate Content
   ├─ Modify → "Which field?" → Returns to that question
   └─ Cancel → END
```

---

## State Persistence

### During Active Session

**Preserved in Memory**:

- All question responses
- Current state
- Partial metadata
- Generation options

**User can**:

- Go back to previous questions
- Modify answers before validation
- Cancel and restart without losing context

### After File Creation

**No persistence needed**:

- File is the source of truth
- Session state cleared
- User can edit file directly in VS Code

---

## Next Steps

These workflows are implemented through:

1. GitHub Copilot Chat Agent (conversational orchestration)
2. Utility functions in `app/utils/content-generator/` (business logic)
3. Validation schemas in contracts (data validation)

See [quickstart.md](../quickstart.md) for developer implementation guide.
