# CV App Adaptation for Psychologist - TODO List

## Project Overview

Adapting the existing developer CV app for a psychologist. This involves content changes, visual customization, and structure modifications to make it appropriate for a psychology professional.

## Progress Tracking

- 🟩 Completed
- 🟨 In Progress
- 🟥 Not Started
- ❌ Skipped/Not Applicable

---

## Phase 1: Content Adaptation 📝

### 1.1 Personal Information Updates

- [ ] 🟥 **Update `src/lib/data/cv.json` - Basic Information**

  - [ ] Replace name, title (e.g., "Clinical Psychologist", "Licensed Therapist")
  - [ ] Update email, phone, location
  - [ ] Write professional summary for psychology field
  - [ ] Replace profile image with professional headshot
  - [ ] Update website URL (if applicable)

- [ ] 🟥 **Update `src/lib/data/cv.json` - Social Profiles**
  - [ ] Remove GitHub, gitconnected profiles
  - [ ] Keep/update LinkedIn profile
  - [ ] Add Psychology Today profile (if applicable)
  - [ ] Add professional association memberships
  - [ ] Remove developer-specific fields (karma, followers, etc.)

### 1.2 Experience Data Adaptation

- [ ] 🟥 **Replace `src/lib/data/experience.json` with psychology experience**
  - [ ] Clinical positions (hospitals, clinics, private practice)
  - [ ] Internships and residencies
  - [ ] Consulting or specialized work
  - [ ] Teaching positions (if applicable)
  - [ ] Supervision roles
  - [ ] Update company logos with healthcare/psychology organizations
  - [ ] Replace technical skills with relevant psychology skills per role
  - [ ] Update achievements to reflect psychology accomplishments

### 1.3 Education Updates

- [ ] 🟥 **Update `src/lib/data/education.json` with psychology education**
  - [ ] Psychology degree(s) (Bachelor's, Master's, PhD, PsyD)
  - [ ] Professional licenses and certifications
  - [ ] Continuing education requirements
  - [ ] Specialized training programs
  - [ ] Professional development courses
  - [ ] Research experience (if applicable)

### 1.4 Skills Revision

- [ ] 🟥 **Replace `src/lib/data/skills.json` with psychology skills**
  - [ ] Therapeutic approaches (CBT, DBT, EMDR, etc.)
  - [ ] Assessment and testing tools
  - [ ] Specialized populations (children, adults, couples, etc.)
  - [ ] Languages spoken
  - [ ] Software/tools used in practice
  - [ ] Research methodologies (if applicable)

### 1.5 Projects Section Decision & Implementation

- [ ] 🟥 **Decide on projects section approach:**
  - [ ] Option A: Case studies (anonymized and HIPAA-compliant)
  - [ ] Option B: Research projects and publications
  - [ ] Option C: Community programs and workshops
  - [ ] Option D: Remove projects section entirely
- [ ] 🟥 **Update `src/lib/data/projects.json` based on chosen approach**
  - [ ] Replace technical projects with relevant psychology content
  - [ ] Update project images with appropriate visuals
  - [ ] Remove GitHub links, replace with relevant professional links
  - [ ] Update technology stack with relevant tools/methodologies

---

## Phase 2: Visual Customization 🎨

### 2.1 Color Scheme Customization

- [ ] 🟥 **Research and choose psychology-appropriate color palette**

  - [ ] Consider calming, trustworthy colors (blues, greens, warm neutrals)
  - [ ] Research color psychology for professional branding
  - [ ] Ensure accessibility and contrast requirements

- [ ] 🟥 **Update CSS variables in `src/app.css`**
  - [ ] Replace `--color-vasco-100` through `--color-vasco-900`
  - [ ] Test color changes across all components
  - [ ] Update dark mode colors accordingly
  - [ ] Verify print styles still work with new colors

### 2.2 Typography and Branding

- [ ] 🟥 **Update brand name references throughout codebase**

  - [ ] Search and replace "Vasco" references in components
  - [ ] Update `src/lib/components/Hero.svelte` greeting
  - [ ] Update `src/lib/components/Footer.svelte` copyright text
  - [ ] Update `src/lib/components/Navbar.svelte` logo and branding

- [ ] 🟥 **Professional imagery updates**
  - [ ] Replace logo with psychology professional logo/initials
  - [ ] Update favicon files in `static/` directory
  - [ ] Consider psychology-themed background elements

### 2.3 Hero Section Customization

- [ ] 🟥 **Modify `src/lib/components/Hero.svelte`**
  - [ ] Update greeting text for psychology professional
  - [ ] Adjust professional messaging and tone
  - [ ] Consider psychology-specific imagery or icons
  - [ ] Update call-to-action buttons for psychology context

---

## Phase 3: Content Structure Adjustments 🏗️

### 3.1 Component Text Updates

