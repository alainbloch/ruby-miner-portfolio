# CLAUDE.md — Web Application Best Practices

This document defines the coding standards, architecture principles, and workflow conventions.

---

## 1. Architecture Principles

### SOLID Principles

| Principle | Application |
|-----------|-------------|
| **Single Responsibility** | Each class/module has one reason to change. Controllers handle HTTP only; services contain business logic; models handle data. |
| **Open/Closed** | Extend behavior via composition/inheritance, not modification. Use interfaces/protocols for swappable implementations. |
| **Liskov Substitution** | Subtypes must be substitutable for their base types. Favor interfaces over concrete classes in dependencies. |
| **Interface Segregation** | Many small, focused interfaces > one large interface. Depend on abstractions, not concretions. |
| **Dependency Inversion** | High-level modules don't depend on low-level modules. Both depend on abstractions. Inject dependencies (constructor injection preferred). |

### Workflow

```bash
# 1. Start from updated main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feat/user-authentication

# 3. Work in small commits
git add -p
git commit -m "feat(auth): add JWT token generation"

# 4. Push and open PR
git push origin feat/user-authentication
# Open PR via GitHub UI or `gh pr create`

# 5. After review + CI pass: squash merge
# 6. Delete branch locally and remotely
git checkout main && git pull && git branch -d feat/user-authentication
```

### Commit Message Format (Conventional Commits)

```
<type>(<scope>): <imperative summary>

[optional body: motivation, context]

[optional footer: breaking changes, issue refs]
```

**Types:** `feat`, `fix`, `refactor`, `test`, `docs`, `chore`, `perf`, `style`

**Examples:**
```
feat(auth): add password reset flow
fix(cart): resolve race condition on concurrent updates
refactor(orders): extract pricing logic to service
test(services): add coverage for discount calculation
```
