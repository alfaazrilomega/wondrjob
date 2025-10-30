# TODO: Implement Job Details Page for Company Owner Dashboard

## Tasks
- [ ] Update src/app/dashboard/company-owner/[id]/page.tsx to use correct Next.js app router hooks and imports
- [ ] Fix types to match the API response (AvailablePosition model)
- [ ] Ensure proper data fetching from /api/jobs/[jobId]
- [ ] Display job details in a modern layout
- [ ] Add "Edit" button that navigates to /dashboard/company-owner/edit/[id]
- [ ] Handle loading and error states
- [ ] Test the page functionality

## Notes
- API route at src/app/api/jobs/[jobId]/route.ts is already implemented
- Edit page exists at src/app/dashboard/company-owner/edit/[id]/page.tsx
- Use 'use client' directive for client component
- Use useParams from 'next/navigation' instead of useRouter