- [ ] 🟥 **Review and update all component text**
  - [ ] `src/lib/components/Hero.svelte` - Professional introduction
  - [ ] `src/lib/components/Experiences.svelte` - Section headers and labels
  - [ ] `src/lib/components/Schools.svelte` - Education section terminology
  - [ ] `src/lib/components/Skills.svelte` - Skills presentation
  - [ ] `src/lib/components/Projects.svelte` - Projects/research section
  - [ ] `src/lib/components/Contact.svelte` - Contact preferences

### 3.2 Professional Language Adaptation

- [ ] 🟥 **Replace technical terminology with psychology terminology**
  - [ ] Developer → Psychologist/Therapist/Clinician
  - [ ] Technical skills → Clinical skills/Therapeutic approaches
  - [ ] Projects → Research/Case studies/Programs
  - [ ] Review all hardcoded text for professional appropriateness

### 3.3 Contact Section Enhancement

- [ ] 🟥 **Modify `src/lib/components/Contact.svelte`**
  - [ ] Add office hours or consultation information
  - [ ] Include professional contact preferences
  - [ ] Consider HIPAA-compliant contact methods
  - [ ] Add location/practice information if relevant

---

## Phase 4: Technical Customization ⚙️

### 4.1 SEO and Meta Information

- [ ] 🟥 **Update meta tags and SEO**
  - [ ] Page titles and descriptions in route files
  - [ ] Keywords relevant to psychology practice
  - [ ] Professional psychology-focused content
  - [ ] Update `src/app.html` meta information

### 4.2 Print CV Optimization

- [ ] 🟥 **Review and adjust print styles in `src/app.css`**
  - [ ] Ensure psychology CV format is professional
  - [ ] Check that all relevant sections print correctly
  - [ ] Optimize for standard CV length expectations
  - [ ] Test print layout with new content structure

### 4.3 Analytics and Privacy

- [ ] 🟥 **Review `src/lib/services/analytics.ts`**
  - [ ] Ensure compliance with psychology practice regulations
  - [ ] Consider patient privacy implications
  - [ ] Update or remove analytics tracking as appropriate
  - [ ] Add privacy policy considerations

---

## Phase 5: Content Creation Support 📋

### 5.1 Content Gathering

- [ ] 🟥 **Create content collection process**
  - [ ] Interview psychologist for work experience details
  - [ ] Gather education and certification information
  - [ ] Document skills and specializations
  - [ ] Collect professional achievements and credentials
  - [ ] Determine contact and consultation preferences

### 5.2 Professional Assets

- [ ] 🟥 **Arrange for professional materials**
  - [ ] Professional headshot photography
  - [ ] Logo design (if needed)
  - [ ] Professional color scheme consultation
  - [ ] Copy review for professional tone

---

## Phase 6: Testing and Launch 🚀

### 6.1 Content Review

- [ ] 🟥 **Comprehensive content review**
  - [ ] Professional tone and accuracy check
  - [ ] Compliance with psychology ethics guidelines
  - [ ] Appropriate terminology verification
  - [ ] Remove all technical jargon
  - [ ] Proofread all text content

### 6.2 Technical Testing

- [ ] 🟥 **Cross-device and functionality testing**
  - [ ] Mobile responsiveness testing
  - [ ] Print layout verification
  - [ ] Dark/light mode functionality
  - [ ] All interactive elements testing
  - [ ] Performance optimization check

### 6.3 Launch Preparation

- [ ] 🟥 **Deployment readiness**
  - [ ] Domain name selection and setup
  - [ ] Hosting configuration
  - [ ] SSL certificate installation
  - [ ] Contact form functionality (if applicable)
  - [ ] Final pre-launch review

---

## Quick Start Checklist 🎯

### Immediate Priority Items (Start Here)

1. [ ] 🟥 **Gather all psychologist's information** (Phase 5.1)
2. [ ] 🟥 **Choose color scheme** (Phase 2.1)
3. [ ] 🟥 **Start updating `cv.json` with basic info** (Phase 1.1)
4. [ ] 🟥 **Update Hero component greeting** (Phase 2.3)

### Development Workflow

1. Make changes to data files first
2. Update components and styling
3. Test changes locally with `yarn dev`
4. Commit changes incrementally
5. Review and iterate

---

## Notes and Considerations

### Privacy and Ethics

- Ensure all content complies with psychology practice ethics
- No patient information or identifiable case details
- HIPAA compliance for any contact methods
- Professional association guidelines adherence

### Professional Standards

- Maintain professional tone throughout
- Use appropriate psychology terminology
- Follow industry best practices for professional websites
- Consider state licensing requirements for online presence

### Technical Notes

- Keep responsive design principles
- Maintain accessibility standards
- Ensure print-friendly formatting
- Test across different browsers and devices

---

_Last Updated: September 1, 2025_
_Branch: ines-cv_
