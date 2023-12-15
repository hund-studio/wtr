const head = ["<?php get_header(); ?>", "<?php switch(wpreact_get_current_locale()){"].join("");
const foot = ["} ?>", "<?php get_footer(); ?>"].join("");

interface TemplateSectionArgs {
	id: string;
	html: string;
}

const generateTemplateSection = ({ id, html }: TemplateSectionArgs) =>
	[
		id !== "default" ? `case '${id}': ?>` : "default: ?>",
		'<div id="app">',
		html,
		"</div>",
		"<?php break;",
	].join("");

export const generateTemplate = (sections: TemplateSectionArgs[]) => {
	const templateBody = [];

	templateBody.push(head);

	for (const section of sections) {
		templateBody.push(generateTemplateSection(section));
	}

	templateBody.push(foot);

	return templateBody.join("");
};
