# Portfolio Site

Welcome to my personal portfolio site built with SvelteKit and TailwindCSS. This site showcases my projects, experience, and contact information with a focus on clean UX and minimalist design.

## Features

- **Animated Transitions**: Enhances user experience with smooth transitions.
- **Project Showcase**: Displays various projects with detailed descriptions and images.
- **JSON-Powered Content**: Easily manage content through JSON files.
- **No-Backend Contact Form**: Utilizes FormSubmit for seamless form handling.
- **Responsive Design**: Ensures optimal viewing on various devices.
- **Printable CV**: Dedicated CV route with print styles (A4) and compact sections including optional References.

## Technologies Used

- **SvelteKit**: A framework for building fast and efficient web applications.
- **TypeScript**: Adds static types to JavaScript for improved developer experience.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **FormSubmit**: A simple form backend for static sites.

## Contact

For any inquiries, feel free to reach out via the contact form on the site.

## Content Structure (JSON)

All dynamic content lives under `src/lib/data`. To add references to the CV page, include a `references` array in `cv_pt.json` (or `cv.json`) with objects shaped like:

```json
"references": [
	{
		"name": "Dr. Maria Silva",
		"relationship": "Supervisora Clínica",
		"contact": "+351 900 000 000",
		"email": "maria.silva@example.com"
	},
	{
		"name": "João Pereira",
		"relationship": "Diretor Académico",
		"email": "joao.pereira@example.com"
	}
]
```

Fields supported by the references renderer:

- `name` (required)
- `relationship` (optional, short label)
- `contact` (optional; if present used as primary contact snippet)
- `email` (optional; shown if `contact` absent)
- `phone` (optional; also appended if present)

If `references` is absent or empty, the CV prints a small note: "Disponíveis mediante pedido.".
