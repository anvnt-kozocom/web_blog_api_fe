import slugify from "slugify";

export const convertNameToSlug = (name) => {
	let newSlug = slugify(name, {
		lower: true,
		remove: /[*+~.()'"!:@]/g,
	});
	return newSlug;
};

export const uppercaseFirstString = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const uppercaseCapitalize = (string) => {
	let words = string.split(" ");
	for (let i = 0; i < words.length; i++) {
		let word = words[i];
		words[i] = word.charAt(0).toUpperCase() + word.slice(1);
	}
	return words.join(" ");
};

export const slugToName = (slug) => {
	return slug.replace(/-/g, " ").toLowerCase();
};
