export interface Project {
	title: string;
	slug: string;
	description: string;
	details: string;
	stack: string[];
	github: string;
	images?: string[];
	link?: string;
}

export interface Experience {
	title: string;
	period: string;
	description: string;
}

export interface Education {
	degree: string;
	institution: string;
	period: string;
	description: string;
}
